import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyCode = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
  });


  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        { resetCode: values.otp }
      );

      if (response.status === 200) {
        toast.success('OTP Verified successfully!');
        navigate('/ResetPassword'); 
      }
    } catch (error) {
      setLoading(false);
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h2 className="text-4xl text-green-600 font-bold my-4">Verify OTP</h2>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full my-5 group">
          <input
            type="text"
            id="otp"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="otp"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter OTP Code
          </label>
        </div>

        {formik.errors.otp && formik.touched.otp && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.otp}
          </div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      </form>

      <div className="text-center">
        <a href="/login" className="text-green-500">Back to Login</a>
      </div>
    </>
  );
};

export default VerifyCode;
