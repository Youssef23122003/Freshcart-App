import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

 
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email: values.email }
      );

      if (response.status === 200) {
        toast.success('Password reset link sent to your email!');
        navigate('/VerifyCode');
      } else {
        toast.error('Failed to send password reset link.');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred while sending the reset link.');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h2 className='text-4xl text-green-600 font-bold my-4'>Forgot Password</h2>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full my-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Email
          </label>
        </div>

        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>

      <div className="text-center">
        <a href="/login" className="text-green-500">Back to Login</a>
      </div>
    </>
  );
};

export default ForgetPassword;
