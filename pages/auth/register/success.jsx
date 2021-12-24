import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import SuccessIllustration from '@/assets/images/register-success.png';

const Success = () => {
  return (
    <div>
      <section className='min-h-screen flex justify-center items-center' style={{ backgroundColor: '#FFFDFD' }}>
        <div>
          <div className='container mx-auto flex items-center justify-center flex-col'>
            <Image
              className='sm:w-auto w-5/6 mb-3 object-cover object-center'
              src={SuccessIllustration}
              width={420}
              height={415}
              alt=''
            />
            <div className='text-center w-full'>
              <h1 className='text-3xl mb-3 font-semibold text-black tracking-wide'>Akun Berhasil Dibuat</h1>
              <p className='caption-text mb-12 text-base tracking-wide leading-7'>
                Silakan login untuk bisa menggunakan aplikasi Clover.
              </p>
              {/* <div className="flex justify-center">
                <button className="btn-view inline-flex font-semibold text-white text-lg leading-7 py-4 px-8 rounded-xl focus:outline-none">
                  Set Your Account
                </button>
              </div> */}
              <div className='flex justify-center'>
                <div className='flex-col'>
                  <Link href='/'>
                    <a className='w-80 flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 mb-4'>
                      Ke Halaman Utama
                    </a>
                  </Link>
                  <Link href='/login'>
                    <a className='w-80 flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500'>
                      Ke Halaman Login
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
