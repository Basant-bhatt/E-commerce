import React, { useContext, useEffect, useState } from 'react'
import myContext from '../context page/context'
import { useNavigate } from 'react-router';
import { addDoc, collection, deleteDoc, doc, sum } from 'firebase/firestore';
import { db } from '../../firebase';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


function Wishlist() {
    const [Popup, setPopup] = useState(false)
     const [sucessPage, setSucessPage] = useState(false)
     const [name,setName]=useState("");
     const [phone,setPhone]=useState("");
     const [address,setAddress]=useState("");
     const [pincode,setPincode]=useState("");
  const {wishlist}=useContext(myContext)
  

  
  const stripe = useStripe();  
  const elements = useElements();

  
  console.log(wishlist)
  const userId=JSON.parse(localStorage.getItem('user'))?.user?.uid;
  const shippingCost=99;
  const navigate=useNavigate();


  const userWishlist=wishlist.filter(obj=>obj.uid==userId);
  const subtotal=userWishlist.reduce((acc,item)=>{
    const price=Number(item.item.price)||0;
    return acc+price;
  },0);
  const grandTotal=subtotal+shippingCost;

  const removeItem=async(item)=>{
    const deletval=doc(db,"wishlist",item)
    await deleteDoc(deletval);
  }

  const WishlistItem=wishlist.filter(obj=>obj.uid==userId);
  console.log(WishlistItem);
 
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      const paymentId=paymentMethod.id;
      const emailID=JSON.parse(localStorage.getItem("user")).user.email
      const UserID=JSON.parse(localStorage.getItem("user")).user.uid
      console.log(emailID,UserID)
      if (error) {
        alert(error.message);
      }
      else {
        console.log("paymentmethod", paymentMethod);
        setSucessPage(true);
        const orderInfo={
      WishlistItem,
      paymentId,
      emailID,
      UserID,
      name,
      phone,
      pincode,
      address,
    }
     addDoc(collection(db,'orders'),orderInfo); 
      }
    }

    return (
      <div>

  

  {

    
    userId?
    <div className='min-h-screen pt-5 text-gray-200 dark:text-yellow-600 bg-yellow-600  dark:bg-black  gap-10 relative'>
      
        <h1 className='text-3xl font-bold text-center mb-5'>Cart Item</h1>

      <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pb-4' >
        <div className='rounded-lg md:w-2/3'>

          {
        WishlistItem.length==0?(<h1 className='text-2xl text-gray-300 '>No items found</h1>):(
            wishlist.filter(obj=>obj.uid==userId).map((item,index)=>(
            
            
            <div  className=' rounded-lg border drop-shadow-xl shadow-white  bg-gray-200 dark:bg-yellow-600 mb-4 p-2 flex  justify-start  relative overflow-hidden h-40'  key={index}>
            
                <img src={item.item.imageUrl5} alt="" className='w-30 cursor-pointer' onClick={()=>window.location.href=`/productinfo/${item.item.id}`}/>
                <div className='ml-3 text-yellow-600 dark:text-white space-y-1 w-1/2 md:w-3/4'>
                  <h1 className='text-xl sm:text-2xl font-bold '>{item.item.title}</h1>
                  <p className='text-xs  opacity-70'>{item.item.description}</p>
                  <p className='text-sm  '>${item.item.price}</p>
                  <i className="fa-solid fa-trash  cursor-pointer absolute top-3 right-3" onClick={()=>removeItem(item.id)} ></i>
                </div>
              </div>
          ))        
        )
}
        
        </div>

        <div className=' h-full rounded-lg border bg-gray-200 p-4 shadow-md md:mt-0 md:w-1/4 text-yellow-600 dark:text-white dark:bg-yellow-600'>

          <div className='flex justify-between mb-2'>
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
         
          <div className='flex justify-between mb-2'>
            <p>Shipping cost</p>
            <p>${shippingCost}</p>
          </div>
          <hr className='my-2' />
          <div className='flex justify-between mb-2'>
            <p className='text-lg font-bold'>Total</p>
            <div>
              <p className='text-lg font-bold'>${grandTotal}</p>
            </div>
          </div>

          <button className='text-center bg-yellow-600 w-full text-gray-200 p-1 cursor-pointer active:text-yellow-600 active:bg-gray-200 dark:active:text-white dark:active:bg-yellow-600 dark:bg-white dark:text-yellow-600 rounded-2xl text-lg' onClick={() => { setPopup(true) }}>Buy now</button>


        </div>
      </div>
            
    </div>:<div><h1 className='text-2xl dark:text-white'>No items found </h1><h3 className='text-xl'>Login first</h3><button className='p-2 rounded-2xl dark:bg-white bg-yellow-600 cursor-pointer text-xl dark:text-yellow-600 text-white dark:hover:bg-yellow-700 font-semibold hover:bg-gray-200' onClick={()=>navigate("/login")}>tap to login</button></div>
    }   
     {/* pop up */}

      <div className={`fixed inset-0  bg-opacity-60 flex justify-center items-center z-40 backdrop-blur-xs ${Popup ? "block" : "hidden"}`} >
        <div className='bg-yellow-600 dark:bg-white p-6 rounded-2xl shadow-lg w-95 relative m-5 ' >
          <div className={`${sucessPage ? "block" : "hidden"} relative`}>


            <div>
              <img src="https://www.shutterstock.com/shutterstock/videos/3580923965/thumb/1.jpg?ip=x480" alt="" />
              <p className='absolute top-1 right-2 text-2xl hover:bg-gray-200 dark:hover:bg-yellow-600 dark:hover:text-white px-2 cursor-pointer hover:text-yellow-600 rounded-4xl' onClick={() => { setPopup(false); setSucessPage(false) }}>X</p>
            </div>


          </div>


          <form onSubmit={handleSubmit} className={`${sucessPage ? "hidden" : "block"}`}>
            <h1 className='text-2xl font-bold   text-white dark:text-yellow-600 text-center pb-2'>Enter details</h1>
            <CardElement className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500  text-white  w-full mb-2' />
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2' required />
            <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}  placeholder='Phone Number' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2 ' required />
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}  placeholder='Address' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2 ' required />
            <input type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)}   placeholder='Pincode' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2 ' required />

            <button className='text-center bg-white w-full text-yellow-600 p-1 cursor-pointer active:text-white active:bg-yellow-600 dark:active:text-yellow-600 dark:active:bg-white dark:bg-yellow-600 dark:text-white rounded-2xl text-lg mt-3' type='submit'>${grandTotal} Pay now</button>
            <p className='absolute top-1 right-2 text-2xl hover:bg-gray-200 dark:hover:bg-yellow-600 dark:hover:text-white px-2 cursor-pointer hover:text-yellow-600 rounded-4xl' onClick={() => { setPopup(false) }}>X</p>
          </form>
        </div>
      </div> </div>
  )
}


export default Wishlist