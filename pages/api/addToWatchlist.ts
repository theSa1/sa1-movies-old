import type { NextApiRequest, NextApiResponse } from "next";
import { addToWatchlist } from "../../lib/server/db";
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

const addToWatchlistRoute = async (
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

  const outpot = await addToWatchlist(id, req.body.id);

  if (outpot === "exsists") {
    return res.status(400).end();
  }

  return res.status(200).end();
};

export default addToWatchlistRoute;
