import axios from 'axios';
axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';

const token = Cookies.get('token');

import { BASE_URL_DEV, BASE_URL_MAIN } from '@/config/app';

const fetcher = async (path, formData) => {
  const headers = token
    ? {
        'Content-Type': `${formData ? 'multipart/form-data' : 'application/json'}`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
        Authorization: 'Bearer ' + token,
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Origin': '*',
        Origin: 'http://localhost:3000',
      }
    : {
        'Content-Type': `${formData ? 'multipart/form-data' : 'application/json'}`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Origin': '*',
        Origin: 'http://localhost:3000',
      };

  const response = await axios({
    url: BASE_URL_DEV + path,
    method: 'GET',
    headers,
  }).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return response.data.message;
  }
  const res = {
    error: false,
    message: 'success',
    data: response.data,
  };

  // console.log(res);

  return response.data;
};

export default fetcher;
