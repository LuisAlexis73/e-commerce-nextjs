'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {

  const [count, setCount] = useState(quantity)

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;

    setCount(count + value);
  }

  return (
    <div className="flex items-center">
      <button className="cursor-pointer" onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline className="text-2xl" />
      </button>

      <span className="mx-3 w-20 px-5 bg-gray-200 text-center rounded">{count}</span>

      <button className="cursor-pointer" onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline className="text-2xl" />
      </button>
    </div>
  )
}
