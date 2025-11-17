"use client";

import { SessionProvider } from "next-auth/react";

import React, { FC } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
