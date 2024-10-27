import { useState } from "react";

export default function QuantitySelector() {
  const [num, setNum] = useState(0)

  const handleCount = function (change: number) {
    const newValue = num + change;

    if (newValue >= 0 && newValue <= 100) {
      setNum(newValue);
    }
  }


  return (
    <div className='flex items-center px-2 w-24 rounded-[6px] justify-between bg-light'>
      <div className='flex text-[24px] cursor-pointer text-primary' onClick={() => handleCount(-1)}>
        -
      </div>
      <p>{num}</p>
      <div className='flex text-[24px] cursor-pointer text-primary' onClick={() => handleCount(+1)}>
        +
      </div>
    </div>
  );
}