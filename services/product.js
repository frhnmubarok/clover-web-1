import callAPI from '@/config/api';
import Cookies from 'js-cookie';

const API_ENDPOINT = `https://dev-api-clover.herokuapp.com/api`;
const token = Cookies.get('token');
const formData = true;

export async function insertProductAPI(productData) {
  const url = `${API_ENDPOINT}/products`;

  return callAPI({
    url,
    method: 'POST',
    data: productData,
    token,
  });
  // const result = await axios.post(`${API_ENDPOINT}/products`, JSON.stringify(productData), {
  //   headers: {
  //     Authorization: 'Bearer ' + Cookies.get('token'),
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const axiosResult = result;
  // return axiosResult;
}

export async function createStoreAPI(formData) {
  const url = `${API_ENDPOINT}/store`;

  return callAPI({
    url,
    method: 'POST',
    data: formData,
    token,
    formData,
  });
}

export async function insertProductImageAPI(productData, id) {
  const url = `${API_ENDPOINT}/add-image/${id}`;

  return callAPI({
    url,
    method: 'POST',
    data: productData,
    token,
    formData,
  });
  // const result = await axios.post(`${API_ENDPOINT}/add-image/${id}`, productData, {
  //   headers: {
  //     Authorization: 'Bearer ' + Cookies.get('token'),
  //     Accept: 'multipart/form-data',
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });
  // const axiosResult = result;
  // return axiosResult;
}
