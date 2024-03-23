"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsList, BsX } from "react-icons/bs";

const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Catan",
      href: "/catan",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-slate-800 max-w-full">
      <div className="flex items-center justify-between py-3 px-2 text-slate-100 max-w-5xl mx-auto">
        <Link
          href="/"
          className="flex flex-row items-center gap-2 font-bold px-4 py-2 rounded-md custom-transitions"
        >
          <Image
            src="/dicelogic-logo.svg"
            width={30}
            height={30}
            alt="WildWestia website logo"
          />
          <p>DiceLogic</p>
        </Link>
        <div className="flex items-center gap-7">
          <div className="md:hidden flex flex-row items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-white border-transparent border-2 rounded-md custom-transitions hover:border-gray-400"
            >
              {isOpen ? <BsX size={30} /> : <BsList size={30} />}{" "}
            </button>
          </div>

          <div className="hidden md:flex flex-row items-center gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <p className="text-md font-bold hover:bg-slate-600 px-4 py-2 rounded-md custom-transitions">
                  {link.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-start py-2 px-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <p
                  className="text-md font-bold text-white ml-2 px-2 py-2 my-1 hover:bg-slate-600 rounded-md custom-transitions"
                  onClick={toggleSidebar}
                >
                  {link.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
