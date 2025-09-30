"use client";

import { useAnimation } from "@/context/animation-context";
import { MenuIcon, SearchIcon, ShopIcon, SignOutIcon, UserIcon } from "@/icons/Icons";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "./modal";
import Link from "next/link";
import LoginModal from "@/app/login/login-modal";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const Header = () => {

  const { showHeader } = useAnimation();
  const inputRef = useRef(null);
  const router = useRouter();
  const { user, logout } = useAuth(); 
  const isLoggedIn = !!user;
  
  const [isInputActive, setInputActive] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // This effect focuses the input field when it becomes visible.
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const logoutCustomer = async () => {
    logout();
    router.push('/');
  }

  return (
    <>
    <header
      className={`fixed top-0 left-0 w-full h-[80px] z-50 transition-transform duration-300 ease-out
      ${!showHeader ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="grid grid-cols-3 justify-between items-center p-4 md:p-6 bg-white bg-opacity-90 backdrop-blur-md text-black border-b border-white border-opacity-10">
        {/* Left Navigation */}
        <MenuIcon className="text-[#33383c] cursor-pointer" />

        {/* Centered Logo */}
        <div className="flex-grow flex justify-center">
          <Link href="/" className="text-2xl font-bold font-serif">DIOR</Link>
        </div>

        {/* Right Icons/Links */}
        <div className="flex justify-end items-center gap-8">
          <div className="hidden md:block flex items-center space-x-2 cursor-pointer"
            onMouseOver={() => setInputActive(true)}
            onMouseOut={() => setInputActive(false)}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                onFocus={() => setVisible(true)}
                onBlur={() => setVisible(false)}
                className={`py-2 border-b border-[#33383c] focus:outline-none focus:border-[#7b8487]
                  transition-all duration-300 ease-in-out
                  ${isInputActive ? 'w-48 opacity-100' : 'w-0 opacity-0'}
                `}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                <SearchIcon className="w-5 h-5 text-[#33383c]" />
              </div>
            </div>
          </div>
          
          {isLoggedIn ? 
            <div className="flex items-center space-x-6">
              <Link href="/profile" className="text-sm text-[#33383c] hover:underline font-medium">
                { user.firstName }
              </Link>
              <span onClick={ () => logoutCustomer() } className="cursor-pointer text-sm text-red-600 hover:underline">
                <SignOutIcon className="text-[#33383c] cursor-pointer h-6 w-6" />
              </span>
            </div>
            : 
            <span onClick={() => setLoginModal(true)} className="cursor-pointer">
              <UserIcon className="text-[#33383c] cursor-pointer" />
            </span>
          }
          <a href="#">
            <ShopIcon className="text-[#33383c] cursor-pointer" />
          </a>
        </div>
      </div>

      {
        isVisible && 
        <ModalComponent setIsOpen={setVisible} />
      }
    </header>

    { loginModal &&
      <LoginModal setIsOpen={ setLoginModal } />
    }
    </>
  );
};

export default Header;
