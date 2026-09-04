
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Product } from "../types/product";

const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  const fetchproducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data.product);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);



  function handleNavigate (id:string | undefined){
navigate(`/details/${id}`)
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-950 p-6 text-white">

        <h1 className="mb-10 text-2xl font-bold">
          MyShop
        </h1>

        <nav className="flex flex-col gap-3">

          <button className="rounded-lg bg-slate-800 px-4 py-3 text-left">
            Dashboard
          </button>

          <button className="rounded-lg px-4 py-3 text-left hover:bg-slate-800">
            Products
          </button>

          <button className="rounded-lg px-4 py-3 text-left hover:bg-slate-800">
            Orders
          </button>

          <button className="rounded-lg px-4 py-3 text-left hover:bg-slate-800">
            Customers
          </button>

        </nav>

        <button
          className="mt-auto rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700"
        >
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="ml-64 w-full p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Dashboard
            </h2>

            <p className="mt-1 text-slate-500">
              Manage your products and orders
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + Add Product
          </button>

        </div>


        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-5">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Products
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {products.length}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Orders
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              0
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Revenue
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              ₹0
            </h3>
          </div>

        </div>


        {/* Products */}
        <div>

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-900">
              Products
            </h2>

            <span className="text-sm text-slate-500">
              {products.length} products
            </span>

          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {products.map((item) => (

              <div
                key={item._id}
                className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
                onClick={()=> handleNavigate(item?._id)}
              >

                <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-slate-100">
                  <span className="text-4xl">
                    📦
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {item.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <p className="text-lg font-bold text-blue-600">
                    {item.price} {item.currency}
                  </p>

                  <p className="text-sm text-slate-500">
                    Stock: {item.stock}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;
