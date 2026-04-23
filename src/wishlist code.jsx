import React, {  useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { addDoc, collection  } from 'firebase/firestore';
import auth, { db } from '../../firebase';
// import { removeFromCart } from '../Redux/cartSlice';
// import { removeItemFromFirebase } from '../Components/FirebaseCart';
// import { deleteFromCart } from '../Redux/cartSlice';

function Wishlist() {
  // const [cost, setCost] = useState(0)
  const [Popup, setPopup] = useState(false)
  const [sucessPage, setSucessPage] = useState(false)
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [pincode,setPincode]=useState("");
  // const dispatch=useDispatch();
  // const cartItem = useSelector((state) => state.cart.items)
  // const stripe = useStripe();  
  // const elements = useElements();

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
    cartItem,
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

  // const handleRemove = async (id) => {
  //   // 1) Remove from Redux
  //   dispatch(removeFromCart(id));

  //   // 2) Remove from Firebase
  //   const user = auth.currentUser;
  //   if (user) {
  //     const updatedCart = cartItem.filter(item => item.id !== id);
  //     await removeItemFromFirebase(user.uid, updatedCart);
  //   }
  // };

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItem))
  //   let Total = 0;
  //   cartItem.forEach(element => {
  //     Total = Total + parseInt(element.price);
  //   });
  //   setCost(Total)
  // }, [cartItem])
  // let shippingCost = 100;
  // let grandTotal = cost + shippingCost;
  // console.log(cost)
  // //  const removeFromCart=(product)=>{
  // //   dispatch(deleteFromCart(product));
  // // }

  //  useEffect(()=>{
  //   localStorage.setItem('cart',JSON.stringify(cartItem))
  //   },[cartItem])

  return (
    <div className='min-h-screen pt-5 text-gray-200 dark:text-yellow-600 bg-yellow-600  dark:bg-black  gap-10 relative'>
      <h1 className='text-3xl font-bold text-center mb-5'>Cart Item</h1>
      <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pb-4' >
        <div className='rounded-lg md:w-2/3'>
          
              <div  className=' rounded-lg border drop-shadow-xl shadow-white  bg-gray-200 dark:bg-yellow-600 mb-4 p-3 flex  justify-start  relative'  >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYbtypx7QTkZHMn7xo7KAMFWmkYVe0E5qBQ&s" alt="" className='w-30' />
                <div className='ml-5 text-yellow-600 dark:text-white space-y-1'>
                  <h1 className='text-xl sm:text-2xl font-bold '></h1>
                  <p className='text-xs  opacity-70'></p>
                  <p className='text-sm  '>$ </p>
                  <i className="fa-solid fa-trash  cursor-pointer absolute top-3 right-3" ></i>
                </div>
              </div>
           
        </div>

        <div className=' h-full rounded-lg border bg-gray-200 p-4 shadow-md md:mt-0 md:w-1/4 text-yellow-600 dark:text-white dark:bg-yellow-600'>
          <div className='flex justify-between mb-2'>
            <p>Subtotal</p>
            <p>$</p>
          </div>
          <div className='flex justify-between mb-2'>
            <p>Shipping cost</p>
            {/* <p>${shippingCost}</p> */}
          </div>
          <hr className='my-2' />
          <div className='flex justify-between mb-2'>
            <p className='text-lg font-bold'>Total</p>
            <div>
              {/* <p className='text-lg font-bold'>${grandTotal}</p> */}
            </div>
          </div>

          <button className='text-center bg-yellow-600 w-full text-gray-200 p-1 cursor-pointer active:text-yellow-600 active:bg-gray-200 dark:active:text-white dark:active:bg-yellow-600 dark:bg-white dark:text-yellow-600 rounded-2xl text-lg'>Buy now</button>


        </div>
      </div>

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
            <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone Number' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2 ' required />
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Address' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2 ' required />
            <input type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder='Pincode' className='p-1 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white w-full mb-2 ' required />

            <button className='text-center bg-white w-full text-yellow-600 p-1 cursor-pointer active:text-white active:bg-yellow-600 dark:active:text-yellow-600 dark:active:bg-white dark:bg-yellow-600 dark:text-white rounded-2xl text-lg mt-3' type='submit'>$ Pay now</button>
            <p className='absolute top-1 right-2 text-2xl hover:bg-gray-200 dark:hover:bg-yellow-600 dark:hover:text-white px-2 cursor-pointer hover:text-yellow-600 rounded-4xl' onClick={() => { setPopup(false) }}>X</p>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Wishlist