import React from 'react';
import clsxm from '@/utils/clsxm';
import { ImSpinner2 } from 'react-icons/im';

const AuthButton = ({ children, icon, isLoading }) => {
  console.log(isLoading);
  return (
    <button
      type='submit'
      disabled={isLoading}
      className={`btn rounded-2xl bg-primary-500 border-0 px-8 disabled:cursor-not-allowed hover:bg-primary-600 disabled:bg-primary-500 ${
        isLoading && 'relative disabled:cursor-wait loading'
      }`}>
      <span className='mr-4'>{icon}</span>
      {children}
    </button>
  );
};

export default AuthButton;
