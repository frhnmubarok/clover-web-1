import callAPI from '@/config/api';
import Cookies from 'js-cookie';

const API_ENDPOINT = `https://dev-api-clover.herokuapp.com/api`;
const token = Cookies.get('token');

export async function authRegister(userData) {
  const url = `${API_ENDPOINT}/register`;

  return callAPI({
    url,
    method: 'POST',
    data: userData,
  });
}

export async function authLogin(userData) {
  const url = `${API_ENDPOINT}/login`;

  return callAPI({
    url,
    method: 'POST',
    data: userData,
  });
}

export async function authChangePassword(userData) {
  const url = `${API_ENDPOINT}/update-password`;

  return callAPI({
    url,
    method: 'PUT',
    data: userData,
    token,
  });
}

export async function authForgotPassword(userData) {
  const url = `${API_ENDPOINT}/forgot-password`;

  return callAPI({
    url,
    method: 'POST',
    data: userData,
  });
}

export async function authVerifOTP(userData) {
  const url = `${API_ENDPOINT}/confirm-otp/${localStorage?.getItem('userId')}`;

  return callAPI({
    url,
    method: 'PUT',
    data: userData,
  });
}

export async function authConfirmPassword(userData) {
  const url = `${API_ENDPOINT}/confirm-password/${localStorage?.getItem('userId')}`;

  return callAPI({
    url,
    method: 'POST',
    data: userData,
  });
}

export async function authLogout(userData) {
  const url = `${API_ENDPOINT}/logout`;

  return callAPI({
    url,
    method: 'POST',
    data: userData,
    token,
  });
}

export async function authGetRoles(userData) {
  const url = `${API_ENDPOINT}/roles`;

  return callAPI({
    url,
    method: 'GET',
    data: userData,
    token,
  });
}
