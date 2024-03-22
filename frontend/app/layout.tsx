import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContentWrapper from "./ContentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediaToy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#393646] w-full h-screen`}>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </body>
    </html>
  );
}
