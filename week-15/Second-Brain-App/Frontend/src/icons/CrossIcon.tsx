interface CrossIconProps {
  size?: "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function CrossIcon(props: CrossIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className={sizeVariants[props.size || "md"]}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}