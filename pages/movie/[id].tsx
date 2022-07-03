import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import { Layout } from "../../components/Layout";
import { MovieCard } from "../../components/MovieCard";
import { getMovieTrailer } from "../../lib/getMovieTrailer";
import { organizeCast } from "../../lib/organizeCast";
import { organizeMovies } from "../../lib/organizeMovies";
import { organizePlatforms } from "../../lib/organizePlatforms";

const MoviePage: NextPage<{
  movie: {
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
  statusCode: number;
}> = ({ movie, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  const formateRuntime = (a: number) => {
    var hours = Math.trunc(a / 60);
    var minutes = a % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Layout>
      <div className="container mx-auto grid grid-cols-12 gap-5 px-2 py-5">
        <h1 className="col-span-12 text-2xl font-semibold">
          {movie.title}{" "}
          <span className="font-normal">
            ({movie.releseDate.split("-")[0]})
          </span>
        </h1>
        {movie.backdrop && (
          <div
            className="bg-white md:col-span-9 col-span-12 aspect-[14/6] rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.backdrop})`,
            }}
          ></div>
        )}
        {movie.poster && (
          <div
            className="col-span-3 bg-white rounded-lg bg-cover bg-center md:block hidden"
            style={{
              backgroundImage: `url(${movie.poster})`,
            }}
          ></div>
        )}
        <div className="col-span-12 md:col-span-8 bg-white p-5 rounded-lg space-y-4">
          {movie.tagline && <h2 className="text-xl italic">{movie.tagline}</h2>}
          <p className="text-sm text-slate-700">{movie.overview}</p>
          {movie.rating !== 0 && (
            <div className="flex items-center space-x-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.9511 8.44587C21.8334 8.08374 21.5204 7.81982 21.1437 7.76515L14.7544 6.83685L11.897 1.0467C11.7285 0.705307 11.3808 0.489136 11.0001 0.489136C10.6193 0.489136 10.2716 0.705307 10.1032 1.0467L7.24596 6.83678L0.856501 7.76508C0.479769 7.81982 0.166714 8.08374 0.0490928 8.4458C-0.0685278 8.80793 0.0295561 9.2054 0.302204 9.47112L4.92562 13.9774L3.83376 20.3416C3.76941 20.7168 3.92364 21.096 4.23163 21.3198C4.40586 21.4464 4.61223 21.5108 4.8196 21.5108C4.97876 21.5108 5.13859 21.4729 5.28495 21.3959L11 18.3915L16.715 21.3959C16.8622 21.4734 17.0235 21.5102 17.1832 21.5108C17.7349 21.51 18.1819 21.0626 18.1819 20.5107C18.1819 20.4338 18.1733 20.359 18.1569 20.2871L17.0745 13.9774L21.6979 9.47112C21.9706 9.2054 22.0687 8.80793 21.9511 8.44587Z"
                  fill="#FFD700"
                />
              </svg>
              <p className="text-sm">{movie.rating}/10</p>
            </div>
          )}
          <div>
            <h3 className="font-medium">
              Run Time:{" "}
              <span className="font-normal">
                {formateRuntime(movie.runtime)}
              </span>
            </h3>
            <h3 className="font-medium">
              Status: <span className="font-normal">{movie.status}</span>
            </h3>
            <h3 className="font-medium">
              Original Language:{" "}
              <span className="font-normal">{movie.originalLanguage}</span>
            </h3>
            <h3 className="font-medium">
              Relese Date:{" "}
              <span className="font-normal">{movie.releseDate}</span>
            </h3>
            <h3 className="font-medium">
              Budget: <span className="font-normal">{movie.budget}</span>
            </h3>
            <h3 className="font-medium">
              Revenue: <span className="font-normal">{movie.revenue}</span>
            </h3>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-white p-5 rounded-lg space-y-3">
          <h2 className="text-xl font-semibold">Where To Watch</h2>
          <div className="space-y-1">
            {movie.whereToWatch.stream.length !== 0 && (
              <>
                <h3>Stream</h3>
                <div className="space-x-2">
                  {movie.whereToWatch.stream.map((platform) => (
                    <div
                      key={platform.icon}
                      style={{
                        backgroundImage: `url(${platform.icon})`,
                      }}
                      className="inline-block border w-12 h-12 rounded-md bg-cover bg-center"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {movie.whereToWatch.rent.length !== 0 && (
            <>
              <h3>Rent</h3>
              <div className="space-x-2">
                {movie.whereToWatch.rent.map((platform) => (
                  <div
                    key={platform.icon}
                    style={{
                      backgroundImage: `url(${platform.icon})`,
                    }}
                    className="inline-block border w-12 h-12 rounded-md bg-cover bg-center"
                  />
                ))}
              </div>
            </>
          )}
          {movie.whereToWatch.buy.length !== 0 && (
            <>
              <h3>Buy</h3>
              <div className="space-x-2">
                {movie.whereToWatch.buy.map((platform) => (
                  <div
                    key={platform.icon}
                    style={{
                      backgroundImage: `url(${platform.icon})`,
                    }}
                    className="inline-block border w-12 h-12 rounded-md bg-cover bg-center"
                  />
                ))}
              </div>
            </>
          )}
          <div className="space-y-1">
            <h3>Direct Search</h3>
            <div className="space-y-2">
              {[
                {
                  name: "HD Today",
                  link:
                    "https://hdtoday.cc/search/" +
                    movie.title.replaceAll(" ", "-"),
                },
                {
                  name: "Soap2Day",
                  link: `https://soap2day.sh/search/keyword/${encodeURI(
                    movie.title
                  )}`,
                },
                {
                  name: "Kat Movies HD",
                  link: `https://katmoviehd.cx/?s=${encodeURI(movie.title)}`,
                },
                {
                  name: "All Movies Hub",
                  link: `https://allmovieshub.guru/?s=${encodeURI(
                    movie.title
                  )}`,
                },
                {
                  name: "The Movies Flix",
                  link: `https://themoviesflix.ac/?s=${encodeURI(movie.title)}`,
                },
                {
                  name: "Vega Movies",
                  link: `https://vegamovies.rest/?s=${encodeURI(movie.title)}`,
                },
              ].map((site) => (
                <a
                  href={site.link}
                  key={site.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 px-4 border rounded-md font-medium text-md hover:bg-slate-50 cursor-pointer mr-2"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        {movie.trailer && (
          <>
            <h3 className="col-span-12 text-xl font-semibold mt-3 -mb-3">
              Trailer
            </h3>
            <div className="col-span-12 aspect-video bg-white rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${movie.trailer}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
        <h3 className="col-span-12 text-xl font-semibold mt-3 -mb-3">Watch</h3>
        <div className="col-span-12 aspect-video bg-white rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={movie.watch}
            allowFullScreen
          ></iframe>
        </div>
        <h3 className="col-span-12 text-xl font-semibold mt-3 -mb-3">
          Top Casts
        </h3>
        {movie.casts.map((i) => (
          <div
            key={i.id}
            className="flex col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-lg h-24 overflow-hidden"
          >
            <div
              style={{
                backgroundImage: `url(${i.image})`,
              }}
              className="h-full w-24 bg-cover bg-center"
            ></div>
            <div className="p-3">
              <h3 className="text-xl">{i.name}</h3>
              <p className="text-sm text-slate-700">{i.characterName}</p>
            </div>
          </div>
        ))}
        <h3 className="col-span-12 text-xl font-semibold mt-3 -mb-3">
          Similar Movies
        </h3>
        <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {movie.similar.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params?.id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=watch%2Fproviders,videos,credits,recommendations`
  );

  if (!res.ok) {
    return {
      props: {
        statusCode: res.status,
      },
    };
  }

  const data = await res.json();

  const movie = {
    title: data.title,
    poster:
      data.poster_path &&
      `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`,
    backdrop:
      data.backdrop_path &&
      `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
    tagline: data.tagline,
    overview: data.overview,
    rating: data.vote_average,
    director: "",
    status: data.status,
    releseDate: data.release_date,
    runtime: data.runtime,
    originalLanguage: data.original_language,
    budget: `$${(data.budget as number).toLocaleString()}`,
    revenue: `$${(data.revenue as number).toLocaleString()}`,
    whereToWatch: organizePlatforms(data["watch/providers"]),
    trailer: getMovieTrailer(data.videos.results),
    watch: `https://www.2embed.to/embed/tmdb/movie?id=${data.id}`,
    casts: organizeCast(data.credits),
    similar: organizeMovies(data.recommendations.results),
  };

  return {
    props: { movie, statusCode: 200 },
  };
};

export default MoviePage;