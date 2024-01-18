import React from "react";
import { MdFastfood } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function NavbarComponent() {
  const location = useLocation();

  return (
    <div className="w-full text-white shadow-lg">
      <div className="bg-blue-500 flex gap-4 px-10 md:px-20 py-3 items-center">
        <MdFastfood size={30} />
        <p className="font-semibold text-3xl">Alan Resto</p>
      </div>
      <div className="text-blue-500 flex gap-14 px-10 md:px-40 pt-3 font-semibold bg-gray-100">
        <Link
          to="/"
          className={
            location.pathname === "/" || location.pathname === "/addfood"
              ? "border-b-2 border-blue-500 pb-2"
              : "pb-2"
          }
        >
          Food
        </Link>
        <Link
          to="/foods"
          className={
            location.pathname === "/foods"
              ? "border-b-2 border-blue-500 pb-2"
              : "pb-2"
          }
        >
          Transaksi
        </Link>
      </div>
    </div>
  );
}

export default NavbarComponent;
