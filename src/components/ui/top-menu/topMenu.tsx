'use client'
import { titleFont } from "@/config/fonts"
import { useCartStore } from "@/store/cart/cart-store"
import { useUIStore } from "@/store/ui/ui-store"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline, IoLogInOutline } from "react-icons/io5"

export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu);

  const totalItemsInCart = useCartStore(state => state.getTotalItems());

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return null;

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span>| Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">
          Men
        </Link>

        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">
          Women
        </Link>

        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">
          Kids
        </Link>
      </div>

      <div className="flex items-center">

        <Link href={
          (totalItemsInCart === 0) ? '/empty' : '/cart'
        } className="mx-2">
          <div className="relative">
            {
              (totalItemsInCart > 0) && (
                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  {totalItemsInCart}
                </span>
              )
            }

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        {
          isAuthenticated ? (
            <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer" onClick={() => openSideMenu()}>
              Menú
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
            >
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Login</span>
            </Link>
          )
        }
      </div>
    </nav>
  )
}
