import Bar from "@/components/Bar.tsx";


const BarsList = () => {
    const getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const generateArray = (): number[] => {
        return Array.from({ length: 20 }, () => {
            return getRandomNumber(1, 70);
        });
    }


    const bars = generateArray()

    return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 list-none grid items-end w-[70%] h-4/5 mx-auto gap-1" style={{gridTemplateColumns: `repeat(${bars.length}, 1fr)`}}>
            {
                bars.map((bar: number, index: number) =>
                    <Bar key={index} bar={bar} />
                )
            }
        </div>
    );
};

export default BarsList;