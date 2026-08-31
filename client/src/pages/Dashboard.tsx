import React from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate=useNavigate()


    
    return (<>


      <div className='flex min-h-screen'>
          <div className='w-[30%] flex items-center justify-center flex-col bg-blue-500 text-white min-h-screen'>

            <h1>
                Sidebar
            </h1>


        </div>

        <div className='w-[70%] flex items-center justify-center bg-red-600 min-h-screen'>
         <button onClick={()=>navigate("/products")} >
            Add products
         </button>

         
        </div>
      </div>
    </>
    )
}

export default Dashboard