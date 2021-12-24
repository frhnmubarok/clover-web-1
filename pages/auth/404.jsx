import { HiArrowCircleLeft } from 'react-icons/hi';
import Link from 'next/link';

import Main from '@/components/atoms/Main';

const Custom404 = () => {
  return (
    <Main title='404 Page Not Found!' className='container'>
      <div className='h-screen flex justify-center items-center'>
        <div className='max-w-lg w-full space-y-4 p-4 md:p-10'>
          <h2 className='mt-4 text-center text-2xl font-extrabold text-gray-900'>404 Page Not Found!</h2>
          <p className='my-2 text-center text-sm text-gray-600'>
            Opps! Sorry, The page you are visiting does not exist.
          </p>
          <div className='relative mt-4'>
            <Link href='/'>
              <a className='group inline-flex justify-center items-center w-full text-sm font-semibold bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-800 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 ease-in-out duration-150'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <HiArrowCircleLeft className='h-5 w-5' />
                </span>
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Custom404;
