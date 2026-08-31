import React, { useState } from 'react'
import type { Product } from '../types/product'
const Products = () => {
  const [product,setProducts]=useState<Product>({
    name:"",
    price:0,
    currency:"INR"
  })
  return (
    <div>


      <div className='flex items-center justify-center flex-col'>
        <h1>
        Create  Products
        </h1>

        <form action="">


          <input type="text" name="name"   className='p-2 border-2 border-slate-400' value={product.name} onChange={(e)=>setProducts(e.target.value)}/>

        </form>
      </div>
    </div>
  )
}

export default Products