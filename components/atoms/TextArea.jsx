const TextArea = ({ id, name, type, label, handleChange, value, placeholder, errors }) => {
  return (
    <div className='space-y-2 mt-2'>
      <label className='text-sm font-medium text-gray-700 tracking-wide'>{label}</label>
      <textarea
        className='w-full px-4 py-3 text-base duration-200 ease-in-out border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
        rows={3}
        id={id}
        name={name}
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
      {errors ? <p className='text-sm text-red-400'>{errors}</p> : null}
    </div>
  );
};

export default TextArea;
