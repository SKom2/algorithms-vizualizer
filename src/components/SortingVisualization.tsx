'use client';

import BarsList from "@/components/BarsList.tsx";
import Controls from "@/components/Controls.tsx";
import Stats from "@/components/Stats.tsx";  // Corrected import path

const SortingVisualization = () => {
    return (
        <main className="bg-bgColor min-h-screen">
            <div className="py-5 px-16">
                <section className="rounded-3xl bg-primaryScreenColor">
                    <div className="p-5">
                        <div className="flex justify-between items-center">
                            <h1 className="secondary-title">Bubble Sort</h1>
                            <Stats />
                        </div>
                        <BarsList />
                        <Controls />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SortingVisualization;
