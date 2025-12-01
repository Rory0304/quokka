"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { FC } from "react";

export const GoogleLoginButton: FC = () => {
  const googleAuthHandler = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <form action={googleAuthHandler} className="w-full">
      <button className="cursor-pointer w-full">
        <div className="w-full flex items-center justify-center bg-white p-2 rounded-md border border-gray-300">
          <div className="text-black relative flex items-center gap-3">
            <Image
              src="/google_logo.svg"
              alt="Google logo"
              width={20}
              height={20}
            />

            <span className="text-xs text-foreground">Sign in with Google</span>
          </div>
        </div>
      </button>
    </form>
  );
};
