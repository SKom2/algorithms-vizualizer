import Logo from "@/assets/icons/Logo.tsx";

const Header = () => {
    return (
        <header>
            <div className="py-6 pl-6 bg-primaryScreenColor">
                <div className="flex gap-2 items-center justify-start select-none">
                    <Logo />
                    <p className="secondary-title">AlgoVisualizer</p>
                </div>
            </div>
        </header>
    );
};

export default Header;