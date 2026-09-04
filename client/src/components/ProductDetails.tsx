import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "../types/product";
import { addToCart } from "../features/slice/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  function handleAddToCart(product:Product) {
    console.log("productc===", product)
    dispatch(addToCart(product))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <h1 className="text-2xl font-bold">
          MyShop
        </h1>

        <button
          onClick={() => navigate("/cart")}
          className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
        >
          🛒 Cart
        </button>
      </nav>


      {/* Product */}
      <main className="mx-auto max-w-6xl px-6 py-12">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-slate-400 hover:text-white"
        >
          ← Back to Products
        </button>


        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* Image */}
          <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-slate-900">
            <span className="text-8xl">
              📦
            </span>
          </div>


          {/* Details */}
          <div className="flex flex-col justify-center">

            <p className="mb-3 text-sm uppercase tracking-wider text-blue-400">
              Product
            </p>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-5 leading-7 text-slate-400">
              {product.description}
            </p>


            {/* Price */}
            <div className="mt-8">
              <span className="text-4xl font-bold">
                {product.price}
              </span>

              <span className="ml-2 text-xl text-slate-400">
                {product.currency}
              </span>
            </div>


            {/* Stock */}
            <div className="mt-5">
              {product.stock > 0 ? (
                <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
                  In Stock · {product.stock} available
                </span>
              ) : (
                <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-400">
                  Out of Stock
                </span>
              )}
            </div>


            {/* Actions */}
            <div className="mt-10 flex gap-4">

              <button
                disabled={product.stock === 0}
                onClick={()=>handleAddToCart(product)}
                className="flex-1 rounded-lg border border-slate-700 px-6 py-4 font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>

              <button
                disabled={product.stock === 0}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ProductDetails;