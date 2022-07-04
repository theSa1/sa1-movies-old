import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed w-full h-16 bg-white z-20">
      <div className="px-2 flex items-center justify-between container mx-auto h-full space-x-2">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Sa1 Movies Logo"
            className="w-20 cursor-pointer"
          />
        </Link>

        <div className="flex items-center space-x-2">
          <div className=" flex h-9 border-2 rounded-md border-[#4FD1C5]">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="font-sans text-sm font-normal my-1 mx-3 w-full bg-transparent focus:outline-none"
            />
            <Link
              href={{
                pathname: "/search",
                query: { q: searchQuery },
              }}
            >
              <a className="h-full bg-[#4FD1C5] w-14 flex items-center justify-center">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.6917 22.2575L18.2838 16.8448C19.7423 15.0683 20.6134 12.7926 20.6134 10.3163C20.6134 4.62459 15.9984 0.00958252 10.3067 0.00958252C4.61501 0.00958252 0 4.62459 0 10.3163C0 16.008 4.61501 20.623 10.3067 20.623C12.7928 20.623 15.0734 19.742 16.8548 18.2739L22.2626 23.6817C22.894 24.2592 23.4861 23.8872 23.6917 23.6817C24.1028 23.2755 24.1028 22.6637 23.6917 22.2575ZM2.01142 10.3163C2.01142 5.73552 5.72594 2.021 10.3067 2.021C14.8874 2.021 18.6069 5.73552 18.6069 10.3163C18.6069 14.897 14.8923 18.6115 10.3116 18.6115C5.73083 18.6115 2.01142 14.897 2.01142 10.3163Z"
                    fill="white"
                  />
                </svg>
              </a>
            </Link>
          </div>
          <SignedIn>
            <UserButton />
            <Link href="/watchlist">
              <div className="w-9 h-9 cursor-pointer">
                <svg viewBox="0 0 24 24" fill="#1A202C">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
              </div>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <div className="w-9 h-9 cursor-pointer">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#1A202C"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  ></path>
                </svg>
              </div>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
