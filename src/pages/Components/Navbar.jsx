import { signOut } from "firebase/auth";
import { motion } from "motion/react";
import { div } from "motion/react-client";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import auth from "../../firebase";
// import { useSelector } from "react-redux";
import myContext from "../context page/context";

function Navbar() {
  const [darkmode, setdarkmode] = useState(false);
  const [isHide,setisHide]=useState(false)
  const navigate=useNavigate();
  const {search,setSearch}=useContext(myContext)

  const logout=()=>{

    signOut(auth).then(()=>{console.log("logout");
      localStorage.removeItem("user");
      navigate("/login")
    }).catch(()=>console.log("error"))
  }

  useEffect(() => {
    const savedTheme=localStorage.getItem("Mode")
    if (savedTheme === "true") {
      setdarkmode(true)
      document.documentElement.classList.add("dark");
    } else {
      setdarkmode(false)
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Mode",darkmode)
    if (darkmode == true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  const user=JSON.parse(localStorage.getItem("user"))


  // const cardItem=useSelector((state)=>state.cart);
  return (
    
    <div className="text-yellow-600 dark:bg-black  bg-yellow-600 sticky top-0 z-10">
      <div className=" text-yellow-600 flex justify-between px-2  sm:px-30 py-4 sm:py-3  items-center ">
        <div className="flex gap-1 items-center">
          <img src="./src/assets/logo.png" alt="" className="w-5 sm:w-8"/>
        <h1 className="text-25 font-bold sm:text-xl cursor-pointer text-white dark:text-yellow-600">
          SHOP-SPHERE
        </h1>
        </div>
        <div className=" flex group  relative">
          <input
            className=" w-45  bg-gray-200 p-1 px-3 rounded-full  outline-none  group-hover:w-55 transition-all duration-300 focus:border border border-white focus:border-yellow-600 dark:border-yellow-600 dark:focus:border-white dark:bg-yellow-600 dark:text-white"
            placeholder="Search here...."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-2 dark:text-white"></i>
        </div>
      </div>

          <div className="flex items-center justify-between px-10 py-4 sm:justify-center sm:gap-20 dark:bg-yellow-600  dark:text-white bg-gray-200 text-white text-xl sm:p-4">
            <div className="sm:flex gap-5 text-yellow-600 dark:text-white hidden ">
        <Link to={'/'} className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700">Home</Link>
      
      {
        user&&user?
        <Link to={"/myorder"}  className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700">My order</Link>:""
      }
        <Link  to={"/wishlist"} className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700">Wishlist</Link>

        {
          user?<Link  className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700" onClick={logout}>Logout</Link>:<Link to={'/login'}  className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700">Login</Link>
        }
        
        {
          user&&user.user.email==="basantbhatt@gmail.com"?  
          <Link to={"/dashboard"} className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700"> Dashboard</Link>
           
        // <Link to={"/accessproduct"} className="border-2 border-transparent hover:text-yellow-700 hover:border-b-yellow-700">Access products</Link>
       :"" 
        }
      </div>

            <motion.div
        layout
        onClick={() => setdarkmode(!darkmode)}
        className={`w-12 h-6 p-1 rounded-full cursor-pointer flex items-center hover:bg-yellow-700 dark:hover:bg-gray-200 ${darkmode ? "justify-end bg-white" : "justify-start bg-yellow-600"
          }`}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >  
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          className="w-4 h-4 dark:bg-yellow-600 bg-white rounded-full shadow-md"
        />
      </motion.div>

          <button className="cursor-pointer sm:hidden " onClick={()=>setisHide(true)}><i className="fa-solid fa-bars text-2xl text-yellow-600 dark:text-white"></i></button>
          </div>


          <div className={`absolute  top-0 w-full flex flex-col pb-10 px-2 bg-gray-200 dark:bg-black ${isHide?"block":"hidden"}`} >
            <button className="flex justify-end  py-2 px-2  text-3xl cursor-pointer" onClick={()=>setisHide(false)}>
              <span className="flex items-center justify-center rounded-full  h-11 active:bg-yellow-600 active:text-white w-11 ">X</span>
              </button>
          <Link to={"/"} className="p-2 m-2 text-2xl text-center bg-yellow-600 text-white"  onClick={()=>setisHide(false)}>Home</Link>
          {
        user&&user?
        <Link to={"/myorder"}  className="p-2 m-2 text-2xl text-center  bg-yellow-600 text-white"  onClick={()=>setisHide(false)}>My order</Link>:""}
        {
          user&&user.user.email==="basantbhatt@gmail.com"? 
        <Link to={"/dashboard"} className="p-2 m-2 text-2xl text-center bg-yellow-600 text-white" onClick={()=>setisHide(false)}>Dashboard</Link>:""}
        <Link to={"/wishlist"} className="p-2 m-2 text-2xl text-center bg-yellow-600 text-white"  onClick={()=>setisHide(false)}>Wishlist</Link>
        {
          user?
          <Link  className="p-2 m-2 text-2xl text-center bg-yellow-600 text-white"  onClick={()=>{setisHide(false);logout()}}>Log out</Link>:
          <Link to={"/login"} className="p-2 m-2 text-2xl text-center bg-yellow-600 text-white"  onClick={()=>setisHide(false)}>Login</Link>}

          </div>
      
    </div>
  );
}

export default Navbar;
