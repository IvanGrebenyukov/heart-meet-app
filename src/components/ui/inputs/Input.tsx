import clsx from "clsx";
import type { FC, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const Input: FC<IInputProps> = ({ label, error, ...props }) => {
  return (
    <div className={"flex flex-col space-y-2"}>
      {label && (
        <label className={"font-semibold text-black text-base"}>{label}</label>
      )}
      <input
        {...props}
        className={clsx(
          "px-4 py-2 border rounded-lg focus:outline-none",
          "border-gray-300 focus:border-pink",
          error ? "border-red-500" : "",
        )}
      />
      {error && <span className={"text-red text-sm"}>{error}</span>}
    </div>
  );
};
