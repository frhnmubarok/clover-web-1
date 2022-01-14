import Cookies from 'js-cookie';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(money);
};

export const orderStatus = (status) => {
  switch (status) {
    case '1':
      return 'Pesanan Dibuat';
    case '2':
      return 'Pesanan Dikonfirmasi';
    case '3':
      return 'Pesanan Diproses';
    case '4':
      return 'Pesanan Dikirim';
    case '5':
      return 'Pesanan Selesai';
    case '6':
      return 'Pesanan Dibatalkan';
    case '7':
      return 'Pesanan Direfund';
    default:
      return 'Unknown';
  }
};

export const badgeOrderStatus = (status) => {
  switch (status) {
    case '1':
      return 'bg-yellow-500';
    case '2':
      return 'bg-green-500';
    case '3':
      return 'bg-emerald-500';
    case '4':
      return 'bg-sky-500';
    case '5':
      return 'bg-cyan-500';
    case '6':
      return 'bg-red-500';
    case '7':
      return 'bg-teal-500';
    default:
      return 'Unknown';
  }
};
