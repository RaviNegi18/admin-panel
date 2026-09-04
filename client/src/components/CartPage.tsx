import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Cart = () => {
  const items = useSelector((state: RootState) => state?.cart?.items);
  console.log("items-------",items)
  const total = items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="mt-3 text-slate-400">
            Add some products to your cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold">
          Shopping Cart
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl bg-slate-900 p-5"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="mt-2 text-slate-400">
                  {item.price} {item.currency}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">
                  {item.price * item.quantity} {item.currency}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
          <h2 className="text-2xl font-bold">
            Total
          </h2>

          <p className="text-2xl font-bold">
            {total} {items[0].currency}
          </p>
        </div>

        <button
          className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
};

export default Cart;