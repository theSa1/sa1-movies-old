export const organizeMovies = (
  data: {
    title: string;
    vote_average: number;
    poster_path?: string;
    id: number;
    release_date?: string;
  }[]
) => {
  const movies = data.map((movie) => ({
    title: movie.title,
    rating: movie.vote_average,
    poster: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
    id: movie.id,
    releaseDate: !movie.release_date ? null : movie.release_date,
  }));

  return movies.slice(0, 18);
};
