import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <Link href='/'>
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
        <span>| shop</span>
        <span> &copy;{new Date().getFullYear()}</span>
      </Link>

      <Link href='/' className="underline text-blue-500 hover:text-blue-300">
        <span className="ml-2 text-sm">
          All rights reserved
        </span>
      </Link>
      <Link href='/' className="underline text-blue-500 hover:text-blue-300">
        <span className="ml-2 text-sm">
          Terms and Conditions
        </span>
      </Link>
    </div>
  )
}
