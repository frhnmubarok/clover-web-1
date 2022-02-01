import Image from 'next/image';
import { HiChatAlt } from 'react-icons/hi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-primary-500 text-white'>
      <div className='container py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className=''>
            <h1 className='text-lg font-semibold'>Eksplore</h1>
            <ul className='pt-2 space-y-2'>
              <li>Tentang Clover</li>
              <li>Karir di Clover</li>
              <li>Clover Blog</li>
            </ul>
          </div>
          <div>
            <h1 className='text-lg font-semibold'>Links</h1>
            <ul className='pt-2 space-y-2'>
              <li>Produk - Produk</li>
              <li>Kategori Produk</li>
              <li>Masuk</li>
              <li>Daftar</li>
              <li>Promosi Produk</li>
            </ul>
          </div>
          <div>
            <h1 className='text-lg font-semibold'>Sosial Media</h1>
            <ul className='pt-2 space-y-2'>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Youtube</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div>
            <h1 className='text-lg font-semibold'>Butuh Bantuan</h1>
            <div className='pt-2 space-y-2'>
              <button
                type='button'
                className='inline-flex justify-center items-center space-x-2 w-full bg-white text-gray-700 text-lg font-semibold px-5 py-3 rounded-xl'>
                <HiChatAlt className='w-6 h-6 text-primary-500' />
                <span>Kontak Admin Clover</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-white'>
        <div className='container py-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-sm md:text-lg pb-5 md:pb-0'>© {year} Copyright PT Clover</div>
            <div className='flex justify-center items-center space-x-4'>
              <div className='flex flex-col justify-center items-end'>
                <span>Syarat dan Ketentuan</span>
                <span>Kebijakan Privasi</span>
              </div>
              <div className='flex justify-center items-center space-x-4'>
                <div className='flex justify-center items-center'>
                  <Image src='/AppStore.svg' width={100} height={50} alt='AppStore' />
                </div>
                <div className='flex justify-center items-center'>
                  <Image src='/GooglePlay.svg' width={100} height={50} alt='GooglePlay' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
