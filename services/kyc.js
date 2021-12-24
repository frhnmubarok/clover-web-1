import callAPI from '@/config/api';
import Cookies from 'js-cookie';

const API_ENDPOINT = `https://dev-api-clover.herokuapp.com/api`;
const token = Cookies.get('token');
const formData = true;

export async function addKYC(userData) {
  const url = `${API_ENDPOINT}/register-partner`;

  return callAPI({
    url,
    method: 'POST',
    data: userData,
    token,
    formData,
  });
}

// export async function createStore(formData) {
//   const url = `${API_ENDPOINT}/store`;

//   return callAPI({
//     url,
//     method: 'POST',
//     data: formData,
//     token,
//   });
// }
