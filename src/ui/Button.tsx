import { FC } from 'react';
import colors from "@/data/colors.ts";

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: never) => void;
  disabled?: boolean;
  color?: string;
}

const Button: FC<ButtonProps> = ({ text, type = 'button', onClick, disabled = false, color = colors.primaryPurple }) => {
  return (
    <button
        className={`px-4 py-2 rounded-2xl sm-text border-none shadow-md ${
            !disabled
                ? "hover:opacity-80 hover:shadow-lg transition duration-300 cursor-pointer"
                : "cursor-not-allowed"
        }`}
        style={{
          background: !disabled ? color : colors.disabledButton,
        }}
        type={type}
        onClick={onClick}
        disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
