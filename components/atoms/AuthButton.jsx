import React from 'react';

const AuthButton = ({ children, icon, isLoading }) => {
  const classes = `w-44 flex justify-center bg-primary-500 hover:bg-primary-600 text-gray-100 p-3 rounded-2xl tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 text-xl ${
    isLoading === true && 'animate-spin'
  }`;
  return (
    <button
      type='submit'
      className='w-40 flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-gray-100 p-2 rounded-2xl tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 text-lg'>
      <span className='mr-4'>{icon}</span>
      {children}
    </button>
  );
};

export default AuthButton;
