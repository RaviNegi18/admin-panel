import { useEffect, useState, type FormEvent } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message ?? "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "requires_action") {
      const { error: nextActionError } = await stripe.handleNextAction({
        clientSecret,
      });

      if (nextActionError) {
        setMessage(nextActionError.message ?? "Authentication failed");
        setLoading(false);
        return;
      }
    }

    if (paymentIntent?.status === "succeeded") {
      navigate("/payment/success", { replace: true });
      return;
    }

    setMessage("Payment is still processing. Please wait a moment.");
    setLoading(false);
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

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-emerald-400">Payment successful</h1>
        <p className="mt-3 text-slate-300">
          {redirectStatus === "succeeded"
            ? "Your payment was completed successfully."
            : "Your payment was completed successfully and the order is now confirmed."}
        </p>
      </div>
    </div>
  );
};

export const PaymentCancelled = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-amber-400">Payment cancelled</h1>
      <p className="mt-3 text-slate-300">Your payment was cancelled. You can try again anytime.</p>
      <button
        onClick={() => window.location.href = "/cart"}
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold"
      >
        Back to cart
      </button>
    </div>
  </div>
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const stateOrderId = (location.state as { orderId?: string } | null)?.orderId;
  const orderId = stateOrderId || localStorage.getItem("lastOrderId");

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!orderId) {
        setErrorMessage("No order found. Please start checkout again.");
        navigate("/cart", { replace: true });
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
  }, [orderId, navigate]);

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
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default Payment;

