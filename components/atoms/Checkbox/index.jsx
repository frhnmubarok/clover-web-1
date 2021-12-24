const Checkbox = ({ id, name, type, label, handleChange, value, placeholder, errors }) => {
  return (
    <div classNameName='space-y-2 mt-2'>
      <label className='inline-flex items-center mt-3'>
        <input
          id={id}
          name={name}
          type="checkbox"
          onChange={handleChange}
          value={value}
          className='form-checkbox h-5 w-5 text-gray-600'
        />
        <span className='ml-2 text-gray-700'>{label}</span>
      </label>
      {errors ? <p classNameName='text-sm text-red-400'>{errors}</p> : null}
    </div>
  );
};

export default Checkbox;
