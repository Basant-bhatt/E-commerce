import React, { useState } from 'react'

import Orders from './Orders'
import AccessProducts from './AccessProducts'
import Users from './Users'

function Dashboard() {
    const [tableCount,setTabkecount]=useState(1)

    return (

        <div className='text-yellow-600 bg-yellow-600 dark:bg-black  min-h-screen w-full '>

            <div className='space-x-2 p-5 flex  justify-center'>
                <button className={`${tableCount===1?"bg-purple-600 text-white":"bg-gray-200 text-purple-600"} border border-purple-600  text-sm  shadow-[inset_0_0_8px_rgba(0,0,0,0,6)] px-3 py-1 rounded-lg shadow-purple-800  cursor-pointer`} onClick={()=>setTabkecount(1)}><i className="fa-solid fa-cart-plus "></i> Products</button>
                <button className={`${tableCount===2?"bg-red-600 text-white":"bg-gray-200 text-red-600"} border border-red-600  text-sm shadow-[inset_0_0_8px_rgba(0,0,0,0,6)] px-3 shadow-red-700 py-1 rounded-lg cursor-pointer`} onClick={()=>setTabkecount(2)}><i className="fa-solid fa-bag-shopping"></i> Orders</button>
                <button className={`${tableCount===3?"bg-green-600 text-white":"bg-gray-200 text-green-600"} border border-green-600  text-sm shadow-[inset_0_0_8px_rgba(0,0,0,0,6)] px-3 shadow-green-700 py-1 rounded-lg cursor-pointer`} onClick={()=>setTabkecount(3)}><i className="fa-solid fa-user"></i> Users</button>
                </div>
                {
                    tableCount===1&&
                    <AccessProducts/>
                    
                }
                {
                    tableCount===2&&
                    <Orders/>
                    

                    
                }
                {
                    tableCount===3&&
                    <Users/>
                    
                }
        </div>
    )
}

export default Dashboard