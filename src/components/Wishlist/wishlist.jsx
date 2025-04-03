import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import Loader from '../Loader/Loader';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Wishlist() {
    let { getfromWishlist, wishlistProducts, removeProductFromWishlist } = useContext(WishlistContext)
    let { addToCart } = useContext(CartContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getfromWishlist()
        setLoading(false)
    }, [])

    async function addProducrToCart(id) {
        let { data } = await addToCart(id)
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

    async function removeProduct(id) {
        try {
            const { data } = await removeProductFromWishlist(id)
            if (data.status === 'success') {
                toast.success('Product removed from wishlist')
                await getfromWishlist()
            }
        } catch (error) {
            toast.error('Error removing product from wishlist')
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        )
    }

    if (!wishlistProducts?.length) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Helmet>
                    <title>Freshcart - Wishlist</title>
                </Helmet>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <i className="fa-solid fa-heart text-6xl text-gray-300 mb-4"></i>
                    <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">Add items to your wishlist to see them here</p>
                    <Link to="/products" className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>Freshcart - Wishlist</title>
            </Helmet>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">My Wishlist</h2>
                <span className="text-gray-600">{wishlistProducts.length} items</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts?.map((prod) => (
                    <div key={prod._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="relative group">
                            <Link to={`/productDetails/${prod._id}/${prod.category.name}`}>
                                <img 
                                    src={prod.imageCover} 
                                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                    alt={prod.title}
                                />
                            </Link>
                            <button
                                onClick={() => removeProduct(prod._id)}
                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                            >
                                <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                            </button>
                        </div>
                        <div className="p-4">
                            <Link to={`/productDetails/${prod._id}/${prod.category.name}`}>
                                <span className="text-green-600 text-sm font-medium">{prod.category.name}</span>
                                <h3 className="text-lg font-semibold mt-2 mb-2 line-clamp-2">
                                    {prod.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-gray-900">{prod.price} EGP</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="text-gray-600">{prod.ratingsAverage}</span>
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={() => addProducrToCart(prod._id)}
                                className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



