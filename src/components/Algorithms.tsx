'use client';

import BarsList from "@/components/BarsList.tsx";
import Button from "@/ui/Button.tsx";

const Algorithms = () => {
  return (
      <section className="relative bg-[#21243D] w-full h-full pt-4">
          <div className="flex gap-2 items-center justify-center">
              <Button text="Bubble" />
              <Button text="Random" />
          </div>
          <BarsList />
      </section>
  );
};

export default Algorithms;