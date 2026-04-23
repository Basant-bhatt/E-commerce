
import React, { useContext } from 'react'
import myContext from '../context page/context';


function Myorder() {
  const {order}=useContext(myContext);
  console.log(order[0])
  
  const userId=JSON.parse(localStorage.getItem('user')).user.uid;
 
  
  // console.log(order.map(item=>item.UserID))
  return (
    <div className='min-h-screen pb-5 pt-5 text-gray-200 dark:text-yellow-600 bg-yellow-600  dark:bg-black  gap-10 relative '>
        <h1 className='text-3xl font-bold text-center mb-5'>My orders</h1>
      <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pb-4' >

        <div className='rounded-lg md:w-2/3 '>

      {
       order.filter(obj=>obj.UserID==userId).map((order,index)=>{
        return(
          <div key={index}>


           {
             order.length==0?(<h1 className='text-2xl text-gray-300 '>No items found</h1>):(

               order.WishlistItem.map((item,index)=>{
                 return(
                  <div key={index} className=' rounded-lg border drop-shadow-xl shadow-white  bg-gray-200 dark:bg-yellow-600 mt-4 p-3 flex h-50 justify-start items-center overflow-hidden relative'>
                <img src={item.item.imageUrl4} alt="" className='w-30  cursor-pointer' onClick={()=>window.location.href=`/productinfo/${item.item.id}`}/>
                <div className='ml-5 text-yellow-600 dark:text-white space-y-1'>
                  <h1 className='text-xl sm:text-2xl font-bold '>{item.item.title}</h1>
                  <p className='text-xs  opacity-70'>{item.item.description}</p>
                  
                  
                  </div>
                  </div>
                )
              })
            )
            }
          
            </div>
          
        )
      })
      
    }
    </div>
    </div>
    </div>
  )
}

export default Myorder