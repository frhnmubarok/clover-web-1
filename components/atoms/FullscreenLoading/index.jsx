import React from 'react';
import { ImSpinner } from 'react-icons/im';

const FullscreenLoading = () => {
  return (
    <div id='loading-screen' className='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
      <span className='text-emerald-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 '>
        <ImSpinner className='animate-spin text-xl' />
      </span>
    </div>
  );
};

export default FullscreenLoading;
