'use client'
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
    return <p className="text-center">Loading...</p>
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
