import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { supabase } from "./utils/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RX Payroll",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 if(await supabase.auth.getUser() == null){
  var res = await supabase.auth.signInAnonymously()
  console.log(res);
 }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme accentColor="plum" panelBackground="solid" radius="large">
          {children}
          {/* <ThemePanel /> */}
      </Theme>
      
      </body>
    </html>
  );
}
