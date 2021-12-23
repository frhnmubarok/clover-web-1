const ProductInput = ({ id, name, type, label, handleChange, value, placeholder, errors, prefix, suffix }) => {
  return (
    <div className='col-span-3 sm:col-span-3'>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1 flex rounded-md shadow-sm'>
        {prefix && (
          <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          value={value}
          className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full ${
            prefix ? 'rounded-none rounded-r-md' : 'rounded-md'
          } ${suffix ? 'rounded-none rounded-l-md' : 'rounded-md'} sm:text-sm border-gray-300`}
        />
        {suffix && (
          <span className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
            {suffix}
          </span>
        )}
        {/* {errors ? <p className="text-sm text-red-400">{errors}</p> : null} */}
      </div>
    </div>
  );
};

export default ProductInput;
