"use client";

import React, { useEffect } from 'react';

interface IconProps {
  fill?: string;
  stroke?: boolean;
  width?: string;
  height?: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const ChevronIcon: React.FC<IconProps> = ({
  stroke = "currentColor",
  width = "1.5rem",
  height = "1.5rem",
  className = "",
  direction = 'down'
}) => {
  
  const rotation = {
    down: "rotate-0",
    up: "rotate-180",
    left: "rotate-90",
    right: "-rotate-90",
  }[direction];
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotation} transform transition-transform duration-300 ease-in-out`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const UserIcon: React.FC<IconProps> = ({
  stroke = "currentColor",
  width = "1.5rem",
  height = "1.5rem",
  className = "",
}) => {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-labelledby="userOutlineTitle" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <title id="userOutlineTitle">User profile</title>
      <circle cx="12" cy="8" r="3.2"></circle>
      <path d="M4.5 20c1.8-3.6 5.1-5 7.5-5s5.7 1.4 7.5 5"></path>
    </svg>
  )
}

export const SearchIcon: React.FC<IconProps> = ({
  stroke = "currentColor",
  width = "1.5rem",
  height = "1.5rem",
  className = "",
}) => {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="24" height="24" 
      role="img" aria-labelledby="searchTitle" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <title id="searchTitle">Search</title>
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
    </svg>
  )
}

export const ShopIcon: React.FC<IconProps> = ({
  stroke = "currentColor",
  width = "1.5rem",
  height = "1.5rem",
  className = "",
}) => {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-labelledby="bagTitle" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <title id="bagTitle">Shopping bag</title>
      <path d="M6 2h12l1.2 4H4.8L6 2z" />
      <path d="M4 6h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6z" />
      <path d="M9 10a3 3 0 0 1 6 0" />
    </svg>
  )
}

export const MenuIcon: React.FC<IconProps> = ({
  stroke = "currentColor",
  width = "1.5rem",
  height = "1.5rem",
  className = "",
}) => {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" role="img" aria-labelledby="menuTitle" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <title id="menuTitle">Menu</title>
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </svg>
  )
}

export const CloseIcon: React.FC<IconProps> = ({
  stroke = "currentColor",
  width = "1.5rem",
  height = "1.5rem",
  className = "",
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </svg>
  )
}

export const SignOutIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {/* Door Frame */}
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H9" 
      />
    </svg>
  );
};
