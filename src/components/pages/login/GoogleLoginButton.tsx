"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { FC } from "react";

export const GoogleLoginButton: FC = () => {
  const googleAuthHandler = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <form action={googleAuthHandler} className="mt-8 w-full">
      <button className="cursor-pointer w-full">
        <div className="w-full flex items-center justify-center bg-white px-6 py-2 rounded-md border border-gray-300">
          <div className="text-black relative flex items-center gap-3">
            <Image
              src="/google_logo.svg"
              alt="Google logo"
              width={20}
              height={20}
            />

            <span>구글로 로그인</span>
          </div>
        </div>
      </button>
    </form>
  );
};
