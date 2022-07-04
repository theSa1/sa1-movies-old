import Head from "next/head";
import { Layout } from "../components/Layout";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import toast, { Toaster } from "react-hot-toast";

const WatchlistPage = () => {
  const { getToken } = useAuth();
  const [watchlist, setWatchlist] = useState<
    {
      id: number;
      title: string;
      poster: string;
      releaseDate?: string | undefined;
      rating: number;
    }[]
  >([]);

  useEffect(() => {
    getWatchlist();
  }, []);

  const getWatchlist = async () => {
    const token = await getToken({
      template: "backend",
    });

    const res = await fetch("api/getWatchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    if (res.status !== 200) {
    }

    const watchlistFromDb = await res.json();

    setWatchlist(watchlistFromDb);
  };

  const handleRemoveWatchlist = async (id: number) => {
    const tostId = toast.loading("Removing from watchlist");

    const token = await getToken({
      template: "backend",
    });

    const res = await fetch("/api/removeFromWatchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        id,
      }),
    });

    toast.dismiss(tostId);
    if (res.status !== 200) {
      toast.error("Failed");
    } else {
      setWatchlist(await res.json());
      toast.success("Removed from watchlist");
    }
  };

  return (
    <>
      <Head>
        <title>Watchlist | Sa1 Movies</title>
      </Head>
      <SignedIn>
        <Toaster />
      </SignedIn>
      <Layout>
        <div className="px-2 py-5 container mx-auto">
          <h3 className="text-2xl font-semibold mb-1">Watchlist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {watchlist.map((movie) => (
              <div key={movie.id} className="relative">
                <div
                  className="absolute top-0 right-0 z-20 h-12 w-12 p-2 cursor-pointer"
                  onClick={() => handleRemoveWatchlist(movie.id)}
                >
                  <svg viewBox="0 0 24 24" fill="#fff">
                    <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zM3 16h7v-2H3v2zm11.41 6L17 19.41 19.59 22 21 20.59 18.41 18 21 15.41 19.59 14 17 16.59 14.41 14 13 15.41 15.59 18 13 20.59 14.41 22z"></path>
                  </svg>
                </div>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default WatchlistPage;
