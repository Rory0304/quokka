import { Metadata } from "next";
import React, { FC } from "react";
import { GlobalHeader } from "./header/GlobalHeader";

interface GlobalLayoutProps {
  children?: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Quokka",
  description: "기억에 남는 한 줄",
};

export const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <main className="h-full w-screen">
      <div className="h-full">
        <GlobalHeader />
        <div className="pt-16 relative max-w-xl mx-auto w-full shadow-xl">
          {children}
        </div>
      </div>
    </main>
  );
};
