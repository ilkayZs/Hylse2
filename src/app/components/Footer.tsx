import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950/10 text-gray-800 dark:text-gray-200 py-4 fixed bottom-0 w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm mb-2 md:mb-0">&copy; 2024 Hylse.  All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="privacy-policy" className="text-gray-800 dark:text-gray-200 hover:underline mx-4">
              Privacy Policy
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
