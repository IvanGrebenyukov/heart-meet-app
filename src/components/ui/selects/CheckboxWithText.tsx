import clsx from "clsx";
import type { FC } from "react";

interface ICheckboxWithTextProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  link?: { text; string; url: string };
  error?: string;
}

export const CheckboxWithText: FC<ICheckboxWithTextProps> = ({
  checked,
  onChange,
  label,
  link,
  error,
}) => {
  return (
    <div className={"flex items-start space-x-2"}>
      <input
        type={"checkbox"}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={clsx(
          "w-5 h-5 border rounded focus:outline-none",
          error ? "border-red" : "border-gray-300",
        )}
      />
      <span className={"text-black text-sm"}>
        {label}{" "}
        {link && (
          <a
            href={link.url}
            target={"_blank"}
            rel={"noopener noreferrer"}
            className={"text-pink underline"}
          >
            {link.text}
          </a>
        )}
      </span>
      {error && <span className={"text-red text-sm mt-1"}>{error}</span>}
    </div>
  );
};
