'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState } from 'react';
import Link from 'next/link';
import { dark } from '@clerk/themes';
import { CircleChevronDown } from 'lucide-react';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav id='nav1' className="bg-gray-50/90 dark:bg-neutral-950/10 backdrop-blur text-black border-b p-4 md:p-0 border-black/20 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/" className='animate-text bg-gradient-to-r from-black via-gray-300 to-gray-900 bg-clip-text text-transparent text-4xl font-black'>HYLSE</Link>
          </div>
          <div className="hidden md:flex space-x-4 mr-20 dark:text-neutral-50 text-neutral-950 ">
            <Link href="/" className="rounded-md m-4 py-2 px-2 font-semibold dark:hover:bg-neutral-50 dark:hover:text-neutral-950 hover:bg-gray-900 hover:text-white">Home</Link>
            <Link href="/dashboard" className="rounded-md m-4 py-2 px-2 font-semibold dark:hover:bg-neutral-50 dark:hover:text-neutral-950 hover:bg-gray-900 hover:text-white">Dashboard</Link>
           
          </div>
          <div className="md:hidden">
           <button 
             onClick={() => setIsOpen(!isOpen)} 
             className="text-neutral-900 dark:text-neutral-50 text-4xl transition-transform duration-300 ease-in-out">
             <CircleChevronDown 
              size={32} 
              className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
           </button>
          </div>
          <div className='hidden md:flex'>
            <SignedOut>
            <SignInButton>
            <button className="inline-flex m-4 py-2 px-2 animate-shimmer font-semibold items-center justify-center hover:shadow-xl rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#71777f,55%,#000103)] bg-[length:200%_100%] text-white transition-colors">
            Sign In
            </button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
            <UserButton appearance={{
        baseTheme: dark,
        elements: {
          userButtonBox: "p-2 mx-auto",
          userButtonOuterIdentifier: "text-lg lg:hover:text-silver-200 lg:text-silver-50 text-silver-600 font-bold",
          avatarBox: "h-6 w-6"
        }
        
      }} />
            </SignedIn>
            </div>
        </div>
        {isOpen && (
          <div className="md:hidden text-2xl text-neutral-950 dark:text-neutral-50 text-center space-y-2 mt-3">
            <Link href="/" className="block" onClick={handleLinkClick}>Home</Link>
            <Link href="/dashboard" className="block" onClick={handleLinkClick}>Dashboard</Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="block mx-auto p-1 animate-shimmer items-center justify-center hover:shadow-xl rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#71777f,55%,#000103)] bg-[length:200%_100%] text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
