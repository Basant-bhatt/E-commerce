import React, {  useEffect, useState } from 'react'
import myContext from './context'
import { db } from '../../firebase';

import { collection, getDocs } from 'firebase/firestore';

function MyState(prop) {

  const [search,setSearch]=useState("");
    const [product,setProduct]=useState({
      title:"",
      price:"",
      description:"",
      imageUrl:"",
      category:"",
  
      }
    )
    const userid = JSON.parse(localStorage.getItem("user"));
    
    const [products,setProducts]=useState([]);
    const [editProducts,setEditProducts]=useState("");
    const [loading,setLoading]=useState(false)

    const readData=async()=>{
      const querySnapshot=await getDocs(collection(db,"product"))
      const items=querySnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }));
      setProducts(items);
    }

    const [order,setOrders]=useState([]);
    const getOrdersData=async()=>{
  const querySnapshot= await getDocs(collection(db,"orders"))
  const items=querySnapshot.docs.map((doc)=>({
     id:doc.id,
    ...doc.data()
  }

  ));
  setOrders(items)
}


    const [user,setUser]=useState([]);
    const getUsers=async()=>{
  const querySnapshot= await getDocs(collection(db,"users"))
  const items=querySnapshot.docs.map((doc)=>({
     id:doc.id,
    ...doc.data()
  }

  ));
  setUser(items)
}


  const [wishlist,setWishlist]=useState([]);
    const getWishlist=async()=>{
  const querySnapshot= await getDocs(collection(db,"wishlist"))
  const items=querySnapshot.docs.map((doc)=>({
     id:doc.id,
    ...doc.data()
  }

  ));
  setWishlist(items)
}

    useEffect(()=>{
      readData();
    },[product])

    useEffect(()=>{
      getWishlist();
    },[wishlist])


    useEffect(()=>{
      getOrdersData();
      getUsers();
      
    
    },[])
    // console.log(wishlist)
  return (
    <myContext.Provider value={{product,setProduct,products,setProducts,readData,editProducts,setEditProducts,loading,setLoading,order,user,search,setSearch,wishlist}}>
        {prop.children}
    </myContext.Provider>
  )
}

export default MyState