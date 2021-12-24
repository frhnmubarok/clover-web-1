import axios from 'axios';
axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';

const BASE_URL = 'https://dev-api-clover.herokuapp.com';

async function callAPI({ path, method, data, token, formData }) {
  const headers = token
    ? {
        'Content-Type': `${
          formData ? 'multipart/form-data' : 'application/json'
        }`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Credentials': true,
      }
    : {
        'Content-Type': `${
          formData ? 'multipart/form-data' : 'application/json'
        }`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
        'Access-Control-Allow-Credentials': true,
      };

  const response = await axios({
    url: BASE_URL + path,
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

export async function callRajaOngkirAPI({ url, method, token }) {
  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   Accept: `*/*`,
  //   key: 'e98c6aeac3ed3f46ba4f5828e6bbe0ab',
  // };
  const headers = token
    ? {
        Accept: `*/*`,
        Authorization: 'Bearer ' + token,
        key: 'e98c6aeac3ed3f46ba4f5828e6bbe0ab',
      }
    : {
        Accept: `*/*`,
        key: 'e98c6aeac3ed3f46ba4f5828e6bbe0ab',
      };

  const response = await axios({
    url,
    method,
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

  console.log(res);

  return res;
}
