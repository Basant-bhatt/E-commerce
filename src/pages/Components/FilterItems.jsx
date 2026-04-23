import React, { useContext } from 'react'
import myContext from '../context page/context'
import { useParams } from 'react-router';



function FilterItems() {
    const {products}=useContext(myContext);
    console.log(products);
    const {item}=useParams();
    const FilterItem=products.filter(obj=>obj.type.toLowerCase()==item.toLowerCase());
   

    
  return (
    <div className='min-h-screen pt-5 text-gray-200 dark:text-yellow-600 bg-yellow-600  dark:bg-black'>
      <h1 className='text-white dark:text-yellow-600 text-4xl font-bold text-center'>{item}</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-2 m-2'>
            {
              FilterItem.length==0?(<h1 >Currently no items</h1>):(
                FilterItem.map((item,index)=>(

                <div className=' max-w-60 max-h-90 bg-gray-200 dark:bg-yellow-600 rounded-lg flex flex-col gap-1 p-2 cursor-pointer' key={index} >
                  

              <img src={item.imageUrl1} alt="" className='rounded-lg mx-auto  w-full h-4/5' onClick={()=>window.location.href=`/productinfo/${item.id}`} />
              {/* <h1 className='px-1 text-sm font-bold '>{item.title}</h1> */}
              <p className='px-2  opacity-80 dark:text-white text-yellow-600'>₹{item?.price-(item?.price/100*item?.discount) }</p>
                  
              <button  className='bg-yellow-600 dark:bg-white dark:text-yellow-600 w-full text-white p-1 rounded-xl my-1 cursor-pointer dark:hover:bg-gray-200 hover:bg-yellow-700 active:bg-white active:text-yellow-600 dark:active:bg-yellow-600 dark:active:text-white '  >Add to cart</button>
            </div>
            
              ))
              )
            }

           </div>
    </div>
  )
  
    
  
}

export default FilterItems