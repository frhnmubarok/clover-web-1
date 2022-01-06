import {useRouter} from "next/router"
import axios from 'axios';
axios.defaults.withCredentials = true;
import { BASE_URL_DEV, BASE_URL_MAIN } from '@/config/app';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const GoogleId = () =>{
  const router = useRouter()
  setTimeout(() => {
    if(Cookies.get('token') === undefined){

      axios({
        url: BASE_URL_DEV + `/api/auth/${router.query.googleId}`,
        method: 'GET',
        headers:{
          Origin: 'https://clover-web.vercel.app'
        },}).then((response)=>{
          console.log(response)
          Cookies.set('token', response.data.token, { expires: 30 });
          Cookies.set('role', response.data.data.role.role);
          localStorage.setItem('id', response.data.data.id);
          localStorage.setItem('fullname', response.data.data.fullname);
          localStorage.setItem('email', response.data.data.email);
          localStorage.setItem('role', response.data.data.role.role);
          toast.success('Login berhasil');
          router.push('/');
        }).catch((err)=>console.log(err))
      
    }
  },2000)
  return (
    <h1>Redirecting</h1>
  )
}
export default GoogleId