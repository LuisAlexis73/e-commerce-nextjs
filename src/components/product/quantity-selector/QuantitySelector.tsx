'use client'
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number

  onSelectedQuantity: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onSelectedQuantity }: Props) => {


  const onQuantityChanged = (value: number) => {
    if (quantity + value < 1) return;

    if (onSelectedQuantity) {
      onSelectedQuantity(quantity + value);
    }
  }

  return (
    <div className="flex items-center">
      <button className="cursor-pointer" onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline className="text-2xl" />
      </button>

      <span className="mx-3 w-20 px-5 bg-gray-200 text-center rounded">{quantity}</span>

      <button className="cursor-pointer" onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline className="text-2xl" />
      </button>
    </div>
  )
}
