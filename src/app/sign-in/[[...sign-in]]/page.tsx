import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-neutral-950">
      <SignIn routing="path" path="/sign-in" 
      appearance={{
      baseTheme: dark
    }} />
    </div>
  )
}