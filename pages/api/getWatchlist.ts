import type { NextApiRequest, NextApiResponse } from "next";
import { getWatchlistFromDb } from "../../lib/server/db";
import { verifyJWT } from "../../lib/server/verifyJWT";

type Data = {
  movies: {
    id: number;
    title: string;
    poster: string;
    releseDate: string;
    rating: number;
  }[];
};

const getWatchlist = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  if (!req.body.token) {
    return res.status(400).end();
  }

  const id = await verifyJWT(req.body.token);

  if (!id) {
    return res.status(400).end();
  }

  const watchlist = await getWatchlistFromDb(id);

  return res.status(200).json(watchlist.movies);
};

export default getWatchlist;
