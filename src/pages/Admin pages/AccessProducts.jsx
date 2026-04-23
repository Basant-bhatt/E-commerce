import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import myContext from '../context page/context';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

function AccessProducts() {
  // const {product,setProduct}=useContext(myContext);
  // const navigate=useNavigate();

  const {products,setProduct,readData,setEditProducts}=useContext(myContext)
  console.log(products);


  const handleDelete=async(item)=>{
    const deleteVal=doc(db,"product",item.id)
    await deleteDoc(deleteVal)
   readData();
  }

  return (
    
    <div className='p-2  bg-yellow-600 text-white  relative'>
      <Link to={"/addProduct"} className='bg-white text-yellow-600 px-2 py-1 mt-2  rounded-xl absolute right-4 top-0 text-xs'><i className="fa-solid fa-cart-plus"></i> Add product</Link>
      <div className=' overflow-x-auto scrollbar-hide mt-8'>
        <table className='border text-sm  w-full text-left '>
    <thead className='text-xs '>
        <tr>
          <th className='border  px-6 py-2'>S.No</th>
          <th className='border  px-6 py-2'>Image</th>
          <th className='border  px-6 py-2'>Name</th>
          <th className='border  px-6 py-2'>Price</th>
          <th className='border  px-6 py-2'>Category</th>
         
          <th className='border  px-6 py-2'>Action</th>
        </tr> 
      
    </thead>
    {
      products.map((item,index)=>
      
        
         (
          
        <tbody key={index}>
        <tr>
          
        <td className='border  px-6 py-2'>{index+1}</td>
        <td className='border  px-6 py-2'>{item.imageUrl1}</td>
        <td className='border  px-6 py-2'>{item.title}</td>
        <td className='border  px-6 py-2'>{item.price}</td>
        <td className='border  px-6 py-2'>{item.category}</td>
        
        <td className='border  px-6 py-2 space-y-3 sm:space-x-3 sm:space-y-0 '><Link to={`/Updateproduct/${item.id}`} onClick={()=>setEditProducts(item)}><i className="fa-solid fa-pencil  cursor-pointer" ></i> </Link><i className="fa-solid fa-trash  cursor-pointer" onClick={()=>handleDelete(item)}></i></td>
 
      </tr>
    </tbody>
      ))
    
    }
      </table>
      </div>
    </div>
    
  )
}

export default AccessProducts