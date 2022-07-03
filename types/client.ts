import { NextPage } from "next";

export type Movie = {
  title: string;
  poster?: string;
  backdrop?: string;
  tagline: string;
  overview: string;
  rating: number;
  director: string;
  status: string;
  releseDate: string;
  runtime: number;
  originalLanguage: string;
  budget: string;
  revenue: string;
  whereToWatch: {
    stream: {
      icon: string;
    }[];
    rent: {
      icon: string;
    }[];
    buy: {
      icon: string;
    }[];
  };
  trailer?: string;
  watch: string;
  casts: {
    id: number;
    image?: string;
    name: string;
    characterName: string;
  }[];
  similar: {
    title: string;
    rating: number;
    poster: string;
    id: number;
    releaseDate: string;
  }[];
};

export type MoviePage = NextPage<{
  movie: Movie;
  statusCode: number;
}>;
