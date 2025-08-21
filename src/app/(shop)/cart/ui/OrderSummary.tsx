'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormatter } from "@/utils/currency-formatter";
import { useEffect, useState } from "react"

export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);
  const { getTotalSummaryInformation } = useCartStore()
  const { subTotal, tax, total, itemsInCart } = getTotalSummaryInformation()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <div className="grid grid-cols-2">
        <Skeleton className="w-52 h-6 mb-5" />
        <Skeleton className="text-right w-52 h-6 mb-5" />

        <Skeleton className="w-52 h-6 mb-5" />
        <Skeleton className="text-right w-52 h-6 mb-5" />

        <Skeleton className="w-52 h-6 mb-5" />
        <Skeleton className="text-right w-52 h-6 mb-6" />

        <Skeleton className="w-52 h-6 mb-5" />
        <Skeleton className="text-right w-52 h-6 mb-6" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2">
      <span>Quantity</span>
      <span className="text-right">{itemsInCart === 1 ? '1 Item' : `${itemsInCart} Items`}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormatter(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormatter(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-right text-xl">{currencyFormatter(total)}</span>
    </div>
  )
}
