import React, { useContext, useEffect, useState } from 'react'
import style from './Signin.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../context/CounterContext'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { WishlistContext } from '../../context/WishlistContext'
import toast from 'react-hot-toast/headless'



export default function Signin() {
  let {getfromWishlist} = useContext(WishlistContext)
  let {getCartItems} =useContext(CartContext)
let {setuserLogin}=  useContext(UserContext)
  const [apiError, setapiError] = useState(null)
  const [loading, setloading] = useState(false)
let navigate= useNavigate()

  let valdiation= Yup.object().shape({
    email: Yup.string().email('invalid mail').required('mail is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/ , 'invalid password').required('password is required'),
  })

async  function handleSubmit(val){
  setloading(true)
  console.log(val);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin
` ,val)
    .then((resp)=>{
      console.log(resp.data.token);
      localStorage.setItem('userToken',resp.data.token)
      setuserLogin(resp.data.token)
      setloading(false)
      getfromWishlist()
      getCartItems()
      if(resp?.data?.message=='success'){
        navigate('/')

      }
      
      
    })
    .catch((error)=>{
      setloading(false)
      console.log(error);
     
      setapiError(error.response.data.message)

    })
    
console.log(data)
  }

  
 
let formik= useFormik({
  initialValues:{
      email:"",
      password:"",
  } ,
  validationSchema:valdiation,
  onSubmit:handleSubmit

})

  return <>
  <h2 className='text-4xl text-green-600 font-bold  my-4'>Register Now</h2>

<form onSubmit={formik.handleSubmit} className="">

  <div className="relative z-0 w-full my-5 group">
      <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
  {formik.errors.email && formik.touched.email ?  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {formik.errors.email}
</div>: null}


  <div className="relative z-0 w-full my-5 group">
      <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
  </div>

{formik.errors.password && formik.touched.password ?   <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {formik.errors.password}
</div>: null}

{apiError ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {apiError}
</div>:null}
  <Link className='text-green-500' to={'/ForgetPassword'}>Forgot Password</Link>
  <button type="submit" class="focus:outline-none block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> {loading ?  <i className='fa-solid fa-spinner fa-spin'></i>:'Submit'}   </button>

  </form>
  
  
  </>
}
