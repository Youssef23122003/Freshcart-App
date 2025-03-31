import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
export default function Footer() {
  return (
    <footer className="bg-gray-300 py-10">
      <div className="w-[90%] mx-auto px-4">
        {/* القسم العلوي */}
        <div className="">
          <h2 className="text-xl font-bold text-gray-800">Get The FreshCart App</h2>
          <p className="text-gray-600 mt-1">We will send you a link, Open it in your phone to download App</p>

          {/* إدخال البريد وزر المشاركة */}
          <div className="mt-4 flex">
            <input 
              type="email" 
              placeholder="Enter your Email" 
              className="w-[80%] p-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
              Share App Link
            </button>
          </div>
        </div>

        {/* خط فاصل */}
        <hr className="my-6 border-gray-300" />

        {/* القسم الأوسط */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-700 text-sm">
          {/* شركاء الدفع */}
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold">Payment Partners</h3>
            <div className="flex space-x-4 mt-2">
              <img src="https://fresh-cart-one.vercel.app/static/media/americanexpress.23e3b98512ffad5d0ad1.png" alt="American Express" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>

          {/* روابط تحميل التطبيق */}
          <div>
            <p className="text-gray-700">Get deliveries with FreshCart</p>
            <div className="flex space-x-4 mt-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-10" />
            </div>
          </div>
        </div>

        {/* خط فاصل */}
        <hr className="my-6 border-gray-300" />

        {/* حقوق الملكية */}
        <p className="text-center text-gray-500 text-sm">
          Copy Right 2025 © By Kareem Gafer All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
