const variantClasses = {
  primary: "bg-orange-500 hover:bg-orange-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
  info: "bg-sky-600 hover:bg-sky-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-lg transition font-medium focus:outline-none ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;