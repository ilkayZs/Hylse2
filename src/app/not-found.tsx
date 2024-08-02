'use client';
import Link from 'next/link';  
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-950 text-white">
      <FaExclamationTriangle className="text-6xl text-white" />
      <div className="space-y-4 text-center">
        <h1 className="mt-16 text-6xl font-bold tracking-tighter">
          404
        </h1>
        <p className="text-4xl font-medium">
          Oops, the page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link href="/" className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-white px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
        Back to Home
      </Link>
    </div>
  );
}
