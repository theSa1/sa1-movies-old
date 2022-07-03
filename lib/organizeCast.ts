export const organizeCast = (data: {
  cast?: {
    id: number;
    name: string;
    character: string;
    profile_path?: string;
  }[];
}) => {
  const casts: {
    id: number;
    image?: string;
    name: string;
    characterName: string;
  }[] = [];

  if (!data.cast) {
    return casts;
  }

  data.cast.forEach((cast) => {
    casts.push({
      id: cast.id,
      image:
        cast.profile_path &&
        `https://image.tmdb.org/t/p/w138_and_h175_face/${cast.profile_path}`,
      name: cast.name,
      characterName: cast.character,
    });
  });

  return casts;
};
