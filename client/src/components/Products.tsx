
import React, { useState } from "react";
import type { Product } from "../types/product";

const Products = () => {
  const [product, setProducts] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    currency: "INR",
    stock: 0,
  });

  function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    setProducts((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(product);
    const res = await fetch("http://localhost:5000/api/product", {
      method: "POST",
      body: JSON.stringify(product)
    })

    const data=res.json()
    console.log("datata",data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Create Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="w-full rounded border p-3"
            value={product.name}
            onChange={handleUpdate}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full rounded border p-3"
            value={product.description}
            onChange={handleUpdate}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full rounded border p-3"
            value={product.price}
            onChange={handleUpdate}
          />

          <select
            name="currency"
            className="w-full rounded border p-3"
            value={product.currency}
            onChange={(e) =>
              setProducts((prev) => ({
                ...prev,
                currency: e.target.value as Product["currency"],
              }))
            }
          >
            <option value="INR">INR</option>
            <option value="CAD">CAD</option>
            <option value="USD">USD</option>
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="w-full rounded border p-3"
            value={product.stock}
            onChange={handleUpdate}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default Products;
