export const getDetailsFromId = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );

  const data = await res.json();

  return {
    id: data.id,
    title: data.title,
    poster:
      data.poster_path &&
      `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
    releaseDate: data.release_date,
    rating: data.vote_average,
  };
};
