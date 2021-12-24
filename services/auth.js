import callAPI from '@/config/api';
import Cookies from 'js-cookie';
import axios from 'axios';

// const API_ENDPOINT = `https://dev-api-clover.herokuapp.com/api`;
const token = Cookies.get('token');

export async function authRegister(userData) {
  const path = `/api/register`;

  return callAPI({
    path,
    method: 'POST',
    data: userData,
  });
}

export async function authLogin(userData) {
  const path = `/api/login`;

  return callAPI({
    path,
    method: 'POST',
    data: userData,
  });
}

export async function authChangePassword(userData) {
  const path = `/api/update-password`;

  return callAPI({
    path,
    method: 'PUT',
    data: userData,
    token,
  });
}

export async function authForgotPassword(userData) {
  const path = `/api/forgot-password`;

  return callAPI({
    path,
    method: 'POST',
    data: userData,
  });
}

export async function authVerifOTP(userData) {
  const path = `/api/confirm-otp/${localStorage?.getItem('userId')}`;

  return callAPI({
    path,
    method: 'PUT',
    data: userData,
  });
}

export async function authConfirmPassword(userData) {
  const path = `/api/confirm-password/${localStorage?.getItem('userId')}`;

  return callAPI({
    path,
    method: 'POST',
    data: userData,
  });
}

export async function authLogout(userData) {
  const path = `/api/logout`;

  return callAPI({
    path,
    method: 'POST',
    data: userData,
    token,
  });
}

export async function authGetRoles(userData) {
  const path = `/api/roles`;

  return callAPI({
    path,
    method: 'GET',
    data: userData,
    token,
  });
}
