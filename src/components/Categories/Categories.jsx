import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(false)

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            setCategories(data.data)
            setLoading(false)
        } catch (error) {
            toast.error('Error fetching categories')
            setLoading(false)
        }
    }

    async function getCategoryProducts(id) {
        setLoadingProducts(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            setCategoryProducts(data.data)
            setSelectedCategory(data.data)
        } catch (error) {
            toast.error('Error fetching category products')
        }
        setLoadingProducts(false)
    }

    useEffect(() => {
        getCategories()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>  
                <title>Freshcart Catgegories</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-8">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((category) => (
                    <div key={category._id} className="w-full rounded-md shadow-md hover:shadow-green-500">
                        <div className="product px-6 py-10 group">
                            <div onClick={() => getCategoryProducts(category._id)} className="cursor-pointer">
                                <img 
                                    src={category.image} 
                                    className="w-full h-72 object-cover rounded-t-md" 
                                    alt={category.name}
                                />
                                <h3 className="text-xl font-normal">{category.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        {loadingProducts ? (
                            <div className="flex justify-center items-center min-h-[200px]">
                                <Loader />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryProducts?.products?.map((prod) => (
                                    <div key={prod._id} className="w-full rounded-md shadow-md hover:shadow-green-500">
                                        <div className="product px-6 py-10 group">
                                            <Link to={`/productDetails/${prod._id}/${prod.category.name}`}>
                                                <img 
                                                    src={prod.imageCover} 
                                                    className="w-full h-72 object-cover rounded-t-md" 
                                                    alt={prod.title}
                                                />
                                                <span className="text-green-700 font-light">{prod.category.name}</span>
                                                <h3 className="text-xl font-normal">
                                                    {prod.title.split(' ').slice(0, 2).join(' ')}
                                                </h3>
                                                <div className="flex justify-between">
                                                    <span>{prod.price} EGP</span>
                                                    <span>{prod.ratingsAverage}<i className="fas fa-star text-yellow-300"></i></span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
