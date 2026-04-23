  
import { Route, Routes } from 'react-router'


import Navbar from './pages/Components/Navbar'
import Login from './pages/Login pages/Login'
import Register from './pages/Login pages/Register'
import { Navigate } from 'react-router'
import Home from './pages/Components/Home'
import AddProduct from './pages/Admin pages/AddProduct'

import Myorder from './pages/Components/Myorder'
import Wishlist from './pages/payment page/Wishlist'
// import AccessProducts from './pages/Admin pages/AccessProducts'
import Updateproduct from './pages/Admin pages/Updateproduct'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Dashboard from './pages/Admin pages/Dashboard'
import AccessProducts from './pages/Admin pages/AccessProducts'
import Orders from './pages/Admin pages/Orders'
import Users from './pages/Admin pages/Users'
import ProductInfo from './pages/Components/ProductInfo'

import { onAuthStateChanged } from "firebase/auth";

import { useDispatch } from "react-redux";


// import { loadCartFromFirebase } from './pages/Components/FirebaseCart'
// import { clearCart, setCart } from './pages/Redux/cartSlice'
import auth from './firebase'
import FilterItems from './pages/Components/FilterItems'





function App() {
  const stripePromise = loadStripe("pk_test_51SIPtZ5IC3U7PhCVrteWXMDqCcRDbpJRE8h3uJfIgzB6HRFWNTR7xZdaMaOcqBEw26jGRj5b8THZHdVmj2e3LZlw00OvJcBsJG");
//   const dispatch=useDispatch();
//   onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     // Load that user's cart
//     const items = await loadCartFromFirebase(user.uid);
//     dispatch(setCart(items));
//   } else {
//     // Clear cart on logout
//     dispatch(clearCart());
//   }
// });

  return (
    
    
  <div className=' dark:bg-black'>


    <Navbar/>

<Elements stripe={stripePromise}>
  <Routes>
<Route path='/login' element={<Login/>}/>
<Route path='/' element={<Home/>}/>

<Route path='/addproduct' element={
  <ProtectedRouteForAdmin><AddProduct/></ProtectedRouteForAdmin>
}/>
<Route path='/dashboard' element={<ProtectedRouteForAdmin><Dashboard/></ProtectedRouteForAdmin>}/>
<Route path='/updateproduct/:id' element={<ProtectedRouteForAdmin><Updateproduct/></ProtectedRouteForAdmin>}/>
<Route path='/myorder' element={<ProtectedRoute><Myorder/></ProtectedRoute>}/>

<Route path='/wishlist' element={<Wishlist/>}/>
<Route path='/productinfo/:id' element={<ProductInfo/>}/>


<Route path='/register' element={<Register/>}/>
<Route path='/FilterItem/:item' element={<FilterItems/>}/>
  </Routes>
</Elements>

    </div>

  )
}

export default App



const ProtectedRoute=({children})=>{
  const user=localStorage.getItem("user")
  if(user) return children;
  else{
    return <Navigate to={"/login"}/>
  }
}


const ProtectedRouteForAdmin=({children})=>{
  const user=JSON.parse(localStorage.getItem("user"))
  if(user&&user.user.email==="basantbhatt@gmail.com"){
      return children
    }
    else{
      return <Navigate to={"/login"}/>
  }
}