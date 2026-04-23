import React, { useContext } from 'react'
import myContext from '../context page/context'


function Users() {
     const {user}=useContext(myContext)
    
  return (
    
        <div className='p-2  bg-yellow-600 text-white  relative'>
      
      <div className=' overflow-x-auto scrollbar-hide mt-8'>
        <table className='border text-sm  w-full text-left '>
    <thead className='text-xs '>
        <tr>
          <th className='border  px-6 py-2'>S.No</th>
          
          <th className='border  px-6 py-2'>Name</th>
          <th className='border  px-6 py-2'>Email</th>
          <th className='border  px-6 py-2'>User id</th>
          
          <th className='border  px-6 py-2'>Password</th>
         
         
        </tr> 
      
    </thead>
    {
      user.map((user,index)=>
      
        
         (
          
        <tbody key={index}>
        <tr>
          
        <td className='border  px-6 py-2'>{index+1}</td>
        <td className='border  px-6 py-2'>{user.name}</td>
        <td className='border  px-6 py-2'>{user.email}</td>
        <td className='border  px-6 py-2'>{user.uid}</td>
        <td className='border  px-6 py-2'>{user.password}</td>
       
        
        
 
      </tr>
    </tbody>
      ))
    
    }
   
    </table>
    </div>
    </div>
    
  )
}

export default Users