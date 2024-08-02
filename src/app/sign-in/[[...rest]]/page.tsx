// src/app/sign-in/[[...rest]]/page.tsx
'use client';
import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const SignInPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-neutral-950">
      <SignIn routing="path" path="/sign-in" 
      appearance={{
      baseTheme: dark
    }} />
    </div>
  );
};

export default SignInPage;
