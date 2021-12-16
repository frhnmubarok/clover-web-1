import axios from 'axios';
axios.defaults.withCredentials = true;

async function callAPI({ url, method, data }) {
  const response = await axios({
    url,
    method,
    data,
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
    data: response.data.data,
  };

  console.log(res);

  return res;
}

export default callAPI;
