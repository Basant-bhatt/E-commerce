import React, { useContext } from 'react'
import myContext from '../context page/context'
import { addDoc, collection } from 'firebase/firestore';
import auth, { db } from '../../firebase';
import { useNavigate } from 'react-router';



function AddProduct() {

  const {product,setProduct}=useContext(myContext);
  console.log(product)
  const navigate=useNavigate()

  const addData=async()=>{
    if(!(auth.currentUser)) return;
    await addDoc(collection(db,"product"),product)
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
    }

    );
    navigate("/dashboard")
    
  }
   
    
  return ( 
   
    <div className='py-8 bg-yellow-600  dark:bg-black'>

        <h1 className='text-3xl font-bold   text-white dark:text-yellow-600 text-center pb-2'>Add product</h1>
     <div className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' > 

        <input type="text" value={product.title} placeholder='Poduct Title' onChange={(e)=>setProduct({...product,title:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.price} placeholder='Poduct price' onChange={(e)=>setProduct({...product,price:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.discount} placeholder='Discount percentage' onChange={(e)=>setProduct({...product,discount:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.category} placeholder='Poduct Category' onChange={(e)=>setProduct({...product,category:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <select name="type" value={product.type} id=""  onChange={(e)=>setProduct({...product,type:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-600 text-white bg-yellow-600 dark:bg-black'>
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
        <input type="text" value={product.imageUrl1} placeholder='Poduct 1 Image Url' onChange={(e)=>setProduct({...product,imageUrl1:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.imageUrl2} placeholder='Poduct 2 Image Url' onChange={(e)=>setProduct({...product,imageUrl2:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.imageUrl3} placeholder='Poduct 3 Image Url' onChange={(e)=>setProduct({...product,imageUrl3:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.imageUrl4} placeholder='Poduct 4 Image Url' onChange={(e)=>setProduct({...product,imageUrl4:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <input type="text" value={product.imageUrl5} placeholder='Poduct 5 Image Url' onChange={(e)=>setProduct({...product,imageUrl5:e.target.value}) } className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'/>
        <textarea name="" id="" value={product.description} placeholder='product description' onChange={(e)=>setProduct({...product,description:e.target.value})} className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white h-40'></textarea>
         <button className='p-2 rounded-2xl bg-white dark:bg-yellow-600 cursor-pointer text-xl text-yellow-600 dark:text-white dark:hover:bg-yellow-700 font-semibold hover:bg-gray-200' onClick={addData}>Submit</button>
    </div> 
    </div> 
    
  )
}

export default AddProduct 