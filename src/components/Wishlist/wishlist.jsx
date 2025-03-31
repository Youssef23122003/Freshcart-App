import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import Loader from '../Loader/Loader';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  let { getfromWishlist, wishlistProducts, removeProductFromWishlist } = useContext(WishlistContext)
  let { addToCart } = useContext(CartContext)
  const [loadingStates, setLoadingStates] = useState({
    cart: {},
    remove: {}
  });
  
  useEffect(() => { getfromWishlist() }, [])

  async function addProducrToCart(id) {
    setLoadingStates(prev => ({
      ...prev,
      cart: { ...prev.cart, [id]: true }
    }));
    
    let { data } = await addToCart(id)
    
    setLoadingStates(prev => ({
      ...prev,
      cart: { ...prev.cart, [id]: false }
    }));

    if (data.status == 'success') {
      toast.success(data.message, {
        position: "top-right",
      })
    } else {
      toast.error(data.message, {
        position: "top-right",
      })
    }
  }

  async function handleRemove(id) {
    setLoadingStates(prev => ({
      ...prev,
      remove: { ...prev.remove, [id]: true }
    }));
    
    await removeProductFromWishlist(id);
    
    setLoadingStates(prev => ({
      ...prev,
      remove: { ...prev.remove, [id]: false }
    }));
  }

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Freshcart Wishlist</title>
        </Helmet>
      </div>
      <h1 className='text-3xl text-red-800 py-5'>My Wishlist</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 md:px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">Product</th>
              <th scope="col" className="px-4 md:px-6 py-3">Delete</th>
              <th scope="col" className="px-4 md:px-6 py-3">Price</th>
              <th scope="col" className="px-4 md:px-6 py-3">Add</th>
            </tr>
          </thead>
          {wishlistProducts.length > 0 ? (
            <tbody>
              {wishlistProducts.map((prod) => (
                <tr
                  key={prod.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-2 md:p-4">
                    <img
                      src={prod.imageCover}
                      className="w-full lg:w-32 lg:h-32 max-w-full max-h-full object-cover"
                      alt={prod?.title || 'Product Image'}
                    />
                  </td>

                  <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white text-xs md:text-sm lg:text-base">
                    {prod?.title?.split(' ').slice(0, 2).join(' ')}
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleRemove(prod.id)}
                        className="bg-red-800 text-white px-2 md:px-4 py-2 md:py-4 rounded-md text-xs md:text-sm lg:text-base"
                        disabled={loadingStates.remove[prod.id]}
                      >
                        {loadingStates.remove[prod.id] ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <>
                            <i className="fa-solid fa-trash"></i> Remove
                          </>
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white text-xs md:text-sm lg:text-base">
                    ${prod.price}
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => addProducrToCart(prod.id)}
                      className="bg-green-500 text-white px-2 md:px-4 py-2 md:py-4 rounded-md text-xs md:text-sm lg:text-base"
                      disabled={loadingStates.cart[prod.id]}
                    >
                      {loadingStates.cart[prod.id] ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        'Add To Cart'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <Loader />
          )}
        </table>
      </div>
    </>
  );
}



