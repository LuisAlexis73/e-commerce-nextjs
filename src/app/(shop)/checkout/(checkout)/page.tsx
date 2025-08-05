import { Title } from "@/components/title/Title";
import Link from "next/link";
import { ProductsInCartCheckout } from "./ui/ProductsInCartCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout Order" subtitle="" className="text-center mb-10" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Edit cart</span>
            <Link href='/cart' className="underline text-blue-500 hover:text-blue-700 mb-5">
              Edit cart
            </Link>

            {/* Items */}
            <ProductsInCartCheckout />
          </div>

          {/* Checkout resume order */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}