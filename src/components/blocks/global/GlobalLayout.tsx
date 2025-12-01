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
    <main className="h-full w-full bg-slate-50">
      <div className="w-full">
        <GlobalHeader />
        <div className="pt-16 relative max-w-7xl mx-auto min-h-screen px-6">
          {children}
        </div>
      </div>
    </main>
  );
};
