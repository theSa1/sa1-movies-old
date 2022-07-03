import Link from "next/link";

export const MovieCard = ({
  movie,
}: {
  movie: {
    id: number;
    rating: number;
    poster: string;
    title: string;
    releaseDate?: string;
  };
}) => (
  <Link key={movie.id} href={`/movie/${movie.id}`}>
    <div
      style={{
        backgroundImage: `url(${movie.poster})`,
      }}
      className="relative aspect-[3/5] cursor-pointer overflow-hidden rounded-lg bg-cover bg-center"
    >
      <div className="bg-gradient-overlay absolute bottom-0 left-0 right-0 p-3 pt-24 text-white">
        <h1 className="text-sm font-semibold leading-4">{movie.title}</h1>
        {movie.releaseDate && (
          <p className="text-xs font-light">{movie.releaseDate}</p>
        )}
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
          <p className="text-xs">8.5/10</p>
        </div>
      </div>
    </div>
  </Link>
);
