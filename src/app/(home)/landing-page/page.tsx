import React from 'react';
import Link from 'next/link';
import AnimatedCodeEditor from '@/app/components/Animatedtext';

const codeSnippets = [
  // Button component
  `function Button() {
  return (
    <button className="bg-red-500 hover:bg-red-600 text-white">
    Button
    </button>
  );
  }
  export default Button;`,
  
      // Card component
      `function Card() {
  return(
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {content}
        </p>
      </div>
    </div>
  );
  };
  export default Card;`,
  
      // Simple React component with state
      `function Section() {
  return (
      <div className="text-center">
        <p className="text-2xl mb-4">Welcome to website</p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Try Now
        </button>
      </div>
    );
  };  
  export default Section;`
];

const LandingPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
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
     
      <div className="container z-10 flex flex-col items-center gap-6 px-4 md:px-6 lg:flex lg:flex-row lg:gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Design with Hylse AI.</h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Create React and Tailwind front-end design components in the simplest way with Hylse.
          </p>
          <Link
            href="/sign-in"
            className="dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-300  hover:bg-neutral-800 bg-neutral-950 text-gray-100 hover:text-gray-50 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
        <div className=' lg:w-[600px] lg:h-[400px] h-[200px] w-full'>
        <AnimatedCodeEditor texts={codeSnippets} interval={6000} />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;