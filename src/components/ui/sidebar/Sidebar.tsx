'use client'
import { useUIStore } from "@/store/ui/ui-store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchCircleOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUIStore(state => state.closeSideMenu);

  return (
    <div >
      {/* Bacground Black */}
      {
        isSideMenuOpen && (
          <div className="bg-black opacity-30 fixed top-0 left-0 w-screen h-screen z-10" />
        )
      }

      {/* Blur */}
      {
        isSideMenuOpen && (
          <div className="fade-in top-0 left-0 fixed w-screen h-screen z-10 backdrop-filter backdrop-blur-xs" onClick={closeSideMenu} />
        )
      }

      {/* Sidebar */}
      <nav className={
        clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-gray-200 z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
            "translate-x-0": isSideMenuOpen
          }
        )
      }>
        <IoCloseOutline size={40} className="absolute top-5 right-5 cursor-pointer hover:bg-gray-100 hover:rounded-4xl" onClick={() => closeSideMenu()
        } />

        <div className="mt-14 relative flex items-center">
          <IoSearchCircleOutline size={30} className="left-2 absolute" />
          <input type="text" className="w-full bg-gray-100 rounded pl-10 pr-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-400" placeholder="Search" />
        </div>

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Profile</span>
        </Link>

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Login</span>
        </Link>

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Logout</span>
        </Link>

        <div className="w-full h-px bg-gray-300 my-10" />

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Products</span>
        </Link>

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all">
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Users</span>
        </Link>
      </nav>
    </div>
  )
}
