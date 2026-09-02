import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import type { Product } from '../types/product'
import Products from '../components/Products'
const Dashboard = () => {
  const navigate = useNavigate()
const [products,setProducts]=useState <Product[]>([])

const fetchproducts=async()=>{

try{
    const res=await axios.get("http://localhost:5000/api/products")
    setProducts(res.data)

}catch(error:unknown){
  console.log(error)
}  

}


useEffect(()=>{
  fetchproducts()
},[])

  return (<>
const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchproducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      setProducts(res.data.product);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[30%] bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Main */}
      <div className="w-[70%] bg-slate-100 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>

          <button
            onClick={() => navigate("/products")}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {products.map((item) => (
            <div
              key={item._id}
              className="rounded-lg bg-white p-5 shadow"
            >
              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {item.description}
              </p>

              <p className="mt-3 font-bold">
                {item.price} {item.currency}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Stock: {item.stock}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

    <div className='flex min-h-screen'>
      <div className='w-[30%] flex items-center justify-center flex-col bg-blue-500 text-white min-h-screen'>

        <h1>
          Sidebar
        </h1>


      </div>

      <div className='w-[70%] flex items-center justify-center bg-red-600 min-h-screen'>
        <button onClick={() => navigate("/products")} >
          Add products
        </button>


        <div>



        </div>


      </div>
    </div>
  </>
  )
}

export default Dashboard