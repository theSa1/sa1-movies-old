export const getMovieTrailer = (
  videos: {
    type: string;
    official: boolean;
    site: string;
    key: string;
  }[]
) => {
  const trailers = videos.filter(
    (video) =>
      video.type === "Trailer" &&
      video.official === true &&
      video.site === "YouTube"
  );

  if (trailers.length <= 0) {
    return null;
  }

  return trailers[trailers.length - 1].key;
};
