import ProductInput from '@/components/atoms/ProductInput';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { callRajaOngkirAPI } from '@/config/api';
import { addUserAddress, getUserAddressById, updateUserAddress } from '@/services/user';
import toast from 'react-hot-toast';

const token = Cookies.get('token');

const validate = (values) => {
  const errors = {};

  if (!values.address_fullname) {
    errors.address_fullname = 'Wajib diisi';
  }
  if (!values.address_province) {
    errors.address_province = 'Wajib diisi';
  }
  if (!values.address_city) {
    errors.address_city = 'Wajib diisi';
  }

  // if (!values.kyc_ktp) {
  //   errors.kyc_ktp = 'Wajib diisi';
  // } else if (values.kyc_ktp.length !== 16) {
  //   errors.kyc_ktp = 'KTP harus 16 digit';
  // }

  return errors;
};
const UserUpdateAddress = ({ data }) => {
  const [province, setProvince] = useState(data.data);
  const [provinceId, setProvinceId] = useState(null);
  const [addressById, setAddressById] = useState({});
  const [city, setCity] = useState([]);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      address_fullname: addressById.address_fullname || '',
      address_phone_number: addressById.address_phone_number || '',
      address_province: addressById.address_province || '',
      address_id_province: addressById.address_id_province || '',
      address_city: addressById.address_city || '',
      address_id_city: addressById.address_id_city || '',
      address_districts: addressById.address_districts || '',
      address_postal_code: addressById.address_postal_code || '',
      address_mark_as: addressById.address_mark_as || '',
      address_street_name: addressById.address_street_name || '',
    },
    validate,
    onSubmit: async (values) => {
      // const { data } = await addUserAddress(values);
      const submit = async () => {
        const response = await updateUserAddress(router.query.addressId, values);
        return response;
      };
      toast.promise(submit(), {
        loading: 'Mohon tunggu...',
        success: 'Update alamat berhasil !',
        error: 'Update alamat gagal !',
      });
      router.push('/profile/settings/address');
      console.log(response);
    },
  });

  useEffect(() => {
    if (provinceId !== null) {
      async function fetchData() {
        const { data } = await callRajaOngkirAPI({
          path: `/api/city/${provinceId}`,
          method: 'GET',
          token,
        });
        setCity(data.data);
        console.log(data);
      }
      fetchData();
    }
  }, [provinceId]);

  useEffect(() => {
    const getAddress = async () => {
      const { data } = await getUserAddressById(router.query.addressId);
      const set = await setAddressById(data.data);
      console.log(data.data);
      return set;
    };
    getAddress();
  }, []);

  useEffect(() => {
    if (addressById !== {}) {
      formik.setFieldValue('address_fullname', addressById.address_fullname);
      formik.setFieldValue('address_phone_number', addressById.address_phone_number);
      formik.setFieldValue('address_province', addressById.address_province);
      formik.setFieldValue('address_city', addressById.address_city);
      formik.setFieldValue('address_districts', addressById.address_districts);
      formik.setFieldValue('address_mark_as', addressById.address_mark_as);
      formik.setFieldValue('address_street_name', addressById.address_street_name);
      formik.setFieldValue('address_postal_code', addressById.address_postal_code);
    }
  }, [addressById]);

  const handleOnChange = (ev) => {
    console.log(ev.target.value);
    setProvinceId(ev.target.value);
  };
  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>Ubah Alamat</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='pt-8'>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>
              <div className=''>
                <h3 className='text-lg font-semibold leading-6 text-gray-900'>Data Diri</h3>
                <p className='mt-1 text-sm text-gray-600'>* Wajib diisi</p>
              </div>
            </div>
            <div className='col-span-3'>
              <div className='shadow-sm sm:rounded-md sm:overflow-hidden'>
                <div className='bg-white space-y-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <ProductInput
                      id='address_fullname'
                      name='address_fullname'
                      type='text'
                      label='Nama Penerima *'
                      handleChange={formik.handleChange}
                      value={formik.values.address_fullname}
                      errors={formik.errors.address_fullname}
                      required={true}
                    />
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                    <ProductInput
                      id='address_phone_number'
                      name='address_phone_number'
                      type='text'
                      label='Nomor Handphone *'
                      handleChange={formik.handleChange}
                      value={formik.values.address_phone_number}
                      errors={formik.errors.address_phone_number}
                      required={true}
                    />
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                    <ProductInput
                      id='address_mark_as'
                      name='address_mark_as'
                      type='text'
                      label='Label Alamat *'
                      placeholder={'Contoh : Rumah'}
                      handleChange={formik.handleChange}
                      value={formik.values.address_mark_as}
                      errors={formik.errors.address_mark_as}
                      required={true}
                    />
                  </div>

                  {/* <div>
                    <label htmlFor='product_description' className='block text-sm font-semibold text-gray-700'>
                      Deskripsi Produk *
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='product_description'
                        name='product_description'
                        rows={3}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                        onChange={formik.handleChange}
                        value={formik.values.product_description}
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>Beri deskripsi yang lengkap tentang produk anda.</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8 mt-8 border-t'>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>
              <div className=''>
                <h3 className='text-lg font-semibold leading-6 text-gray-900'>Alamat Lengkap</h3>
                <p className='mt-1 text-sm text-gray-600'>* Wajib diisi</p>
              </div>
            </div>
            <div className='col-span-3'>
              <div className='shadow-sm sm:rounded-md sm:overflow-hidden'>
                <div className='bg-white space-y-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <ProductInput
                      id='address_street_name'
                      name='address_street_name'
                      type='text'
                      label='Nama Jalan *'
                      handleChange={formik.handleChange}
                      value={formik.values.address_street_name}
                      errors={formik.errors.address_street_name}
                      required={true}
                    />
                  </div>

                  <div className='relative mt-2'>
                    <label className='text-sm font-semibold text-gray-700 tracking-wide'>Provinsi *</label>
                    <select
                      className='w-full text-sm duration-200 ease-in-out border border-gray-300 rounded-md'
                      name='address_province'
                      id='address_province'
                      onChange={handleOnChange}
                      defaultValue={formik.values.address_province}>
                      {province.map((item) => (
                        <option
                          key={item.province_id}
                          value={item.province_id}
                          onClick={() => {
                            formik.setFieldValue('address_province', item.province);
                            formik.setFieldValue('address_id_province', item.province_id);
                          }}>
                          {item.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  {provinceId && (
                    <div className='relative mt-2'>
                      <label className='text-sm font-semibold text-gray-700 tracking-wide'>Kota</label>
                      <select
                        className='w-full text-sm duration-200 ease-in-out border border-gray-300 rounded-md'
                        name='address_city'
                        id='address_city'
                        onChange={formik.handleChange}
                        value={formik.values.address_city}>
                        {city.map((item) => (
                          <option
                            key={item.city_id}
                            value={item.city_name}
                            onClick={() => {
                              formik.setFieldValue('address_city', item.city_name);
                              formik.setFieldValue('address_id_city', item.city_id);
                            }}>
                            {item.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className='grid grid-cols-3 gap-6'>
                    <ProductInput
                      id='address_districts'
                      name='address_districts'
                      type='text'
                      label='Kecamatan *'
                      handleChange={formik.handleChange}
                      value={formik.values.address_districts}
                      errors={formik.errors.address_districts}
                      required={true}
                    />
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                    <ProductInput
                      id='address_postal_code'
                      name='address_postal_code'
                      type='text'
                      label='Kode Pos *'
                      handleChange={formik.handleChange}
                      value={formik.values.address_postal_code}
                      errors={formik.errors.address_postal_code}
                      required={true}
                    />
                  </div>

                  {/* <div>
                    <label htmlFor='product_description' className='block text-sm font-semibold text-gray-700'>
                      Deskripsi Produk *
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='product_description'
                        name='product_description'
                        rows={3}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                        onChange={formik.handleChange}
                        value={formik.values.product_description}
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>Beri deskripsi yang lengkap tentang produk anda.</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='block mt-4 w-32 py-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default UserUpdateAddress;
