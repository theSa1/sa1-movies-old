export const WhereToWatch = ({
  title,
  whereToWatch,
  id
}: {
  title: string;
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
  id: number;
}) => {
  return (
    <div className="col-span-12 md:col-span-4 bg-white p-5 rounded-lg space-y-3">
      <h2 className="text-xl font-semibold">Where To Watch</h2>
      <div className="space-y-1">
        {whereToWatch.stream.length !== 0 && (
          <>
            <h3>Stream</h3>
            <div className="space-x-2">
              {whereToWatch.stream.map((platform) => (
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
      {whereToWatch.rent.length !== 0 && (
        <>
          <h3>Rent</h3>
          <div className="space-x-2">
            {whereToWatch.rent.map((platform) => (
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
      {whereToWatch.buy.length !== 0 && (
        <>
          <h3>Buy</h3>
          <div className="space-x-2">
            {whereToWatch.buy.map((platform) => (
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
              link: "https://hdtoday.cc/search/" + title.replaceAll(" ", "-"),
            },
            {
              name: "Soap2Day",
              link: `https://soap2day.sh/search/keyword/${encodeURI(title)}`,
            },
            {
              name: "Kat Movies HD",
              link: `https://katmoviehd.cx/?s=${encodeURI(title)}`,
            },
            {
              name: "All Movies Hub",
              link: `https://allmovieshub.guru/?s=${encodeURI(title)}`,
            },
            {
              name: "The Movies Flix",
              link: `https://themoviesflix.ac/?s=${encodeURI(title)}`,
            },
            {
              name: "Vega Movies",
              link: `https://vegamovies.rest/?s=${encodeURI(title)}`,
            },
            {
              name: "2Embed",
              link: `https://2embed.org/download/${id}`
            }
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
        <h3>Direct Watch</h3>
        <div className="space-y-2">
          {[
            {
              name: "2Embed",
              link: `https://2embed.org/download/${id}`
            },
            {
              name: "2Embed.org",
              link: `https://2embed.org/embed/${id}`
            },
            {
              name: "",
              link: `https://www.2embed.to/embed/tmdb/movie?id=${id}`
            }
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
  );
};
