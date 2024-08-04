import { SignUp } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default function Page() {
  return (

    <div className="flex justify-center items-center h-screen bg-neutral-950">
    <SignUp routing="path" path="/sign-up"
     appearance={{
        baseTheme: dark
      }} 
    />
    </div>
  )
}