import React, { useContext, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { AuthContext } from '@/context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Grafik Penjualan',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const DashboardHomepage = ({ user }) => {
  const { cookies } = useContext(AuthContext);
  useEffect(() => {
    console.log(cookies);
  }, []);
  return (
    <div className='h-screen px-4 pb-24 overflow-auto md:px-6 font-lato'>
      <h1 className='text-4xl font-semibold text-gray-800 dark:text-white'>Selamat datang, {user}</h1>
      <h2 className='text-gray-400 text-md'>Here&#x27;s what&#x27;s happening with your account today.</h2>
      <div className='flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row'>
        <div className='w-full md:w-6/12'>
          <div className='relative w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-700'>
            <div className='flex items-center justify-between px-4 py-6 space-x-4'>
              <div className='flex items-center'>
                <span className='relative p-5 bg-yellow-100 rounded-full'>
                  <svg
                    width='40'
                    fill='currentColor'
                    height='40'
                    className='absolute h-5 text-yellow-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z'></path>
                  </svg>
                </span>
                <p className='ml-2 text-sm font-semibold text-gray-700 border-b border-gray-200 dark:text-white'>
                  Total Penjualan
                </p>
              </div>
              <div className='mt-6 text-xl font-bold text-black border-b border-gray-200 md:mt-0 dark:text-white'>
                Rp. 123.456.789
                {/* <span className='text-xs text-gray-400'>/$100K</span> */}
              </div>
            </div>
            <div className='w-full h-3 bg-white'>
              <div className='w-2/5 h-full text-xs text-center text-white bg-white'></div>
            </div>
          </div>
        </div>
        <div className='flex items-center w-full space-x-4 md:w-1/2'>
          <div className='w-1/2'>
            <div className='relative w-full px-4 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700'>
              <p className='text-2xl font-bold text-black dark:text-white'>12</p>
              <p className='text-sm text-gray-400'>Barang yang dijual</p>
            </div>
          </div>
          <div className='w-1/2'>
            <div className='relative w-full px-4 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700'>
              <p className='text-2xl font-bold text-black dark:text-white'>
                $93.76<span className='text-xs text-gray-400'>/$100K</span>
              </p>
              <p className='text-sm text-gray-400'>Commission in approval</p>
              {/* <span className='absolute p-4 bg-purple-500 rounded-full top-2 right-4'>
                <svg
                  width='40'
                  fill='currentColor'
                  height='40'
                  className='absolute h-4 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                  viewBox='0 0 1792 1792'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z'></path>
                </svg>
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center w-full space-x-4'>
        <div className='relative w-full px-4 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700'>
          <Line options={options} data={data} />
        </div>
        <div className='relative w-full px-4 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700'>
          <Line options={options} data={data} />
        </div>
      </div>
      {/* <div className='flex items-center space-x-4'>
        <button className='flex items-center px-4 py-2 text-gray-400 border border-gray-300 rounded-r-full rounded-tl-sm rounded-bl-full text-md'>
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='mr-2 text-gray-400'
            viewBox='0 0 1792 1792'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z'></path>
          </svg>
          Last month
          <svg
            width='20'
            height='20'
            className='ml-2 text-gray-400'
            fill='currentColor'
            viewBox='0 0 1792 1792'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z'></path>
          </svg>
        </button>
        <span className='text-sm text-gray-400'>Compared to oct 1- otc 30, 2020</span>
      </div> */}
    </div>
  );
};

export default DashboardHomepage;
