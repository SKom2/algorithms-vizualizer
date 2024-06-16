import {FC, PropsWithChildren} from "react";

const ButtonsContainer: FC<PropsWithChildren<object>> = ({ children }) => {
    return (
        <div className="flex gap-2 items-center justify-center">
            {children}
        </div>
    );
};

export default ButtonsContainer;