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
      }
    : {
        'Content-Type': `${
          formData ? 'multipart/form-data' : 'application/json'
        }`,
        Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
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
