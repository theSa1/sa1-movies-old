export const organizePlatforms = (data: {
  results: {
    IN?: {
      flatrate?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
      rent?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
      buy?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
    };
  };
}) => {
  const platforms: {
    stream: {
      id: number;
      name: string;
      icon: string;
    }[];
    rent: {
      id: number;
      name: string;
      icon: string;
    }[];
    buy: {
      id: number;
      name: string;
      icon: string;
    }[];
  } = {
    stream: [],
    rent: [],
    buy: [],
  };

  if (!data.results.IN) {
    return platforms;
  }

  if (data.results.IN.flatrate) {
    data.results.IN.flatrate.forEach((platform) => {
      platforms.stream.push({
        id: platform.provider_id,
        name: platform.provider_name,
        icon: `https://image.tmdb.org/t/p/original${platform.logo_path}`,
      });
    });
  }

  if (data.results.IN.rent) {
    data.results.IN.rent.forEach((platform) => {
      platforms.rent.push({
        id: platform.provider_id,
        name: platform.provider_name,
        icon: `https://image.tmdb.org/t/p/original${platform.logo_path}`,
      });
    });
  }

  if (data.results.IN.buy) {
    data.results.IN.buy.forEach((platform) => {
      platforms.buy.push({
        id: platform.provider_id,
        name: platform.provider_name,
        icon: `https://image.tmdb.org/t/p/original${platform.logo_path}`,
      });
    });
  }

  return platforms;
};
