const Input = ({
  type = "text",
  name,
  value,
  onChange,
  readOnly = false,
  required = false,
  placeholder = "",
  className = "",
}) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder}
      className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300 ${className}`}
    />
  );
};

export default Input;