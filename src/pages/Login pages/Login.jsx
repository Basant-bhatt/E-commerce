import  { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router'
import auth from '../../firebase';
import myContext from '../context page/context';
import Modal from "../Components/Modal"


function Login() {

  let [password,setPassword]=useState("");
  let [email,setEmail]=useState("");
  const {loading,setLoading}=useContext(myContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
   setLoading(true)
    try{

      const result=await signInWithEmailAndPassword(auth,email,password)
      localStorage.setItem("user",JSON.stringify(result))
      alert("logged in")
   setLoading(false)
      
      navigate("/")
      
    }
   catch{
   setLoading(false)
    console.log("error");
    
   }

  }

  return (
    <div className='py-30 bg-yellow-600  dark:bg-black min-h-screen'>
        {
          loading?<Modal/>:
          <div>

        <h1 className='text-3xl font-bold   text-white dark:text-yellow-600 text-center pb-2'>Login</h1>
      <div className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' >
        <input type="email" placeholder='Email' required className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="Password" placeholder='Password' required className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white' onChange={(e)=>setPassword(e.target.value)}/>
        <button className='p-2 rounded-2xl bg-white dark:bg-yellow-600 cursor-pointer text-xl text-yellow-600 dark:text-white dark:hover:bg-yellow-700 font-semibold hover:bg-gray-200' onClick={handleLogin}>Login</button>
        <p className='text-gray-200 dark:text-yellow-600'>Don't have any account ? <Link className='text-white dark:text-yellow-400' to={"/register"}>Register</Link> </p>
          </div>
      </div>
      }

    </div>


  )
}

export default Login