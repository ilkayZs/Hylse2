import React from 'react'
import Link from 'next/link';
import { Linkedin } from 'lucide-react';


function page() {
  return (
    <div className=" p-4 h-screen dark:bg-neutral-900 bg-neutral-50 flex justify-center items-center">
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden mx-auto">
          <div className="bg-red-600 p-6">
              <h2 className="font-bold text-3xl md:text-4xl text-white">
              Chat history is COOMİNG SOON...
              </h2>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-bold text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200">
              We are still developing our application and it is currently in Beta test. Please don&apos;t forget to give feedback.
            </h3>
            
            <h4 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
              Remember, the better prompt you enter, the better the results. It may also give errors because it is in the testing phase. Please let us know the errors.
            </h4>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-lg mt-4 transition-colors duration-200"
            >
              Please contact me via LinkedIn
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
    </div>
  )
}

export default page