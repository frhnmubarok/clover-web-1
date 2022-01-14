import callAPI from '@/config/api';
import Cookies from 'js-cookie';

const API_ENDPOINT = `https://dev-api-clover.herokuapp.com/api`;
const token = Cookies.get('token');
const formData = true;

export async function addKYC(userData) {
  // const url = `${API_ENDPOINT}/register-partner`;
  const path = '/api/register-partner';

  return callAPI({
    path,
    method: 'POST',
    data: userData,
    token: Cookies.get('token'),
    formData,
  });
}
export async function addReview(userData) {
  const path = '/api/add-review';

  // const url = `${API_ENDPOINT}/add-review`;

  return callAPI({
    path,
    method: 'POST',
    data: userData,
    token: Cookies.get('token'),
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
