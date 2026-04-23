import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import auth, { db } from '../../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';


function Register() {
   let [password,setPassword]=useState("");
    let [email,setEmail]=useState("");
    let [Name,setName]=useState("");
    // const navigate=useNavigate()

    const signup=async()=>{
      try {
      const users=await createUserWithEmailAndPassword(auth,email,password);
      const user={
        name:Name,
        uid:users.user.uid,
        email:users.user.email,
        password:password,
        time:Timestamp.now()
      }
      const userRef=collection(db,"users")
      await addDoc(userRef,user);
      console.log("logging")
      setName("");
        setEmail("");
        setPassword("");

      alert("You are registerd now login")
      
    } catch (error) {
      console.log(error)
    }
    }
    
  return (
    
     <div className='py-22 bg-yellow-600  dark:bg-black min-h-screen   '>
        <h1 className='text-3xl font-bold   text-white dark:text-yellow-600 text-center pb-2'>Sign up</h1>
         <div className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' >

                <input type="text" placeholder='Name'   required className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'  onChange={(e)=>setName(e.target.value)}/>

        <input type="email" placeholder='Email'   required className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'  onChange={(e)=>setEmail(e.target.value)}/>
        <input type="Password" placeholder='Password'  required className='p-2 rounded-4xl border-2 border-white dark:border-yellow-600 outline-none dark:text-yellow-500 text-white'  onChange={(e)=>setPassword(e.target.value)}/>
        
        <button  className='p-2 rounded-2xl bg-white dark:bg-yellow-600 cursor-pointer text-xl text-yellow-600 dark:text-white dark:hover:bg-yellow-700 font-semibold hover:bg-gray-200' onClick={signup}>Sign up</button>
      
          
          {/* <p className=' text-sm text-gray-200 dark:text-yellow-600 cursor-pointer' >Signup with  <i className="fa-brands fa-google p-1 text-white dark:text-yellow-600"  ></i></p> */}
          <p className='text-gray-200 dark:text-yellow-600'>Already have an account ? <Link className='text-white dark:text-yellow-400' to={"/login"}>Login</Link></p>
        
        </div>
        

       
       
        
    </div>
  )
}

export default Register