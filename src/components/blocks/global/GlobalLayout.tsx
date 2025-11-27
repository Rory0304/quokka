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
    <main className="h-full w-full">
      <div className="w-full h-full max-w-7xl mx-auto">
        <GlobalHeader />
        <div className="pt-16 relative">{children}</div>
      </div>
    </main>
  );
};
