
const baseSizes = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
};

const Heading = ({
  as = "h1",
  children,
  className = "",
  align = "center",
  color = "text-orange-600",
  spacing = "mb-6",
  ...props
}) => {
  const Tag = as;
  const baseClass = baseSizes[as] || baseSizes.h1;

  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align] || "text-center";

  return (
    <Tag
      className={`${baseClass} ${alignment} ${color} ${spacing} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;