import { FC, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

interface SliderProps {
    title: string;
    min: number;
    max: number;
    step: number;
    value: number;
    displayedValue: string | number;
    onChange: (event: any) => void;
    disabled?: boolean;
}

const Slider: FC<SliderProps> = ({ title, min, max, step, value, displayedValue, onChange, disabled = false }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const { width: sliderWidth = 0 } = useResizeObserver({ ref: sliderRef });
    const { width: divWidth = 0 } = useResizeObserver({ ref: divRef });

    const calculateLeft = () => {
        const range = max - min;
        const position = ((value - min) / range) * (sliderWidth - divWidth);
        return `${position}px`;
    };

    const calculateProgressWidth = () => {
        const range = max - min;
        const position = ((value - min) / range) * sliderWidth;
        return `${position}px`;
    };

    return (
        <div className="w-1/2">
            <span className="sm-text text-secondaryTextColor">{title}</span>
            <div className="slider-container" ref={sliderRef}>
                <input
                    className="custom-range"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div ref={divRef} className="slider-value" style={{ left: calculateLeft() }}>
                    {displayedValue}
                </div>
                <div className="progress-bar" style={{ width: calculateProgressWidth() }} />
            </div>
        </div>
    );
};

export default Slider;
