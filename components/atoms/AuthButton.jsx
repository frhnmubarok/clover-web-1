import React from 'react';
import clsxm from '@/utils/clsxm';
import { ImSpinner2 } from 'react-icons/im';

const AuthButton = ({ children, icon, isLoading }) => {
  return (
    <button
      type='submit'
      className='inline-flex items-center justify-center w-full py-3 pl-4 pr-5 space-x-2 text-base text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"'>
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default AuthButton;
