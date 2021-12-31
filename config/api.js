import axios from 'axios';
axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';

// const BASE_URL = 'https://dev-api-clover.herokuapp.com';
import { BASE_URL_DEV, BASE_URL_MAIN } from '@/config/app';

async function callAPI({ path, method, data, token, formData }) {
  const headers = token
    ? {
        'Content-Type': `${formData ? 'multipart/form-data' : 'application/json'}`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
        Authorization: 'Bearer ' + token,
        // 'Access-Control-Allow-Credentials': 'true',
        Origin: 'http://localhost:3000',
      }
    : {
        'Content-Type': `${formData ? 'multipart/form-data' : 'application/json'}`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
        // 'Access-Control-Allow-Credentials': 'true',
        Origin: 'http://localhost:3000',
      };

  const response = await axios({
    url: BASE_URL_DEV + path,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }
  const res = {
    error: false,
    message: 'success',
    data: response.data,
  };

  // console.log(res);

  return res;
}
export default callAPI;

export async function callRajaOngkirAPI({ path, method, token }) {
  const headers = token
    ? {
        Accept: `*/*`,
        Authorization: 'Bearer ' + token,
        Origin: 'http://localhost:3000',
      }
    : {
        Accept: `*/*`,
        Origin: 'http://localhost:3000',
      };

  const response = await axios({
    url: BASE_URL_DEV + path,
    method,
    headers,
  }).catch((err) => err.response);

  console.log(response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }
  const res = {
    error: false,
    message: 'success',
    data: response.data,
  };

  console.log(res);

  return res;
}
