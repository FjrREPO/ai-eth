import React from "react";
import { Navbar } from "../bar/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-y-auto gap-5 overflow-x-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-black">
      <Navbar />
      <div className="w-full flex-1 px-5 sm:px-10 lg:px-20 items-start justify-center flex">
        <div className="w-full h-full flex xl:max-w-screen-xl lg:max-w-screen-lg mx-auto justify-center">
          <main className="mt-4 h-fit">{children}</main>
        </div>
      </div>
    </div>
  );
}
