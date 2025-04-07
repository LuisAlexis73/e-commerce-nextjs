import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
export default function EmptyPage() {
  return (
    <div className="flex items-center justify-center h-[800px]">
      <IoCartOutline size={90} className='mx-5' />

      <div className='flex flex-col items-center'>
        <h1 className="text-center font-bold text-2xl">
          Your cart is empty
        </h1>
        <span className="text-gray-500">Looks like you haven´t added anything to your cart yet.</span>
        <Link href="/" className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Go to shop
        </Link>
      </div>
    </div>
  )
}