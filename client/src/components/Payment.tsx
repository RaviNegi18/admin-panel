import { useEffect, useState, type FormEvent } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message ?? "Payment failed");
      setLoading(false);
    } else {
      navigate("/payment/success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export const PaymentSuccess = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-emerald-400">Payment successful</h1>
      <p className="mt-3 text-slate-300">Your payment was completed successfully.</p>
    </div>
  </div>
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = (location.state as { orderId?: string } | null)?.orderId;

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!orderId) {
        setErrorMessage("No order found. Please start checkout again.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/payment/create-payment-intent`,
          {
            orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setClientSecret(response.data.clientSecret);
      } catch (error: unknown) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.message ||
              "Unable to start payment. Please try checkout again."
          );
        } else {
          setErrorMessage("Unable to start payment. Please try checkout again.");
        }
      }
    };

    createPaymentIntent();
  }, [orderId]);

  if (errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <p className="text-red-400">{errorMessage}</p>
          <button
            onClick={() => navigate("/cart")}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold"
          >
            Back to cart
          </button>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading payment...
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <PaymentForm />
    </Elements>
  );
};

export default Payment;

