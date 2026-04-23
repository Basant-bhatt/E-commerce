import React, { useContext } from 'react'
import myContext from '../context page/context';

function Orders() {
  const { order } = useContext(myContext);
  console.log(order)

  return (

    <div className='p-2  bg-yellow-600 text-white  relative'>

      <div className=' overflow-x-auto scrollbar-hide mt-8'>
        <table className='border text-sm  w-full text-left '>
          <thead className='text-xs '>
            <tr>
              <th className='border  px-6 py-2'>S.No</th>
              <th className='border  px-6 py-2'>Order title</th>
              <th className='border  px-6 py-2'>Image</th>
              <th className='border  px-6 py-2'>Category</th>
              <th className='border  px-6 py-2'>Price</th>
              <th className='border  px-6 py-2'>Customer Address</th>

              <th className='border  px-6 py-2'>Pincode</th>
              <th className='border  px-6 py-2'>Customer Email</th>
              <th className='border  px-6 py-2'>Customer Phone</th>
            </tr>
          </thead>


          {
            order?.map((order, index) => (
                           
                order.WishlistItem?.map((item,index)=>(   
                  <tbody key={index}>
                    <tr key={index}>
                      <td className='border  px-6 py-2'>{index + 1}</td>
                      <td className='border  px-6 py-2'>{item.item.title}</td>
                      <td className='border  px-6 py-2'>{item.item.imageUrl1}</td>
                      <td className='border  px-6 py-2'>{item.item.category}</td>
                      <td className='border  px-6 py-2'>{item.item.price}</td>
                      <td className='border  px-6 py-2'>{order.address}</td>
                      <td className='border  px-6 py-2'>{order.pincode}</td>
                      <td className='border  px-6 py-2'>{order.emailID}</td>
                      <td className='border  px-6 py-2'>{order.phone}</td>    
                      </tr> 
                      </tbody>
                    ) 
                  )
                  
                ) 
             ) 

          }
        </table>  
      </div>
    </div>
  )
}

export default Orders