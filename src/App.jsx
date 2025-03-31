import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './context/CounterContext'
import UserContextProvider from './context/UserContext'
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext'
import Payment from './components/Payment/Payment';
import WishlistContextProvider from './context/WishlistContext'
import Wishlist from './components/Wishlist/wishlist'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgetPassword from './components/ForgotPassword/ForgotPassword'
import VerifyCode from './components/Verify-Code/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'


const queryClient = new QueryClient();
let routes = createBrowserRouter([
  {
    path: '', 
    element: <Layout/>, 
    children: [
      { index: true, element: <ProtectRoutes><Home/></ProtectRoutes> },
      { path: 'signup', element: <Signup/> },
      { path: 'signin', element: <Signin/> },
      { path: 'products', element: <ProtectRoutes><Products/></ProtectRoutes> },
      { path: 'cart', element: <ProtectRoutes><Cart/></ProtectRoutes> },
      { path: 'ForgetPassword', element: <ForgetPassword/> },
      { path: 'VerifyCode', element: <VerifyCode/> },
      { path: 'ResetPassword', element: <ResetPassword/> },
      { path: 'payment', element: <ProtectRoutes><Payment/></ProtectRoutes> },
      { path: 'productDetails/:id/:category', element: <ProtectRoutes><ProductDetails/></ProtectRoutes> },
      { path: 'brands', element: <ProtectRoutes><Brands/></ProtectRoutes> },
      { path: 'categories', element: <ProtectRoutes><Categories/></ProtectRoutes> },
      { path: 'wishlist', element: <ProtectRoutes><Wishlist/></ProtectRoutes> },
      
      { path: '*', element: <Notfound/> },
    ]
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <WishlistContextProvider>
        <CartContextProvider>
          <CounterContextProvider>
            <UserContextProvider>                   
              <RouterProvider router={routes} />
            </UserContextProvider>
          </CounterContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </QueryClientProvider>
  )
}

export default App
