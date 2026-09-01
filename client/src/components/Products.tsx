import React, { useState } from 'react'
import type { Product } from '../types/product'
const Products = () => {
  const [product, setProducts] = useState<Product>({
    name: "",
    price: 0,
    currency: "INR"
  })



  function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    setProducts((prev) => ({
      ...prev,
      name: e.target.value
    }))
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log("jsosoms",  product)

  }
  return (
    <div>


      <div className='flex items-center justify-center flex-col'>
        <h1>
          Create  Products
        </h1>

        <form action="" onSubmit={handleSubmit}>


          <input type="text" name="name" className='p-2 border-2 border-slate-400' value={product.name} onChange={handleUpdate} />
          <input type="text" name="name" className='p-2 border-2 border-slate-400' value={product.name} onChange={handleUpdate} />


        </form>
      </div>
    </div>
  )
}

export default Products