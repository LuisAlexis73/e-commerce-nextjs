import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-4 py-6">
      <div className="flex border border-t-gray-300 container" />
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
          <span>| shop</span>
          <span> &copy;{new Date().getFullYear()}</span>
        </Link>

        {/* <Link href='/' className="underline text-blue-500 hover:text-blue-300">
        <span className="ml-2 text-sm">
          All rights reserved
        </span>
      </Link> */}
        <Link href='/terms' className="underline text-blue-500 hover:text-blue-300">
          <span className="ml-2 text-sm">
            Terms and Conditions
          </span>
        </Link>
      </div>
    </footer>
  )
}
