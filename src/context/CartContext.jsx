import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let CartContext= createContext()

export default function CartContextProvider(props){
    const [totalPrice, settotalPrice] = useState(0)
    const [cardId, setcardId] = useState(0)
    const [numOfItems, setnumOfItems] = useState(0)
    const [allProducts, setallProducts] = useState(null)


    let headers={
        token:localStorage.getItem('userToken')
    }

    function addToCart(id){
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:id
        } , {
            headers
        })
        .then((resp)=>{ 
            getCartItems()
            return resp

        })
        .catch((error)=>{ console.log(error);
            return error
        })

        
    }


    function getCartItems(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((resp)=>{ console.log(resp);
            settotalPrice(resp.data.data.totalCartPrice)
            setnumOfItems(resp.data.numOfCartItems)
            setallProducts( resp.data.data.products)
            setcardId(resp.data.cartId)
        })
        .catch((error)=>{ console.log(error);
        })
    }

    // https://ecommerce.routemisr.com/api/v1/cart/6408e5fd6406cd15828e8f28


    function UpdateCartItem(id , count){
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
            count: count
        } , {
            headers
        })
        .then((resp)=>{ console.log(resp);
            settotalPrice(resp.data.data.totalCartPrice)
            setnumOfItems(resp.data.numOfCartItems)
            setallProducts( resp.data.data.products)
            setcardId(resp.data.cartId)
        })
        .catch((error)=>{ console.log(error);
        })
    }

    function DeleteItem(id){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            headers
        })
        .then((resp)=>{ console.log(resp);
            settotalPrice(resp.data.data.totalCartPrice)
            setnumOfItems(resp.data.numOfCartItems)
            setallProducts( resp.data.data.products)
            setcardId(resp.data.cartId)
        })
        .catch((error)=>{ console.log(error);
        })
    }


    useEffect(()=>{

        getCartItems()
    } ,[])

    return <CartContext.Provider value={{addToCart , getCartItems , allProducts , setallProducts , setnumOfItems , settotalPrice , totalPrice , numOfItems , UpdateCartItem , DeleteItem , cardId}}>
         {props.children}
      
    </CartContext.Provider>
}