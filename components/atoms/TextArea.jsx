const TextArea = ({ id, name, type, label, handleChange, value, placeholder, errors }) => {
  return (
    <div className='space-y-2 mt-2'>
      <label className='text-sm font-medium text-gray-700 tracking-wide'>{label}</label>
      <textarea
        className='w-full text-base px-4 py-4 border bg-cool-gray-200 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 shadow-md'
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
