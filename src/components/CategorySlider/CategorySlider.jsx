import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots:false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    const [count, setcount] = useState(0)

    let [categoryProd , setcategoryProd]=useState([])
    async function getProducts(){
  
     
      let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      console.log(data.data);
      setcategoryProd(data.data)
      
    }

    useEffect(()=>{
      getProducts()
    } , [])
  return <>
  
  

  <Slider {...settings}>
  {categoryProd.map(( prod)=>{ return <div className='p-0'>
    <img src={prod.image} className='h-[250px] w-full object-center object-cover' alt="" />
    <h3>{prod.name}</h3>

  </div>})}
     </Slider>
  </>
}
