import {FC} from "react";

const Bar: FC<{ bar: number }> = ({ bar }) => {
  return (
      <div style={{height: `${bar}%`}}>
          <div className="h-full bg-[#00A8CC] rounded-t-xl"  />
      </div>
  );
};

export default Bar;