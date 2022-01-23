import { HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';

import AppLayout from '@/components/templates/AppLayout';

import { formatRupiah } from '@/utils/helpers';

const Checkout = () => {
  return (
    <div className='container relative pt-24'>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-span-8'>
          <div className='min-h-screen py-5 space-y-4'>
            <h1 className='text-2xl font-semibold'>Checkout</h1>
            <div>
              <h3 className='text-lg font-semibold'>Alamat</h3>
              <div className='flex flex-col py-3 my-2 space-y-2 border-gray-200 border-y'>
                <h1 className='text-sm'>
                  <span className='font-semibold'>Fahmi Idris </span>
                  <span>(Alamat Rumah)</span>
                  <span className='px-2 py-px ml-2 text-xs rounded bg-emerald-200 text-emerald-700'>Utama</span>
                </h1>
                <div className='text-sm'>6289589589500</div>
                <p className='max-w-md text-sm'>
                  Kp. Pasir angin Rt. 05/04 Ds. Pasir Mukti Kec. Citeureup Kab. Bogor Citeureup, Kab. Bogor, 16810
                </p>
              </div>
              <div className='pb-2 mb-2 border-b border-gray-200'>
                <button
                  type='button'
                  className='px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg focus:bg-gray-200'>
                  Pilih Alamat Lain
                </button>
              </div>
              <div className='pt-5'>
                <h2 className='text-xl font-semibold'>Fahmi Idris Store</h2>
                <p className='text-xs'>
                  Dari <span className='font-semibold'>Kabupaten Bogor - Jawa Barat</span>
                </p>
              </div>
              <div className='pt-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center basis-2/3'>
                    <div className='relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                      <Image
                        src={'/images/products/kol.png'}
                        alt={'Photo'}
                        layout='fill'
                        className='object-cover object-center w-full h-full'
                      />
                    </div>

                    <div className='flex flex-col flex-1 ml-4'>
                      <div>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <h3>Sajadah Ridwan Kamil</h3>
                        </div>
                        <p className='py-2 text-xs'>Jumlah 1 Buah</p>
                        <p className='text-sm font-semibold'>{formatRupiah(10000)}</p>
                      </div>
                    </div>
                  </div>
                  <div className='basis-1/3'>
                    <div className='mb-1 text-sm font-semibold'>Pilih Durasi</div>
                    <button
                      type='button'
                      className='flex items-center justify-between w-full px-4 py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                      <span>Pengiriman</span>
                      <HiChevronRight className='w-5 h-5' />
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between px-4 py-2 mt-3 font-semibold bg-gray-200 rounded-lg'>
                  <div>Subtotal</div>
                  <div>Rp. 15.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full col-span-4'>
          <div className='sticky top-[120px]'>
            <div className='pb-12'>
              <div className='flex items-center justify-between'>
                <div className='w-full p-6 bg-gray-100 rounded-lg'>
                  <button className='flex items-center justify-between w-full px-4 py-3 font-semibold bg-white border border-gray-200 rounded-lg'>
                    <span>Makin hemat pakai promo</span>
                    <HiChevronRight className='w-5 h-5' />
                  </button>
                  <div className='pt-4'>
                    <h3 className='text-sm font-semibold'>Ringkasan Belanja</h3>
                    <ul className='flex flex-col py-3 space-y-1'>
                      <li className='flex items-center justify-between text-sm'>
                        <span>Total Harga (1 Produk)</span>
                        <span>Rp. 15.000</span>
                      </li>
                      <li className='flex items-center justify-between text-sm'>
                        <span>Total Ongkos Kirim</span>
                        <span>Rp. 10.000</span>
                      </li>
                      <li className='flex items-center justify-between text-sm'>
                        <span>Total Biaya Penanganan</span>
                        <span>Rp. 1.000</span>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div className='pt-2'>
                    <div className='flex items-center justify-between text-lg font-semibold'>
                      <span>Total Tagihan</span>
                      <span className='text-primary-500'>Rp. 26.000</span>
                    </div>
                    <p className='py-3 text-xs font-light'>
                      Dengan mengaktifkan asuransi, Saya menyetujui{' '}
                      <span className='text-green-500'>syarat dan ketentuan yang berlaku</span>.
                    </p>
                    <button className='flex items-center justify-center w-full px-4 py-3 space-x-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                      Pilih Pembayaran
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Checkout',
  },
};

export default Checkout;
