import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GlobalLayout } from "@/components/blocks/global";
import { AppProvider } from "@/providers/AppProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Head from "next/head";
import { AppProvider } from "@/providers/AppProvider";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quokka | 기억하고 싶은 문구를 나만의 카드로",
  title: "Quokka",
  description: "기억하고 싶은 문장을 나만의 카드로",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        <AuthProvider>
          <AppProvider>
            <GlobalLayout>{children}</GlobalLayout>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
