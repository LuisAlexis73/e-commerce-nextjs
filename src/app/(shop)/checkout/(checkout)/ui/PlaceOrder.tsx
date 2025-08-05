'use client';
import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormatter } from "@/utils/currency-formatter";
import clsx from "clsx";
import Link from "next/link"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {

  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { getTotalSummaryInformation } = useCartStore()
  const { subTotal, tax, total, itemsInCart } = getTotalSummaryInformation()
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const response = await placeOrder(productsToOrder, address);
    console.log({ response });

    setIsPlacingOrder(false);
  }

  if (!loaded) {
    return <div className="w-full h-96 flex justify-center items-center">Loading...</div>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

      <h2 className="text-2xl mb-2 font-bold">Shipping address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Resume</h2>

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

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <p className="mb-5">
          <span className="text-xs">
            By placing this order, you agree to our <Link href='/terms' className="underline">Terms and Conditions</Link> and <Link href='/privacy' className="underline">Privacy Policy</Link>. You also confirm that you have read our <Link href='/shipping' className="underline">Shipping Policy</Link>.
          </span>
        </p>

        {/* <p className="text-red-500">
          Error placing order. Please try again later.
        </p> */}

        <button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={
            clsx(
              {
                'btn-primary cursor-pointer': !isPlacingOrder,
                'btn-disabled': isPlacingOrder,
              }
            )
          }
        >
          Place Order
        </button>
      </div>
    </div>
  )
}
