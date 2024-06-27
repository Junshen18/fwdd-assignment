import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gillsans = localFont({
  src: "/fonts/Gill-Sans-Ultra-Bold.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Python Wizard",
  description: "play and learn at one time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`leading-none tracking-[-4%] ${gillsans.className}`}>
        {children}
      </body>
    </html>
  );
}
