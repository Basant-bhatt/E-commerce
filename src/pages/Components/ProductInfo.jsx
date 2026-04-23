import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../../firebase';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import myContext from '../context page/context';


function ProductInfo() {



     const [product, setProduct] = useState('');
     
    

  const { id } = useParams();
   const uid=JSON.parse(localStorage.getItem('user'))?.user?.uid || null;
  console.log(id)

  
  const [cartProduct, setcartProduct] = useState('')
  const getProduct = async () => {
    try {
      const productTemp = await getDoc(doc(db, "product", id))
      setProduct(productTemp.data());

    } catch (error) {
      console.log(error)
    }

  }
  const getWishlist = async () => {
    try {
      const productTemp = await getDoc(doc(db, "wishlist", id))
      // console.log(productTemp);
      setcartProduct(productTemp.data());
      
    } catch (error) {
      console.log(error)
    }

  }
  

  console.log(product);
  console.log(cartProduct);
  useEffect(() => {
    getProduct();
    getWishlist();
  }, [])

  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const [quantity, setQuantity] = useState(1);

const userId=JSON.parse(localStorage.getItem('user'))?.user?.uid;
  const {wishlist,products}=useContext(myContext)
    const WishlistItem=wishlist.filter(obj=>obj.uid==userId);


  if (!product && !cartProduct) return <div className="text-center p-10">Product not found</div>;

   const addInCart=async(item)=>{
         
         if(WishlistItem.some(w=>w.item.id==item.id)){
          alert("Product is already added");
         }else{
           const wishlistItems={
             item,
             uid,
           }
           await addDoc(collection(db,"wishlist"),wishlistItems);
         }
   
         }

         const similarItems=products.filter(obj=>obj.category==(product||cartProduct).category.toLowerCase());
         console.log(similarItems);
  

  return (
    <div className="p-1 relative overflow-hidden text-white bg-yellow-600  dark:bg-gray-950 dark:text-white duration-200 flex flex-col items-center ">
      <div className="md:w-4/5 ">
        {/* LEFT SIDE IMAGES */}
       
    
          <div className="flex gap-1 w-full scrollbar-hide overflow-scroll ">
          <img
            src={product?.imageUrl4 || cartProduct?.item.imageUrl4}
            alt="image"
            className=" shadow-md  "
          />

            <img src={product?.imageUrl1 || cartProduct?.item.imageUrl1} alt="image" className=' object-cover  ' />
            <img src={product?.imageUrl2 || cartProduct?.item.imageUrl2} alt="image" className=' object-cover   ' />
            <img src={product?.imageUrl3 || cartProduct?.item.imageUrl3} alt="image" className=' object-cover   ' />
            <img src={product?.imageUrl5 || cartProduct?.item.imageUrl5} alt="image" className=' object-cover  ' />
          
          </div>

      


        {/* RIGHT SIDE DETAILS */}
        <div className="flex flex-col p-2">
          <div className='mb-5'>
            <h1 className="text-2xl font-bold">{product?.title.toUpperCase() || cartProduct?.item.title.toUpperCase()}</h1>
          <p className="text-2xl font-semibold mx-2">₹{product?.price-(product?.price/100*product?.discount) || cartProduct?.item.price-(product?.price/100*product?.discount)} <span className='ml-2  font-extralight line-through text-gray-300 dark:text-green-600 '>₹{product?.price || cartProduct?.item.price}</span><span className='font-extralight text-gray-300 dark:text-green-600 '>(save up to {product?.discount || cartProduct?.item.discount}%)</span></p>
          </div>
          

          {/* SIZE SECTION */}

          {/* <div>
            <div className='flex justify-between'>
              <h3 className="font-medium ">Select Size</h3> */}
              {/* Size Chart Link */}
              {/* <button className="text-blue-600 underline text-sm  text-left">
                View Size Chart
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {size.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-md hover:bg-white hover:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div> */}




          {/* QUANTITY SELECTOR */}
          <div className=" items-center">
            <h3 className="font-light">QUANTITY</h3>
            <div className="flex items-center border rounded-md w-fit ">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg cursor-pointer"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-lg cursor-pointer"
              >
                +
              </button>
            </div>
          </div>


          {/* BUTTONS */}
          <div className=' w-full flex gap-3 my-3'>
            {/* <button className="w-full   dark:text-white py-3 rounded-lg text-lg cursor-pointer" onClick={() => { setPopup(true) }}>
            Add to Cart
          </button> */}


          <button className="w-full border py-3 rounded-lg text-lg hover:bg-yellow-600 hover:text-white  dark:hover:bg-black text-yellow-600   dark:text-white bg-white  dark:bg-yellow-600 transition cursor-pointer" onClick={()=>addInCart(product||cartProduct)}>
            Add to Wishlist
          </button>
          </div>


          {/* DETAILS */}
          <div>
            <div className="">

              {/* Description */}
              <div
                className="border-b py-3 cursor-pointer flex-col justify-between"
                onClick={() => toggleSection("desc")}
              >
                <div className='flex justify-between'>
                  <span className="font-semibold">DESCRIPTION</span>
                <span>{openSection === "desc" ? "-" : "+"}</span>
                </div>
              {openSection === "desc" && (
                <p className="mt-2 text-gray-200 font-light">
                  {product?.description || cartProduct?.item.description}
                </p>
              )}
              </div>

               {/* SHIPPING, RETURN AND EXCHANGE */}
              <div
                className="border-b py-3 cursor-pointer flex justify-between flex-col"
                onClick={() => toggleSection("material")}
              >
                 <div className='flex justify-between'>

                <span className="font-semibold">SHIPPING, RETURN AND EXCHANGE</span>
                <span>{openSection === "material" ? "-" : "+"}</span>
                 </div>
            
              {openSection === "material" && (
                <p className="mt-2 text-gray-200 font-light">
                  Rs 99 shipping charges will be charged on Orders Below Rs 999
                  Rs 49 COD(Cash on Delivery) Charges will be charged on all COD Orders
                  Product are shipped from our warehouse within 2 working days.
                  The order will be delivered in 5-7 working days depending on the location
                  You will receive order tracking link as soon as we ship your order.
                  RETURNS
                  We have 7 days return policy
                  Please ensure that the products you return are unused, unworn and the original tags are intact.
                  Shipping charge and COD Charge are Non Refundable.
                  Please share the package un-boxing video for wrong product / Missing item received within 24 hours of delivery.
                  Don’t Handover Product without pick-up slip or SMS Confirmation.
                  Only one time exchange/return is FREE!
                  Customer has to self-ship the product if the pin code is out of serviceable area with reverse logistic.( Note - Your courier cost should not exceed above Rs 200 .We request you to self ship the products by "Speed Post" as your courier service)
                  Don’t Accept order if the package is tampered.
                  All COD orders will be refunded via Cash-back/Coupon code or bank transfer.
                  Don’t share the OTP with carrier if you haven’t received the product.
                  EXCHANGE
                  There is no additional charge for 1st exchange order.
                  Rs 149 will be charged if you wish to return your exchanged order.
                  Size exchange is subject to availability.
                  Please share the package un-boxing video for wrong product received.
                  After choosing to exchange, you can instantly pick your new product on the website.
                  You can also refer FAQ section for more details.
                </p>
              )}
    </div>
                {/* REVIEWS */}

              <div
                className="border-b py-3  flex justify-between flex-col"
               
              >
                <div className='flex justify-between cursor-pointer'  onClick={() => toggleSection("review")}>
                <span className="font-semibold">REVIEWS</span>
                <span>{openSection === "review" ? "-" : "+"}</span>
                </div>
              {openSection === "review" && (
                <div className='flex flex-col  gap-5'>
                  <h2 className='font-bold mx-auto mt-5'>Write a review</h2>
                  <div>
                    <p className='font-light text-sm m-1'>Review Title</p>
                  <input  type="text" placeholder='Give your review title ' className='border outline-none rounded-xl p-2 cursor-pointer w-full' />
                  <p className='font-light text-sm m-1'>Review content</p>
                  <textarea placeholder='Start writing here' className='border p-2  rounded-xl outline-none cursor-pointer w-full'></textarea>
                 
                  </div>

                  <div>
                  <p className='font-light text-sm m-1'>Your good name</p>
                  <input  type="text" placeholder='Display name' className='border p-2  rounded-xl outline-none cursor-pointer w-full'/>
                  <p className='font-light text-sm m-1'> Email address</p>
                  <input  type="email"  placeholder='Your eamil address' className='border p-2  rounded-xl outline-none cursor-pointer w-full'/>
                  </div>
                  <button className="w-full bg-white text-yellow-600 dark:bg-yellow-600 dark:text-white py-3 rounded-lg text-lg mt-2 cursor-pointer">Submit With Love </button>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>

      

            <div className='w-full p-4'>
              <p className='text-2xl font-bold text-center my-5'>You May Also Like</p>
              <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-2 '>
            

                {
              similarItems.length==0?(<h1 >Currently no items</h1>):(
                similarItems.map((item,index)=>(

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


              
            
    </div>

  );
}

export default ProductInfo