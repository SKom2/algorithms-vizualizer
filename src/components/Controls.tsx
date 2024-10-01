import ControlButtons from "@/components/ControlButtons.tsx";
import Settings from "@/components/Settings.tsx";

const Controls = () => {
    return (
        <div className="bg-secondaryScreenColor mt-5 rounded-3xl">
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <h2 className="secondary-title">Settings</h2>
                    <ControlButtons/>
                </div>
                <Settings/>
            </div>
        </div>
    );
};

export default Controls;