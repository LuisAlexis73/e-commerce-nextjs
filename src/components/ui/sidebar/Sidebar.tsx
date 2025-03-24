'use client'
import { IoCloseOutline, IoSearchCircleOutline } from "react-icons/io5"

export const Sidebar = () => {
  return (
    <div >
      {/* Bacground Black */}
      <div className="bg-black opacity-30 fixed top-0 left-0 w-screen h-screen z-10">

      </div>

      {/* Blur */}
      <div className="fade-in top-0 left-0 fixed w-screen h-screen z-10 backdrop-filter backdrop-blur-xs" />

      {/* Sidebar */}
      <nav className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-gray-200 z-20 shadow-2xl transform transition-all duration-300">
        <IoCloseOutline size={40} className="absolute top-5 cursor-pointer" onClick={() => console.log('click')
        } />

        <div className="mt-14 relative flex items-center">
          <IoSearchCircleOutline size={30} className="left-2 absolute" />
          <input type="text" className="w-full bg-gray-100 rounded pl-10 pr-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-400" placeholder="Search" />
        </div>
      </nav>
    </div>
  )
}
