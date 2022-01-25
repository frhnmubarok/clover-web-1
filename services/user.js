import callAPI from '@/config/api';
import Cookies from 'js-cookie';
const formData = true;

export async function getUserAddress() {
  const path = `/api/address`;

  return callAPI({
    path,
    method: 'GET',
    token: Cookies.get('token'),
  });
}

export async function getUserAddressById(addressId) {
  const path = `/api/address/${addressId}`;

  return callAPI({
    path,
    method: 'GET',
    token: Cookies.get('token'),
  });
}

export async function addUserAddress(data) {
  const path = `/api/address`;

  return callAPI({
    path,
    method: 'POST',
    token: Cookies.get('token'),
    data,
  });
}
export async function updatePrimaryAddress(data) {
  const path = `/api/address`;

  return callAPI({
    path,
    method: 'PUT',
    token: Cookies.get('token'),
    data,
  });
}

export async function deleteUserAddress(addressId) {
  const path = `/api/address/${addressId}`;

  return callAPI({
    path,
    method: 'DELETE',
    token: Cookies.get('token'),
  });
}

export async function updateUserAddress(addressId, data) {
  const path = `/api/address/${addressId}`;

  return callAPI({
    path,
    method: 'PUT',
    token: Cookies.get('token'),
    data,
  });
}

export async function getUserProfile() {
  const path = `/api/user`;

  return callAPI({
    path,
    method: 'GET',
    token: Cookies.get('token'),
  });
}

// const result = await axios.post(`${API_ENDPOINT}/add-image/${id}`, productData, {
//   headers: {
//     Authorization: 'Bearer ' + Cookies.get('token'),
//     Accept: 'multipart/form-data',
//     'Content-Type': 'multipart/form-data',
//   },
// });
// const axiosResult = result;
// return axiosResult;
