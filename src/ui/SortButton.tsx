import { FC } from 'react';
import colors from "@/data/colors.ts";

interface SortButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: never) => void;
    disabled?: boolean;
    selected?: boolean;
}

const SortButton: FC<SortButtonProps> = ({ text, type = 'button', onClick, disabled = false, selected = false }) => {
    return (
        <button
            className={`px-4 py-2 rounded text-lg shadow-md ${
                !disabled
                    ? `transition duration-300 cursor-pointer ${selected ? "border border-[#b3a3a3] shadow-glow" : "opacity-80 hover:opacity-100 hover:shadow-lg"}`
                    : "cursor-not-allowed"
            }`}
            style={{
                background: !disabled ? (selected ? colors.buttonColor : colors.unselectedButtonColor) : (selected ? colors.resumeButtonColor : colors.disabledButton),
                color: !disabled ? (selected ? colors.textColor : colors.unselectedTextColor) : colors.disabledText,
                boxShadow: selected ? '0 0 2px rgba(255, 255, 255, 1)' : 'rgb(26 9 25) 0px 0px 4px inset'
            }}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default SortButton;
