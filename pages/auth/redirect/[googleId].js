import { useRouter } from 'next/router';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { BASE_URL_DEV, BASE_URL_MAIN } from '@/config/app';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const GoogleId = () => {
  const router = useRouter();
  setTimeout(() => {
    if (Cookies.get('token') === undefined) {
      axios({
        url: BASE_URL_DEV + `/api/auth/${router.query.googleId}`,
        method: 'GET',
        headers: {
          Origin: 'https://clover-web.vercel.app',
        },
      })
        .then((response) => {
          if (Cookies.get('token') === undefined) {
            console.log(response);
            Cookies.set('token', response.data.token, { expires: 30 });
            Cookies.set('role', response.data.data.role.role);
            localStorage.setItem('id', response.data.data.id);
            localStorage.setItem('fullname', response.data.data.fullname);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('role', response.data.data.role.role);
            router.push('/');
            toast.success('Login berhasil');
          }
        })
        .catch((err) => console.log(err));
    }
  }, 1200);

  return (
    <section className='max-h-screen h-full w-full border-box lg:px-24 md:px-16 sm:px-8 px-8 sm:py-32 pt-20 pb-20 transition-all duration-500 linear'>
      <div className='empty-3-3'>
        <div className='container mx-auto flex items-center justify-center flex-col'>
          <img
            className='sm:w-auto w-5/6 mb-10 object-cover object-center'
            src='http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-1.png'
            alt=''
          />
          <div className='text-center w-full'>
            <h1 className='text-3xl mb-3 font-semibold text-black tracking-wide'>Login Berhasil</h1>
            <p className='caption-text mb-12 text-base tracking-wide leading-7'>
              Sebentar lagi Anda akan diarahkan ke halaman utama
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GoogleId;
