import { FC } from 'react';

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
            className={`px-4 py-2 rounded text-lg shadow-md w-full ${
                !disabled
                    ? `transition duration-300 cursor-pointer ${selected ? "shadow-glow bg-primaryPurple" : "bg-secondaryPurple opacity-80 hover:opacity-100 hover:shadow-lg"}`
                    : `cursor-not-allowed ${selected ? "bg-resumeButtonColor" : "bg-disabledButton"}`
            }`}
            style={{
                boxShadow: selected ? '' : 'rgb(26 9 25) 0px 0px 4px inset'
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
