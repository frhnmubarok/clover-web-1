import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CloverImage from '@/assets/images/logo-clover.png';

const AuthLayout = ({ children, formImage, formLabel }) => {
  return (
    <div
      className="bg-center bg-no-repeat bg-cover"
      // style={{ backgroundImage: "url(bg.jpg)" }}
    >
      <div className="fixed top-0 right-0">
        <svg
          width="657"
          height="278"
          viewBox="0 0 657 278"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M658 0H0C18.5 44.5 28.5 29.5 62 50C95.5 70.5 107 116 175.5 150C244 184 353.5 157.5 413 222C460.6 273.6 596.167 279.833 658 276.5V0Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>
      <div className="fixed bottom-0 left-0">
        <svg
          width="539"
          height="491"
          viewBox="0 0 539 491"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-1 491V19.5C7.33333 11 30.9 -4.30002 58.5 2.49998C193.915 35.863 203.244 176.976 309 215C353.5 231 337.5 301.5 338.5 322C339.5 342.5 336 369.5 358 390.5C380 411.5 448 375.5 500.5 405.5C542.5 429.5 541.667 472.5 536 491H-1Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>
      <div className="container relative flex items-center justify-center mx-auto">
        <div className="flex justify-center max-w-xl min-h-screen mx-0 sm:flex-row">
          <div className="z-10 flex self-center justify-center">
            <div className="p-12 mx-auto w-100">
              <div className="mb-4">
                <div className="flex flex-col items-center mb-2">
                  {formImage && (
                    <Link href="/">
                      <a className="cursor-pointer">
                        <Image
                          src={CloverImage}
                          alt="Picture of the author"
                          width={220}
                          height={78}
                          quality={100}
                        />
                      </a>
                    </Link>
                  )}
                  {formLabel && (
                    <div className="flex flex-col items-center mb-2">
                      {' '}
                      <p className="text-2xl font-medium">{formLabel}</p>{' '}
                    </div>
                  )}
                </div>
                <p className="text-gray-500"></p>
              </div>
              <div className="space-y-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
