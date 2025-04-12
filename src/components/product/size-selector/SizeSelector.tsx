import type { Size } from "@/interfaces/product.interface"
import clsx from "clsx";


interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSelectSize?: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSelectSize }: Props) => {
  return (
    <div className="my-5">
      <h3>Sizes availables</h3>

      <div className="flex">
        {availableSizes.map(size => (
          <button
            onClick={() => onSelectSize?.(size)}
            key={size}
            className={
              clsx(
                'hover:underline mx-2 cursor-pointer',
                {
                  'underline': size === selectedSize
                }
              )
            }
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
