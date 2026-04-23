import React, { useContext, useEffect, useState } from 'react'
import "swiper/css"
import Image1 from "../../assets/shopping.png"
import Image2 from "../../assets/women.png";
import Image3 from "../../assets/sale.png";
import shirt from "../../assets/shirt.png"
import Womanshirt from "../../assets/shirt3.png"
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import myContext from '../context page/context';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';




const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: "https://www.pngarts.com/files/4/Electronic-PNG-Download-Image.png",
    title: "Best offers on Electonic products",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

];

const Categories =[
  {
    id: 1,
    img: shirt,
    title: "Man"
    
  },
  {
    id: 2,
    img: Womanshirt,
    title:"Women"
  },
  {
    id: 3,
    img: "https://pngimg.com/d/jacket_PNG8058.png",
    title:"Winter"
  },
  
  {
    id: 4,
    img: "https://rosepng.com/wp-content/uploads/elementor/thumbs/s11728_jordans_isolated_on_white_background_-stylize_200_8fb85d4f-8fc7-409b-9858-e04999697293_0-photoroom-qvvwwo5ua5ei62lqlo9d7sozm4y9w7dp2y729138o0.png",
    title: "Shoe"
  },
  {
    id: 5,
    img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/318407_0_uXW3QS3A1.png?updatedAt=1755701296800?tr=w-600",
    title: "Mobile",
  },
  {
    id: 6,
    img: "https://static.vecteezy.com/system/resources/thumbnails/070/915/183/small_2x/3d-icon-of-stainless-steel-kitchen-and-laundry-appliances-isolated-on-transparent-background-png.png",
    title: "Appliances",
  },
  {
    id: 7,
    img: "https://png.pngtree.com/png-clipart/20230417/original/pngtree-mens-transparent-watch-gift-png-image_9062505.png",
    title: "Accessories",
  },
  {
    id: 8,
    img: "https://png.pngtree.com/png-vector/20240122/ourmid/pngtree-makeup-cosmetic-products-accessories-illustration-png-image_11456605.png",
    title: "Beauty",
  },
  {
    id: 9,
    img: "https://pngimg.com/d/headphones_PNG101924.png",
    title: "Electronics",
  },
  {
    id: 10,
    img: "https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-grocery-basket-and-a-list-of-products-png-image_11952487.png",
    title: "Grocery",
  },
  
]


function Home() {
  const userId=JSON.parse(localStorage.getItem('user'))?.user?.uid;
  const {wishlist}=useContext(myContext)
  const WishlistItem=wishlist.filter(obj=>obj.uid==userId);
 

  const {products,search}=useContext(myContext)  
  console.log(products)

  const uid=JSON.parse(localStorage.getItem('user'))?.user?.uid || null;

    const filteredProducts = search.trim() === ""
  ? products
  : products.filter((item) => {
      const keywords = search.toLowerCase().split(" ");

      const searchable = (
        item.title +
        " " +
        item.description +
        " " +
        item.price.toString()
      ).toLowerCase();

      return keywords.every((keyword) => searchable.includes(keyword));
    });
  
    const addInCart=async(item)=>{
      
      if(userId){

        
        if(WishlistItem.some(w=>w.item.id==item.id)){
          alert("Product is already added");
        }else{
          const wishlistItems={
            item,
            uid,
          }
          await addDoc(collection(db,"wishlist"),wishlistItems);
        }
        console.log(item);
      }
      else{
        alert("login first")
      }
      
    }

      



  return (
    <div>
    
      <div className='relative overflow-hidden  min-h-155 sm:min-h-160  bg-yellow-600 flex items-center justify-center dark:bg-gray-950 dark:text-white duration-200 p-5  '>
        <div className='h-150 w-100 bg-gray-300 dark:bg-yellow-600  absolute bottom-1/2 sm:-top-1/2 -right-1/2 sm:-right-0 rounded-2xl rotate-55 z-- opacity-60 '>
        </div>
        <div className='h-150 w-100 bg-gray-300 dark:bg-yellow-600 absolute top-1/2 sm:-bottom-1/2 -left-1/2 sm:-left-0 rounded-2xl rotate-55 z- opacity-60'>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}  >
          {
            ImageList.map((item) => (
              <SwiperSlide >
                <div className='flex justify-center z-10'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:w-3/4 justify-center items-center z-10'>
                    <div className='flex flex-col justify-center gap-4 pt-4 sm:pt-0 text-center sm:text-left order-2  sm:order-1 '>
                      <h1 className='text-5xl sm:text-6xl  font-semibold text-white dark:text-yellow-600 p-1'>{item.title}</h1>
                      <p className='text-sm text-gray-200 dark:text-gray-300' >{item.description}</p>
                      
                    </div>
                    <div className='order-1 sm:order-2 flex items-center '>
                      <img src={item.img} alt="shoping Image" className=' w-80 h-75 sm:h-110 sm:w-110 sm:scale-105 lg:scale-130  object-contain mx-auto ' />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>


      </div>


      <div className=' px-6 py-4 text-yellow-600 '>
          <h1 className='text-xl font-semibold  w-fit mb-3 '>Explore Categories</h1>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide'>
          {
            Categories.map((item,index)=>(
              <div className='  bg-gray-200 dark:bg-yellow-600  flex flex-shrink-0 w-40
               flex-col items-center justify-end px-2 hover:scale-105 hover:bg-orange-200 duration-700 dark:text-white  cursor-pointer'  onClick={()=>window.location.href=`/FilterItem/${item.title}`} key={index}>
            <img src={item.img} alt={item.title +"image"} className='w-full object-cover '/>
            <h2 className='font-semibold pb-2 text-end'>{item.title}</h2>
        </div>
            ))
          }
            

      </div>

</div>


          <div className=' px-5  py-4 text-yellow-600 dark:text-white'>
             <h1 className='text-xl font-semibold   w-fit mb-3 '>Suggested for you</h1>

           <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-2 '>
            {
              filteredProducts.map((item,index)=>(

                <div className=' max-w-60 max-h-90 bg-gray-200 dark:bg-yellow-600 rounded-lg flex flex-col gap-1 p-2 cursor-pointer' key={index} >
                  

              <img src={item.imageUrl1} alt="" className='rounded-lg mx-auto  w-full h-4/5' onClick={()=>window.location.href=`/productinfo/${item.id}`} />
              {/* <h1 className='px-1 text-sm font-bold '>{item.title}</h1> */}
              <p className='px-2  opacity-80'>₹{item?.price-(item?.price/100*item?.discount) }</p>
                  

                    <button  className='bg-yellow-600 dark:bg-white dark:text-yellow-600 w-full text-white p-1 rounded-xl my-1 cursor-pointer dark:hover:bg-gray-200 hover:bg-yellow-700 active:bg-white active:text-yellow-600 dark:active:bg-yellow-600 dark:active:text-white '   onClick={()=>addInCart(item) } >Add to cart</button>
                  
            </div>
            
              ))
            }

           </div>
          </div>

    </div>
  )
}
export default Home