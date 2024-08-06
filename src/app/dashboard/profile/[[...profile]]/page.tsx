import { UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { dark } from '@clerk/themes';


const Profile = async () => {
  const { userId } = auth();
  const isAuth = !!userId;
  const user = await currentUser();

  if (!isAuth) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-neutral-900 p-4 flex flex-col justify-center">
      <div className="max-w-[890px] w-full mx-auto">
        <div className="bg-neutral-100 dark:bg-neutral-800 shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-400 to-red-500 p-4">
            <div className="flex items-center space-x-4">
              <div className="mx-auto">
              <p className="text-neutral-100 text-xl font-bold">Welcome to your profile</p>
                <h2 className="text-neutral-100 text-2xl font-bold">{user?.username || 'User'}</h2>
              </div>
            </div>
          </div>
            <UserProfile 
            appearance={{
                baseTheme: dark
              }} />
        </div>
      </div>
    </div>
  );
};

export default Profile;