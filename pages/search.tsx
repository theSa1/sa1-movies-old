import type { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { MovieCard } from "../components/MovieCard";
import { organizeMovies } from "../lib/organizeMovies";

const Search: NextPage<{
  statusCode: number;
  query: string;
  searchResults: {
    id: number;
    rating: number;
    poster: string;
    title: string;
    releaseDate?: string;
  }[];
}> = ({ searchResults, query, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        <title>Search Results For {query} | Sa1 Movies</title>
      </Head>
      <Layout>
        <div className="px-2 py-5 container mx-auto">
          <h3 className="text-2xl font-semibold mb-1">
            Search Results For {query}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.q || typeof context.query.q !== "string") {
    return {
      props: {
        statusCode: 404,
      },
    };
  }

  const query = decodeURI(context.query.q);

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}`
  );

  const { results } = await res.json();

  const searchResults = organizeMovies(results);

  return {
    props: { searchResults, query: context.query.q, statusCode: 200 },
  };
};

export default Search;
