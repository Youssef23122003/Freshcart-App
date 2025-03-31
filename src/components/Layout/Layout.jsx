import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
export default function Layout() {
    const [count, setcount] = useState(0)

    useEffect(()=>{

    })
  return <>
  <Navbar/>
 <div className="container px-8 m-auto py-16">
 <Outlet/>
 <Toaster/>
 
 </div>

  <Footer/>
  
  </>
}
