import ButtonsContainer from "@/components/ButtonsContainer.tsx";
import SortingButtons from "@/components/SortingButtons.tsx";
import ControlButtons from "@/components/ControlButtons.tsx";

const Navigation = () => {
    return (
        <nav className="flex flex-col gap-2 items-center justify-center">
            <ButtonsContainer>
                <SortingButtons />
            </ButtonsContainer>
            <ButtonsContainer>
                <ControlButtons />
            </ButtonsContainer>
        </nav>
    );
};

export default Navigation;