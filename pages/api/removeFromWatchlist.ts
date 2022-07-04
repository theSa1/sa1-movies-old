import type { NextApiRequest, NextApiResponse } from "next";
import { removeFromWatchlist } from "../../lib/server/db";
import { verifyJWT } from "../../lib/server/verifyJWT";

type Data = {
  movies: {
    id: number;
    title: string;
    poster: string;
    releaseDate: string;
    rating: number;
  }[];
};

const removeFromWatchlistRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  if (!req.body.token) {
    return res.status(400).end();
  }

  if (!req.body.id) {
    return res.status(400).end();
  }

  const id = await verifyJWT(req.body.token);

  if (!id) {
    return res.status(400).end();
  }

  const outpot = await removeFromWatchlist(id, req.body.id);

  return res.status(200).json(outpot);
};

export default removeFromWatchlistRoute;
