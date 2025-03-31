import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import Brands from './../Brands/Brands';
import { CounterContext } from '../../context/CounterContext';
import axios from 'axios';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import HomeSlider from '../HomeSlider/HomeSlider';
import { Helmet } from 'react-helmet';

export default function Home() {




  return <>
    <div className="application">
  <Helmet>  
      <title>Freshcart Home</title>
  </Helmet>
 </div>
  <HomeSlider/>
  <CategorySlider/>

  <RecentProducts/>
  <section className='py-4'></section>

  
  
  </>
}
