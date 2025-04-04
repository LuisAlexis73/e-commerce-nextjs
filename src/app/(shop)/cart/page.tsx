import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { Title } from "@/components/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
]

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" subtitle="" className="text-center mb-10" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href='/' className="underline text-blue-500 hover:text-blue-700 mb-5">
              Go to shop
            </Link>

            {
              productsInCart.map(product => (
                <div className="flex mb-3" key={product.slug}>
                  <Image src={`/products/${product.images[0]}`} alt={`${product.title}`} width={100} height={100} className="mr-5 rounded" style={{ width: '100px', height: '100px' }} />

                  <div>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <QuantitySelector quantity={3} />

                    <button className="underline mt-3">Remove</button>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Order Resume</h2>

            <div className="grid grid-cols-2">
              <span>N° Products</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href='/checkout/address' className="flex btn-primary justify-center">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}