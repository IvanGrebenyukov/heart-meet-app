import clsx from "clsx";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}

export const ButtonAction: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center px-4 py-2 text-white rounded-full",
        className,
      )}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  );
};
