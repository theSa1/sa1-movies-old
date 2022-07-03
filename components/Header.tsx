import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed w-full h-16 bg-white z-20">
      <div className="px-2 flex items-center justify-between container mx-auto h-full">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Sa1 Movies Logo"
            className="w-20 cursor-pointer"
          />
        </Link>
        <div className="w-64 flex h-9 border-2 rounded-md border-[#4FD1C5]">
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
      </div>
    </header>
  );
};
