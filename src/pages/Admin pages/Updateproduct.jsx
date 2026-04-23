import React, { useContext } from 'react'
import myContext from '../context page/context'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate, useParams } from 'react-router'

function Updateproduct() {
    const {editProducts,setEditProducts,setProduct}=useContext(myContext)
    const { id } = useParams();
    console.log(id)
   const navigate=useNavigate()
    const handleUpdate=async()=>{
      const docRef=doc(db,"product",id)
      await updateDoc(docRef,editProducts)
      setProduct({

      title:"",
      price:"",
      discount:"",
      type:"",
      description:"",
      imageUrl1:"",
      imageUrl2:"",
      imageUrl3:"",
      imageUrl4:"",
      imageUrl5:"",
      category:"",
    })
    navigate("/dashboard")

    }
    // console.log(product)
  return (
     <div className='py-8 bg-yellow-600  dark:bg-black'>

        <h1 className='text-3xl font-bold   text-white dark:text-yellow-600 text-center pb-2'>Update product</h1>
     <div className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' > 

        <input type="text" value={editProducts.title} onChange={(e)=>setEditProducts({...editProducts,title:e.target.value}) } placeholder='Poduct Title' className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.price}  onChange={(e)=>setEditProducts({...editProducts,price:e.target.value}) }  placeholder='Poduct price' className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.discount}  onChange={(e)=>setEditProducts({...editProducts,discount:e.target.value}) }  placeholder='discount percentage' className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.category} onChange={(e)=>setEditProducts({...editProducts,category:e.target.value}) } placeholder='Poduct Category'   className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
         <select name="type" value={editProducts.type} id=""  onChange={(e)=>setEditProducts({...editProducts,type:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-600 text-white bg-yellow-600 dark:bg-black'>
          <option value="" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-600 text-white'>Select type</option>
          <option value="man" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-600 text-white'>man</option>
          <option value="woman" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-600 text-white'>woman</option>
          <option value="winter" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-600 text-white'>winter</option>
          <option value="shoe" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>shoe</option>
          <option value="mobile" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>mobile</option>
          <option value="appliances" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>appliances</option>
          <option value="accessories" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>accessories</option>
          <option value="beauty" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>beauty</option>
          <option value="electronics" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>electronics</option>
          <option value="grocery" className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'>grocery</option>
        </select>
        <input type="text" value={editProducts.imageUrl1} placeholder='Poduct 1 Image Url' onChange={(e)=>setEditProducts({...editProducts,imageUrl1:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.imageUrl2} placeholder='Poduct 2 Image Url' onChange={(e)=>setEditProducts({...editProducts,imageUrl2:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.imageUrl3} placeholder='Poduct 3 Image Url' onChange={(e)=>setEditProducts({...editProducts,imageUrl3:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.imageUrl4} placeholder='Poduct 4 Image Url' onChange={(e)=>setEditProducts({...editProducts,imageUrl4:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={editProducts.imageUrl5} placeholder='Poduct 5 Image Url' onChange={(e)=>setEditProducts({...editProducts,imageUrl5:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
       
        <textarea name="" id="" value={editProducts.description} onChange={(e)=>setEditProducts({...editProducts,description:e.target.value})} placeholder='product description'  className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white h-40'></textarea>
         <button className='p-2 rounded-2xl bg-white dark:bg-yellow-600 cursor-pointer text-xl text-yellow-600 dark:text-white dark:hover:bg-yellow-700 font-semibold hover:bg-gray-200' onClick={handleUpdate}>Update</button>
    </div> 
    </div>
  )
}

export default Updateproduct