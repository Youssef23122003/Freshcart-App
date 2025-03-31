import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet'
import Spinner from '../Spinner/Spinner'

export default function Brands() {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [brandDetails, setBrandDetails] = useState(null)
    const [loadingDetails, setLoadingDetails] = useState(false)
    const headers = {
        token: localStorage.getItem('userToken')
    }

    async function getBrands() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands', { headers })
            setBrands(data.data)
            setLoading(false)
        } catch (error) {
            toast.error('Error fetching brands')
            setLoading(false)
        }
    }

    async function getBrandDetails(brandId) {
        setSelectedBrand(brandId)
        setLoadingDetails(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, { headers })
            setBrandDetails(data.data)
        } catch (error) {
            toast.error('Error fetching brand details')
        } finally {
            setLoadingDetails(false)
        }
    }

    useEffect(() => {
        getBrands()
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <div className="application">
                <Helmet>  
                    <title>Freshcart Brands</title>
                </Helmet>
            </div>
            <h1 className='text-center text-green-400 py-4 text-4xl'>All Brands</h1>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {brands.map((brand) => (
                        <div 
                            key={brand._id}
                            onClick={() => getBrandDetails(brand._id)}
                            className="rounded-md border text-center hover:shadow-green-400 shadow-md transition-all p-4 cursor-pointer"
                        >
                            <img 
                                src={brand.image} 
                                className="w-full h-40 object-cover rounded-md mb-3"
                                alt={brand.name} 
                            />
                            <h6 className="text-lg font-semibold">{brand.name}</h6>
                        </div>
                    ))}
                </div>
            </div>

            {selectedBrand && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">Brand Details</h3>
                            <button 
                                onClick={() => {
                                    setSelectedBrand(null)
                                    setBrandDetails(null)
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        {loadingDetails ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                            </div>
                        ) : brandDetails && (
                            <div className="flex flex-col items-center">
                                <img 
                                    src={brandDetails.image} 
                                    alt={brandDetails.name} 
                                    className="w-32 h-32 object-contain mb-4"
                                />
                                <h4 className="text-xl font-semibold mb-2">{brandDetails.name}</h4>
                                <p className="text-gray-600">Slug: {brandDetails.slug}</p>
                                <p className="text-gray-600">Created At: {new Date(brandDetails.createdAt).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
