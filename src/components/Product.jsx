"use client"
import Image from "next/image"
import { useState, useRef } from "react";

const Product = (props) => {
 
  const imgsrc = "/coke.jpeg"

  const unit_price  = 2;
  const name = "coke";
  const seller = "user#1"
  const maxAmount = 10;
  const [amount, setAmount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  const addItem = () => {
    if (amount + 1 <= 10) {
      setAmount(amount + 1);
    }
  }

  const removeItem = () => {
    if (amount - 1 >= 0) {
      setAmount(amount - 1);
    }
  }

  return (
    <div className="product w-[200px] relative">
      <Image src={imgsrc} width={200} height={200} alt="coke" onClick={() => setShowPanel(true)}/>
      <p></p>
      <div className="flex flex-row justify-center items-center gap-[2%] mt-[1vh]">
          <button className="bg-neutral-400 px-[clamp(2px,1vw,2vw)] py-[1px]" onClick={addItem}> ＋ </button>
          <span>{amount}</span>
          <button className="bg-neutral-400 px-[clamp(2px,1vw,2vw)] py-[1px]" onClick={removeItem}> － </button>
      </div>
      {showPanel && <div className="w-full h-[200px] absolute top-0 left-0 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.8)] text-white z-20">
        <p>product name: {name}</p>
        <p>seller: {seller}</p>
        <p>price: {unit_price}</p>
        <p>stock: {maxAmount}</p>
        <button className="w-max h-max py-[1px] px-[2px] bg-red-500 text-white rounded-md absolute right-0 bottom-0"
                onClick={() => setShowPanel(false)}>
            close
        </button>
      </div>}
    </div>
  )
}

export default Product