import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { MovieCard } from "../components/MovieCard";
import { organizeMovies } from "../lib/organizeMovies";

const Home: NextPage<{
  popularMovies: {
    id: number;
    rating: number;
    poster: string;
    title: string;
    releaseDate: string;
  }[];
}> = ({ popularMovies }) => {
  return (
    <Layout>
      <div className="px-2 py-5 container mx-auto">
        <h3 className="text-2xl font-semibold mb-1">Popular Movies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1&region=IN`
  );

  const { results } = await res.json();

  const popularMovies = organizeMovies(results);

  return {
    props: { popularMovies },
  };
};

export default Home;
