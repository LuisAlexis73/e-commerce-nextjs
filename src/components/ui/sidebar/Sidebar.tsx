"use client";
import { logout } from "@/actions/auth/logout";
import { useUIStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Background Black */}
      {isSideMenuOpen && (
        <div className="bg-black opacity-30 fixed top-0 left-0 w-screen h-screen z-10" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className="fade-in top-0 left-0 fixed w-screen h-screen z-10 backdrop-filter backdrop-blur-xs"
          onClick={closeSideMenu}
        />
      )}

      {/* Sidebar Menu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-gray-200 z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
            "translate-x-0": isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer hover:bg-gray-100 hover:rounded-4xl"
          onClick={() => closeSideMenu()}
        />

        {/* User Menu */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Profile</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <button
              className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
              onClick={() => {
                logout();
                closeSideMenu();
              }}
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Log Out</span>
            </button>
          </>
        )}

        {/* Login Menu */}
        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
            onClick={() => closeSideMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Login</span>
          </Link>
        )}

        {/* Admin Menu */}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-300 my-10" />
            <Link
              href="/admin/products"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
