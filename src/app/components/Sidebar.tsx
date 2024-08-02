'use client'
import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls, easeInOut, AnimationControls } from "framer-motion";
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from "next/link";
import { FileClock, FolderClock, LayoutDashboard, BrainCircuit } from 'lucide-react';

import { dark } from "@clerk/themes";
import { ModeToggle } from './Darkmode';


const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

interface CustomMenuIconProps {
  isOpen: boolean;
}

const CustomMenuIcon: React.FC<CustomMenuIconProps> = ({ isOpen }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M 2 5.5 L 20 5.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: { d: "M 2 5.5 L 20 5.5" },
        open: { d: "M 3 2.5 L 17 16.5" }
      }}
    />
    <motion.path
      d="M 2 12 L 20 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 }
      }}
      transition={{ duration: 0.1 }}
    />
    <motion.path
      d="M 2 18.5 L 20 18.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: { d: "M 2 18.5 L 20 18.5" },
        open: { d: "M 3 16.5 L 17 2.5" }
      }}
    />
  </svg>
);

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen, containerControls, svgControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <>
      <div className=" flex flex-row z-20 w-full justify-between border-b border-neutral-600 dark:border-neutral-200/40 place-items-center">
        <Link href="/" className=" text-3xl overflow-hidden ml-12 lg:ml-1 animate-text bg-gradient-to-r from-neutral-800 dark:from-neutral-500 via-neutral-400 dark:via-neutral-200 dark:to-neutral-500 to-neutral-800 bg-clip-text text-transparent font-black">
          HYLSE
        </Link>
        
        <button className="p-1 rounded-full block" onClick={handleOpenClose}>
          <svg xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               strokeWidth={1} 
               stroke="currentColor" 
               className="w-8 h-8 dark:stroke-neutral-200 stroke-neutral-950">
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              variants={svgVariants}
              animate={svgControls}
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" 
              transition={{
                duration: 0.5,
                ease: easeInOut,
              }}
            />
          </svg>
          
        </button>
      </div >
      <div className="flex flex-col gap-3">
        <div className='fixed top-20 flex flex-row justify-center items-center gap-2 '>
        <ModeToggle />  
        </div>
        <Link href="/dashboard/hylseai" className="overflow-clip whitespace-nowrap tracking-wide flex p-1 rounded cursor-pointer font-medium stroke-[0.75] dark:hover:stroke-neutral-100 dark:stroke-neutral-400 hover:stroke-neutral-950 stroke-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 text-neutral-500 hover:text-neutral-950 place-items-center gap-3 dark:hover:bg-neutral-700/30 hover:bg-neutral-500/20 transition-colors duration-100">
          <BrainCircuit className='stroke-inherit stroke[.75] min-w-8 w-8'/>
          HYLSE AI
        </Link>
        <Link href="/dashboard" className="overflow-clip whitespace-nowrap tracking-wide flex p-1 rounded cursor-pointer font-medium stroke-[0.75]  dark:hover:stroke-neutral-100 dark:stroke-neutral-400 hover:stroke-neutral-950 stroke-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 text-neutral-500 hover:text-neutral-950 place-items-center gap-3 dark:hover:bg-neutral-700/30 hover:bg-neutral-500/20 transition-colors duration-100">
          <LayoutDashboard className='stroke-inherit stroke[.75] min-w-8 w-8'/>
          Dashboard
        </Link>
        <Link href="/history" className="overflow-clip whitespace-nowrap tracking-wide flex p-1 rounded cursor-pointer font-medium stroke-[0.75] dark:hover:stroke-neutral-100 dark:stroke-neutral-400 hover:stroke-neutral-950 stroke-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 text-neutral-500 hover:text-neutral-950 place-items-center gap-3 dark:hover:bg-neutral-700/30 hover:bg-neutral-500/20 transition-colors duration-100">
          <FolderClock className='stroke-inherit stroke[.75] min-w-8 w-8'/>
          Chat History
        </Link>
      </div>
      <div className='overflow-clip flex flex-col gap-3 min-w-12'>
        <SignedOut>
          <SignInButton>
            <button className="overflow-clip inline-flex py-2 px-2 animate-shimmer font-semibold items-center justify-center hover:shadow-xl rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#71777f,55%,#000103)] bg-[length:200%_100%] text-neutral-50 transition-colors">  
              <span className="">Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <li className='overflow-clip whitespace-nowrap tracking-wide flex p-1 rounded cursor-pointer stroke-[0.75] dark:hover:stroke-neutral-100 hover:stroke-neutral-900 dark:stroke-neutral-400 stroke-neutral-700 dark:text-neutral-400 text-neutral-800 hover:text-neutral-100 place-items-center gap-3 dark:hover:bg-neutral-700/30 hover:bg-neutral-500/20 transition-colors duration-100'>
            <UserButton showName appearance={{
              baseTheme: dark,
              elements: {
                userButtonBox: "mx-auto",
                userButtonOuterIdentifier: "ml-10 absolute text-lg dark:text-neutral-50 text-neutral-950  font-bold float-right",          
                avatarBox: "w-8 h-8"
              }
            }} />
          </li>
        </SignedIn>
       
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav 
        variants={containerVariants}
        initial="close"
        animate={containerControls}
        className={`dark:bg-neutral-900 bg-neutral-300 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600 ${isMobile ? 'hidden' : 'flex'}`}>
        {sidebarContent}
      </motion.nav>

      {/* Mobile Sidebar */}
     {isMobile && (
        <motion.nav 
          initial={false}
          animate={isOpen ? "open" : "close"}
          variants={{
            open: { x: 0 },
            close: { x: "-100%" },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="dark:bg-neutral-900 bg-neutral-300 flex flex-col z-10 gap-20 p-5 fixed top-0 left-0 h-full w-64 shadow shadow-neutral-600">
          {sidebarContent}
        </motion.nav>
      )}

      {/* Mobile Toggle Button */}
      {isMobile && (
        <motion.button 
          onClick={handleOpenClose}
          className="fixed top-4 left-5 z-20 p-2 dark:bg-neutral-800 bg-neutral-200 rounded-md shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-900 dark:text-neutral-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              variants={{
                open: { d: "M6 18L18 6M6 6l12 12" },
                closed: { d: "M4 6h16M4 12h16M4 18h16" }
              }}
            />
          </motion.svg>
        </motion.button>
      )}
    </>
  );
};

export default Sidebar;