/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import { HiOutlineKey, HiOutlineSearch, HiCheck } from 'react-icons/hi';

import { deleteUserAddress, getUserAddress } from '@/services/user';
import { classNames } from '@/utils/helpers';
import { updatePrimaryAddress } from '@/services/user';
import toast from 'react-hot-toast';
import DeleteAddressModal from '@/components/atoms/DeleteAddressModal';

const UserAddress = ({ data }) => {
  const [address, setAddress] = useState(data.data);
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    console.log(address);
  }, []);

  const handleUpdatePrimaryAddress = async (addressId) => {
    const response = await updatePrimaryAddress({
      id: addressId,
    });
    const newAddress = await getUserAddress();
    setAddress(newAddress.data.data);
    return response;
  };

  const handleDeleteAddress = async (addressId) => {
    const response = await deleteUserAddress(addressId);
    const newAddress = await getUserAddress();
    setAddress(newAddress.data.data);
    return response;
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>Daftar Alamat</h3>
      </div>
      <div className='pt-6 relative mx-auto text-gray-600 flex justify-between items-center'>
        <input
          className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-72'
          type='search'
          name='search'
          placeholder='Cari alamat'
        />
        <Link href={'/profile/settings/new-address'}>
          <a className='flex justify-center items-center w-48 py-2 text-xs font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
            Tambah Alamat Baru
          </a>
        </Link>
      </div>
      {address.length < 1 ? (
        <div className='flex justify-center items-center'>
          <h1 className='py-14 font-semibold text-gray-500 text-2xl'>Belum ada alamat yang terdaftar</h1>
        </div>
      ) : (
        <>
          {address
            .sort((a, b) => b.address_primary - a.address_primary)
            .map((item, index) => (
              <div
                className={classNames(
                  item.address_primary ? 'border-primary-400 bg-yellow-50' : 'border-gray-200 bg-white',
                  'p-6 rounded-lg shadow-sm mt-4 border',
                )}
                key={index}>
                <div className='flex justify-between items-center'>
                  <div className='w-96'>
                    <p className=''>
                      {item.address_mark_as}{' '}
                      {item.address_primary && (
                        <span className='text-[10px] rounded-md bg-gray-300 text-gray-600 p-1 font-semibold ml-2'>
                          Utama
                        </span>
                      )}
                    </p>
                    <p className='pt-1'>{item.address_fullname}</p>
                    <p className='pt-1'>{item.address_phone_number}</p>
                    <p className='text-sm pt-1'>{`${item.address_street_name}, ${item.address_province}, ${item.address_city}, Kec. ${item.address_districts}, ${item.address_postal_code}`}</p>
                  </div>
                  <div>
                    {item.address_primary ? (
                      <HiCheck className='w-6 h-6 text-primary-500' />
                    ) : (
                      <div>
                        <button
                          onClick={async () => {
                            toast.promise(handleUpdatePrimaryAddress(item.id), {
                              loading: 'Mohon tunggu...',
                              success: 'Berhasil update alamat utama !',
                              error: 'Gagal update alamat utama !',
                            });

                            // setAddress(address.map((item) => (item.address_primary = false)));
                          }}
                          className='block w-28 py-2 text-xs font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                          Pilih
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {item.address_primary ? (
                  <Link href={`/profile/settings/update-address/${item.id}`}>
                    <button className='text-primary-500 text-xs font-semibold mt-6'>Ubah Alamat</button>
                  </Link>
                ) : (
                  <>
                    <button className={`text-primary-500 text-xs mt-6 font-semibold`}>Ubah Alamat</button>
                    <span className='text-gray-400'> | </span>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setAddressId(item.id);
                      }}
                      className={`text-primary-500 text-xs mt-6 font-semibold`}>
                      Hapus
                    </button>
                  </>
                )}
              </div>
            ))}
        </>
      )}
      <DeleteAddressModal
        setOpen={setOpen}
        open={open}
        cancelButtonRef={cancelButtonRef}
        handleDelete={handleDeleteAddress}
        addressId={addressId}
      />
    </>
  );
};

export default UserAddress;
