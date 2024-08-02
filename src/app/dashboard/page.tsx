'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const Dashboard: React.FC = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-l from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex flex-col p-6 lg:p-10 relative">
      {/* SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-neutral-400/20 dark:text-neutral-600/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto w-full space-y-8 relative ">
        <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
          <div className="bg-purple-600 p-6">
            {user && (
              <h2 className="font-bold text-3xl md:text-4xl text-white">
                Welcome to Hylse, {user.firstName}
              </h2>
            )}
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-bold text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200">
              We are still developing our application and it is currently in Beta test. Please don't forget to give feedback.
            </h3>
            <h4 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
              Remember, the better prompt you enter, the better the results. It may also give errors because it is in the testing phase. Please let us know the errors.
            </h4>
            <a
              href="https://www.linkedin.com/in/hylse-ai-b00009214/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-lg mt-4 transition-colors duration-200"
            >
              And this app is for sale. Please contact me via LinkedIn
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden ">
          <div className="bg-red-600 p-6">
            <h4 className="font-bold text-2xl md:text-3xl text-white">
              Features we will be adding soon.
            </h4>
          </div>
          <div className="p-6">
            <ul className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
              <li className="items-start">
                <span className="text-red-500 mr-2">•</span>
                More advanced code output will be added, for now simple 
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link href='https://react.dev/' 
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 dark:text-sky-400 font-bold mx-1">
                      React.js
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    React.js – The library for web and native user interfaces.
                  </HoverCardContent>
                </HoverCard>
                components can only work with 
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link href='https://tailwindcss.com/' 
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 dark:text-sky-400 font-bold mx-1">
                      Tailwind.css
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Tailwind.css – It's fast, flexible, and reliable — with zero-runtime.
                  </HoverCardContent>
                </HoverCard>.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                The payment system will come and credits will be available for purchase. For now, usage is limited as we are in the testing phase.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Chat history will be added.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;