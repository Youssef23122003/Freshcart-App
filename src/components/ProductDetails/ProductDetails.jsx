import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { WishlistContext } from '../../context/WishlistContext'
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let { addToCart } = useContext(CartContext)
  let { addToWishlist } = useContext(WishlistContext)
  const [loadingStates, setLoadingStates] = useState({
    cart: false,
    wishlist: false
  });

  async function addProducrToCart(id) {
    setLoadingStates(prev => ({ ...prev, cart: true }));
    let { data } = await addToCart(id)
    setLoadingStates(prev => ({ ...prev, cart: false }));
    
    if (data.status == 'success') {
      toast.success(data.message, {
        position: "top-right",
      })
    }
    else {
      toast.error(data.message, {
        position: "top-right",
      })
    }
  }

  async function addToFav(id) {
    setLoadingStates(prev => ({ ...prev, wishlist: true }));
    let { data } = await addToWishlist(id);
    setLoadingStates(prev => ({ ...prev, wishlist: false }));
    
    setWishlistState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    
    if (data.status === 'success') {
      toast.success(data.message, { position: "top-right" });
    } else {
      toast.error(data.message, { position: "top-right" });
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let {id , category}= useParams()
  console.log(id);
  
    const [deatils, setDeatils] = useState(null)
    const [categoryProd, setcategoryProd] = useState(null)
   const [wishlistState, setWishlistState] = useState(() => {
       return JSON.parse(localStorage.getItem('wishlistState')) || {};
     });



  async  function productDeatils(){
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setDeatils(data.data)
      
    }

     useEffect(() => {
        localStorage.setItem('wishlistState', JSON.stringify(wishlistState));
      }, [wishlistState]);

    async function getProductsCategory(){

   
      let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      console.log('all Prod'  , data.data);
      let newArr= data.data.filter((prod)=>{ return prod.category.name == category })
      console.log( 'same category' , newArr);
      setcategoryProd(newArr)
      
      
    }
    




    useEffect(()=>{
      productDeatils()
      getProductsCategory()
    } , [id ,category])
  return <>
  <div className="application">
  <Helmet>  
      <title>Freshcart ProductDetails</title>
  </Helmet>
 </div>
 {deatils ?  <div className="lg:flex flex-wrap py-8 items-center">
    <div className="lg:w-1/4 sm:w-full px-5">
    <Slider {...settings}>
      {deatils.images.map((srcImg , index)=>{return  <img key={index}  src={srcImg}  className='w-full' alt="" />})}
    

    </Slider>
    </div>

    <div className="lg:w-2/4 sm:w-full px-4">
    <div className='product'>
    <h3 className='text-4xl text-gray-700 my-4 font-bold'>{deatils?.title.split(' ').slice(0,2).join(' ')}</h3>
<p className='text-gray-500'>{deatils.description}</p>
    <span className='text-green-700 font-light'>{deatils?.category.name}</span>
    <div className="flex justify-between">
      <span>{deatils?.price} EGP</span>
      <span> {deatils?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
    </div>
    <div className="flex items-center gap-2">
      <button  onClick={()=>{addProducrToCart(deatils._id)}}   className='btn' disabled={loadingStates.cart}>
        {loadingStates.cart ? (
          <i className='fas fa-spinner fa-spin'></i>
        ) : (
          'Add To Cart'
        )}
      </button>
      <button  onClick={()=>{addToFav(deatils._id)}}   className='bg-transparent border-none' disabled={loadingStates.wishlist}>
        {loadingStates.wishlist ? (
          <i className="fas fa-spinner fa-spin text-red-700 text-3xl"></i>
        ) : (
          <i class="fa-solid fa-heart text-3xl" style={{
                      color: wishlistState[deatils._id] ? "red" : "gray",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}></i> 
        )}
      </button>
    </div>

  </div>

    </div>

  </div>: <Spinner/>}
  

  <div className="flex flex-wrap mt-5 py-5">
    {categoryProd?.map((prod) => (
      <div key={prod.id} className='w-full sm:w-1/3 md:w-1/4 lg:w-1/6'>
        <div className="product px-6 py-10 group">
          <Link to={`/productDetails/${prod.id}/${prod?.category?.name}`}>
            <img src={prod.imageCover} className='w-full' alt="" />
            <span className='text-green-700 font-light'>{prod?.category?.name}</span>
            <h3 className='text-xl font-normal'>{prod.title.split(' ').slice(0, 2).join(' ')}</h3>
            <div className="flex justify-between">
              <span>{prod?.price} EGP</span>
              <span>{prod.ratingsAverage}<i className="fas fa-star text-yellow-300"></i></span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => addProducrToCart(prod._id)}
              className='btn'
              disabled={loadingStates.cart[prod._id]}
            >
              {loadingStates.cart[prod._id] ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                'Add To Cart'
              )}
            </button>
            <button
              onClick={() => addToFav(prod._id)}
              className="bg-transparent border-none"
              disabled={loadingStates.wishlist[prod._id]}
            >
              {loadingStates.wishlist[prod._id] ? (
                <i className="fas fa-spinner fa-spin text-red-700 text-3xl"></i>
              ) : (
                <i className="fa-solid text-red-700  fa-heart text-3xl" style={{
                
                  cursor: "pointer"
                }}></i>
              )}
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  </>
}
