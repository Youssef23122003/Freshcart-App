import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  let { numOfItems } = useContext(CartContext);
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/signin');
  }

  return (
    <>
      <nav className='bg-gray-300 fixed top-0 end-0 start-0 z-20 px-10'>
        <div className='p-3 flex flex-col lg:justify-between lg:flex-row lg:items-center'>
          <div className='flex items-center justify-between w-full lg:w-auto'>
            <img width={120} src={logo} alt="Logo" />

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 text-2xl"
            >
              <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          <div className={`links flex flex-col lg:flex-row lg:items-center ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
            {userLogin !== null && localStorage.getItem('userToken') !== null ? (
              <ul className='flex flex-col lg:flex-row lg:items-center'>
                <li className='px-3 py-2'><NavLink to='/'>Home</NavLink></li>
                <li className='px-3 py-2'><NavLink to='products'>Products</NavLink></li>
                <li className='px-3 py-2'><NavLink to='brands'>Brands</NavLink></li>
                <li className='px-3 py-2'><NavLink to='categories'>Categories</NavLink></li>
                <li className='px-3 py-2'><NavLink to='cart'>Cart</NavLink></li>
                <li className='px-3 py-2'><NavLink to='wishlist'>Wishlist</NavLink></li>
                <li className='px-3 py-2 relative'>
                  <NavLink to={'/cart'}>
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  </NavLink>
                  <span className='p-1 rounded-md absolute bottom-5 text-white bg-green-500'>{numOfItems}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div 
            className={`extra-links flex flex-col lg:flex-row lg:items-center ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
          >
            <ul className='flex flex-col lg:flex-row lg:items-center'>
              {userLogin === null || localStorage.getItem('userToken') === null ? (
                <>
                  <li className='px-3 py-2'><NavLink to='signup'>Register</NavLink></li>
                  <li className='px-3 py-2'><NavLink to='signin'>Login</NavLink></li>
                </>
              ) : (
                <li onClick={logout} className='px-3 py-2'>
                  <span className='cursor-pointer'>Logout</span>
                </li>
              )}
              <li className='flex justify-center lg:justify-start mt-3 lg:mt-0'>
                <i className='fab px-3 fa-facebook'></i>
                <i className='fab px-3 fa-instagram'></i>
                <i className='fab px-3 fa-tiktok'></i>
                <i className='fab px-3 fa-youtube'></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}














































































































// import React, { useContext, useEffect, useState } from 'react'
// import style from './Navbar.module.css'
// import logo from '../../assets/images/freshcart-logo.svg'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { UserContext } from '../../context/UserContext'
// import { CartContext } from '../../context/CartContext'

// export default function Navbar() {

//   let {numOfItems} = useContext(CartContext)
//   let navigate=useNavigate()

// let {userLogin , setuserLogin}= useContext(UserContext)
// function logout(){
//   localStorage.removeItem('userToken')
//   setuserLogin(null)
//   navigate('/signin')



// }

//     useEffect(()=>{

//     })
//   return <>

//   <nav className='bg-gray-300 lg:fixed top-0 end-0 start-0 z-20'>
//     <div className="p-3 flex flex-col lg:justify-between lg:flex-row lg:items-center">
//       <div className="links flex flex-col lg:flex-row lg:items-center ">
//         <img width={120} src={logo} alt="" />
//         {userLogin !==null ? <> <ul className='flex justify-center me-auto flex-col lg:flex-row'>
//           <li className='px-3 py-2'><NavLink to='/'>Home</NavLink></li>
//           <li className='px-3 py-2'><NavLink to='products'>Products</NavLink></li>
//           <li className='px-3 py-2'><NavLink to='brands'>Brands</NavLink></li>
//           <li className='px-3 py-2'><NavLink to='categories'>Categories </NavLink></li>
//           <li className='px-3 py-2'><NavLink to='cart'>Cart </NavLink></li>
//           <li className='px-3 py-2'><NavLink to='wishlist'>Wishlist </NavLink></li>
//           <li className='px-3 py-2 relative'><NavLink to={'/cart'}><i class="fa-solid fa-cart-shopping text-2xl"></i></NavLink> <span className='p-1 rounded-md absolute bottom-5 text-white bg-green-500'>{numOfItems}</span></li>
         

//         </ul></> : null }
       
//       </div>
//       <div className="icons">
//         <ul className='flex flex-col lg:flex-row lg:items-center'>
//        {userLogin == null ? <> <li className='px-3 py-2'><NavLink to='signup'>Register</NavLink></li>
//         <li className='px-3 py-2'><NavLink to='signin'>Login</NavLink></li></> :  <li onClick={logout} className='px-3 py-2'><span className='cursor-pointer' to=''>Logout</span></li> }

      
//         <li>
//           <i className='fab px-3 fa-facebook'></i>
//           <i className='fab px-3 fa-instagram'></i>
//           <i className='fab px-3 fa-tiktok'></i>
//           <i className='fab px-3 fa-youtube'></i>
//         </li>

//         </ul>
//       </div>

//     </div>

//   </nav>
  
  
  
  
//   </>
// }
