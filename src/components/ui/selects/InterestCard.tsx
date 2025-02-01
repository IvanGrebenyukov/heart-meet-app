import clsx from "clsx";
import type { FC } from "react";

interface IInterestCardProps {
  label: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const InterestCard: FC<IInterestCardProps> = ({
  label,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-center cursor-pointer",
        "w-24 h-24 rounded-full border-2",
        isSelected ? "border-pink" : "bg-gray-100 border-gray-300",
      )}
    >
      <img src={icon} alt={label} className={"w-10 h-10"} />
      <span className={"text-xs font-medium mt-1 text-black"}>{label}</span>
    </div>
  );
};
