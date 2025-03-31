import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'


export let WishlistContext = createContext()
export default function WishlistContextProvider(props) {
    const [wishlistProducts, setuserWishlistProducts] = useState([])
    let headers={
        token:localStorage.getItem('userToken')
    }

    async function addToWishlist(id){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{"productId":id},{headers}).then
        ((resp)=>{console.log(resp);
        return resp
        }).catch((error)=>{console.log(error);
            return error
        })
    }
    async function getfromWishlist(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers}).then((resp)=>{console.log(resp.data.data);
        setuserWishlistProducts(resp.data.data)
        return resp
        }).catch((error)=>{console.log(error);
            return error
        })
    }
    async function removeProductFromWishlist(id){
        return await axios.delete(`https:ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers}).then((resp)=>{console.log(resp);
        // setuserWishlistProducts(resp.data.data)
        getfromWishlist()
        toast.success('Product is removed Successfully ', { position: "top-right" });
        return resp
        }).catch((error)=>{console.log(error);
            return error
        })
    }

  return (
    <>
    <WishlistContext.Provider value={{addToWishlist,getfromWishlist,wishlistProducts,removeProductFromWishlist}}>
        {props.children}
    </WishlistContext.Provider>
    </>
  )
}
