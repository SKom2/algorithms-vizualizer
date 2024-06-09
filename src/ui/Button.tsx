import { FC } from 'react';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: never) => void;
}

const Button: FC<ButtonProps> = ({ text, type = 'button', onClick }) => {
  return (
    <button className="bg-amber-300 p-2 rounded" type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
