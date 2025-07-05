'use client'
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Nav from "./CornerNav";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home"); // Default active link

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu on mobile after clicking
  };

  const linkClasses = (link) =>
    link === activeLink
      ? "text-[#4a3e33] font-bold text-lg"
      : "text-foreground font-semibold";


      const LINKS = [
        { href: "/", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#products", label: "Products" },
      ];

  return (
    <>
      <div className="bg-background sticky top-0 left-0 right-0 z-[1]">
        <div className="  py-4 px-4 md:px-20 flex justify-between items-center relative">
          {/* Logo */}
          <a href="/">
            <img src="/sparsa-brown.png" alt="Logo" className="w-52" />
            {/* <h1 className="font-extrabold text-3xl md:text-5xl text-foreground">
              Sparsa
            </h1> */}
          </a>
          <div className="lg:hidden">
            {/* Hamburger Menu for Mobile */}
            <Nav LINKS={LINKS} />
          </div>

          {/* Navigation Menu for Large Devices */}
          <div className="hidden lg:block">
            <nav>
              <ul className="flex items-center gap-8">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={linkClasses(link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Us Button */}
          <div className="hidden lg:block">
            <button className="text-foreground font-semibold border-2 border-foreground px-4 py-2 rounded-lg">
              <a href="#contact" className="flex items-center gap-2">
                Contact Us
                <span>
                  {/* <img src={arrowIcon} alt="Arrow Icon" className="w-4" /> */}
                </span>
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
