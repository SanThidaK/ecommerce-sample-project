"use client";

import React, { useState } from "react";

import { ChevronIcon } from "@/icons/Icons";
import NavLink from "./nav-link";
import data from "@/lib/data.json";

const Footer = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <footer className="bg-cannage bg-[#d7d1c7] lg:p-[25px] p-[20px]" style={{ backgroundImage: "url('/assets/photos/cannage-bg.png')" }}>
      <div className="bg-white rounded lg:p-6 p-4">
        <div className="flex md:flex-row flex-col space-x-4 mt-2">
          {data.reassurance.map((data, index) => (
            <div 
              className={`text-[1rem] font-medium mx-0 py-[1.5rem] border-b border-[#dadada]`} 
              key={data.id}
            >
              <div 
                onClick={() => { if (data.url) window.location}}
                className={`flex flex-row md:gap-6 cursor-pointer items-center justify-between  ${index === 0 ? 'md:pe-[1.5rem]' : index === 2 ? 'md:ps-[1.5rem]' : 'md:px-[1.5rem]'} ${index === 0 || index === 1 ? 'md:border-r border-[#dadada]' : ''}`}
              >
                <span className="flex flex-col cursor-pointer">
                  <span className="font-serif text-black-400 font-medium">
                    { data.title }
                  </span>
                  <span className="text-[#7b8487] ">
                    { data.text }
                  </span>
                </span>
                
                <div className="w-[30px]">
                  <ChevronIcon className="text-[#33383c]" width="24" height="24" direction="right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="py-20">
          <div className="max-w-3xl">
            <h2 className="text-base font-serif mb-6">
              Newsletter
            </h2>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 rounded border border-gray-300 w-full sm:w-80"
              />
              <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition">
                Confirm
              </button>
            </form>
          </div>
        </section>

        <div className=" text-balck max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {data.footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-semibold font-serif mb-3">
                {section.title}
              </h3>
            
              {section.links.map((data) => (
                <div key={data.name} className="mb-2 flex flex-col">
                  <div className={`flex lg:flex-row items-center pb-2 cursor-pointer ${data.sub && toggle ? 'text-[#7b8487]' : 'text-[#33383c]'}`}
                    onClick={() => setToggle(!toggle)}
                  >
                    <NavLink href="/" className="text-[.875rem] hover:text-[#7b8487] after:bg-[#7b8487]">
                      { data.name }
                    </NavLink>
                    
                    { 
                      data.sub && 
                      <div className="ps-4">
                        <ChevronIcon className="text-[#7b8487]" width="24" height="24" direction={toggle ? 'up' : 'down'} />
                      </div>
                    }
                  </div>
                  {
                    data.sub && toggle && (
                      <NavLink href={data.sub.url} className="text-[.875rem] hover:[#7b8487] pe-4 after:bg-[#7b8487]">
                        {data.sub.name}
                      </NavLink>
                    )
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Dior Beauty. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer;