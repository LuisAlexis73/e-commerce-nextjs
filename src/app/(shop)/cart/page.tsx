import { Title } from "@/components/title/Title";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {

  // redirect('/empty')

  return (
    <div className="flex justify-center items-center mb-10 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" className="text-center mb-10" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <span className="text-xl">Add more items</span>
            <Link href='/' className="underline text-blue-500 hover:text-blue-700 mb-5">
              Go to shop
            </Link>

            <ProductsInCart />
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 mt-4 h-[350px]">
            <h2 className="text-2xl mb-2">Order Resume</h2>

            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link href='/checkout/address' className="flex btn-primary justify-center">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}