import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { MovieCard } from "../components/MovieCard";
import { organizeMovies } from "../lib/organizeMovies";

type Movie = {
  id: number;
  rating: number;
  poster: string;
  title: string;
  releaseDate: string;
};

const Home: NextPage<{
  popularMovies: Movie[];
  topMovies: Movie[];
  onTheaters: Movie[];
  upcomingMovies: Movie[];
}> = ({ popularMovies, topMovies, onTheaters, upcomingMovies }) => {
  return (
    <>
      <Head>
        <title>Sa1 Movies</title>
      </Head>
      <Layout>
        <div className="px-2 py-5 container mx-auto">
          <h3 className="text-2xl font-semibold mb-1">Popular Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <h3 className="text-2xl font-semibold mb-1 mt-6">Top Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <h3 className="text-2xl font-semibold mb-1 mt-6">On Theaters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {onTheaters.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <h3 className="text-2xl font-semibold mb-1 mt-6">
            Top Upcoming Movies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const getPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1&region=IN`
    );

    const { results } = await res.json();

    return organizeMovies(results);
  };

  const getTopMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1&region=IN`
    );

    const { results } = await res.json();

    return organizeMovies(results);
  };

  const getOnTheaters = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1&region=IN`
    );

    const { results } = await res.json();

    return organizeMovies(results);
  };

  const getUpcomingMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1&region=IN`
    );

    const { results } = await res.json();

    return organizeMovies(results);
  };

  return {
    props: {
      popularMovies: await getPopularMovies(),
      topMovies: await getTopMovies(),
      onTheaters: await getOnTheaters(),
      upcomingMovies: await getUpcomingMovies(),
    },
  };
};

export default Home;
