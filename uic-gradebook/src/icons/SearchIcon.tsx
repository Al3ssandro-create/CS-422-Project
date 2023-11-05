import React from "react";

interface IconProps {
  size?: number;
  height?: number;
  width?: number;
}

export const SearchIcon: React.FC<IconProps> = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      {...props}
    >
      <path
        clipRule="evenodd"
        fill="currentColor"
        fillRule="evenodd"
        d="M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z"
      />
    </svg>
  );
};
