import { Title } from "@/components/title/Title";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
]

interface Props {
  params: {
    id: string
  }
}

export default function Orders({ params }: Props) {
  const { id } = params

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} subtitle="order number" className="text-center mb-10" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div className={clsx(
              'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
              {
                'bg-red-500': true,
                'bg-green-600': false,
              }
            )}>
              <IoCartOutline size={30} />
              <span className="mx-2">payment pending</span>
              <span className="mx-2">paid</span>
            </div>

            {
              productsInCart.map(product => (
                <div className="flex mb-3" key={product.slug}>
                  <Image src={`/products/${product.images[0]}`} alt={`${product.title}`} width={100} height={100} className="mr-5 rounded" style={{ width: '100px', height: '100px' }} />

                  <div className="mb-10">
                    <p>{product.title}</p>
                    <p>{product.price} x 3</p>
                    <p className="font-bold">Subtotal: ${product.price * 3}</p>

                    <button className="underline mt-3">Remove</button>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2 font-bold">Shipping address</h2>
            <div className="mb-10">
              <p className="text-2xl">Alexis Galarza</p>
              <p>Fake street 123</p>
              <p>Col. Centro</p>
              <p>CP: 321321</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Resume</h2>

            <div className="grid grid-cols-2">
              <span>N° Products</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">
                  By placing this order, you agree to our <Link href='/terms' className="underline">Terms and Conditions</Link> and <Link href='/privacy' className="underline">Privacy Policy</Link>. You also confirm that you have read our <Link href='/shipping' className="underline">Shipping Policy</Link>.
                </span>
              </p>

              <div className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': true,
                  'bg-green-600': false,
                }
              )}>
                <IoCartOutline size={30} />
                <span className="mx-2">payment pending</span>
                <span className="mx-2">paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}