import { MongoClient } from "mongodb";
import { getDetailsFromId } from "./getDetailsFromId";

const client = new MongoClient(process.env.MONGO_DB_URI as string);

export const getWatchlistFromDb = async (id: string) => {
  const collection = await client
    .db("sa1-movies")
    .collection("watchlists")
    .findOne({
      userId: id,
    });

  return (
    collection || {
      userId: id,
      movies: [],
    }
  );
};

export const addToWatchlist = async (userId: string, movieId: number) => {
  let watchlist = await client
    .db("sa1-movies")
    .collection("watchlists")
    .findOne({
      userId: userId,
    });

  if (!watchlist) {
    await client
      .db("sa1-movies")
      .collection("watchlists")
      .insertOne({
        userId: userId,
        movies: [await getDetailsFromId(movieId)],
      });

    return "success";
  } else if (
    (
      watchlist.movies as {
        id: number;
        poster: string;
        title: string;
        rating: number;
        releaseDate: string;
      }[]
    ).find((movie) => movie.id === movieId)
  ) {
    return "exsists";
  } else {
    await client
      .db("sa1-movies")
      .collection("watchlists")
      .updateOne(
        {
          userId: userId,
        },
        {
          $push: {
            movies: await getDetailsFromId(movieId),
          },
        }
      );
  }
};

export const removeFromWatchlist = async (userId: string, movieId: number) => {
  await client
    .db("sa1-movies")
    .collection("watchlists")
    .updateOne(
      {
        userId: userId,
      },
      {
        $pull: {
          movies: {
            id: movieId,
          },
        },
      }
    );

  const updatedWatchlist = await client
    .db("sa1-movies")
    .collection("watchlists")
    .findOne({
      userId: userId,
    });

  return updatedWatchlist?.movies || [];
};
