import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

function Main({ children }) {
  return (
    <div className="w-full h-full bg-gray-100">
      <div className="fixed w-full">
        <NavbarComponent />
      </div>
      <div className="py-28">{children}</div>
      <div className="items-center w-full flex justify-center pb-4">
        <FooterComponent />
      </div>
    </div>
  );
}

export default Main;
