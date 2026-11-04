const baseSizes = {
  h1: "text-3xl font-bold",
  h2: "text-2xl font-semibold",
  h3: "text-xl font-semibold",
  h4: "text-lg font-medium",
};

const Heading = ({ as = "h2", children, className = "", ...props }) => {
  const Tag = as;
  return (
    <Tag className={`${baseSizes[as] || baseSizes.h2} text-gray-800 ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;