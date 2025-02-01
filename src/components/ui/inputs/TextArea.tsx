import clsx from "clsx";
import type { FC, InputHTMLAttributes } from "react";

interface ITextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label: string;
  register?: any;
}

export const TextArea: FC<ITextAreaProps> = ({
  children,
  error,
  register,
  label,
  ...props
}) => {
  return (
    <div className={"flex flex-col space-y-2"}>
      {label && (
        <label className={"font-semibold text-black text-base "}>{label}</label>
      )}
      <textarea
        rows={5}
        {...register}
        {...props}
        className={clsx(
          "px-4 py-2 border rounded-lg  focus:outline-none",
          "border-gray-300 focus:border-pink",
          error ? "border-red-500" : "",
        )}
      />
      {error && <span className={"text-red text-sm"}>{error}</span>}
    </div>
  );
};
