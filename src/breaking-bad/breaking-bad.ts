import fetch from 'node-fetch';
import memoize from 'fast-memoize';

const API_BASE_URL = 'https://www.breakingbadapi.com/api';
const SERIES_NAME = 'Breaking+Bad';

type TEpisode = {
  characters: string[];
  episode: string;
  season: string;
  series: string;
  title: string;
};

// Can we rely on the fact that there won't be any news episodes? :)
const getBreakingBadEpisodes = memoize(
  async (): Promise<TEpisode[]> => {
    const response = await fetch(
      `${API_BASE_URL}/episodes?series=${SERIES_NAME}`,
    );

    return response.json();
  },
);

function getEpisodeLabel(
  seasonNumber: string,
  episodeNumber: string,
  title: string,
) {
  const season = seasonNumber.trim().padStart(2, '0');
  const episode = episodeNumber.trim().padStart(2, '0');

  return `S${season}${episode} - ${title}`;
}

function areInEpisodeTogether(episode: TEpisode, names: string[] = []) {
  return names.every(name => episode.characters.includes(name));
}

function getEpisodeLabelsWithCharacters(
  characterNames: string[],
  episodes: TEpisode[],
) {
  return episodes.reduce<string[]>((result, episode) => {
    const { season: seasonNumber, episode: episodeNumber, title } = episode;

    if (areInEpisodeTogether(episode, characterNames)) {
      result.push(getEpisodeLabel(seasonNumber, episodeNumber, title));
    }

    return result;
  }, []);
}

export async function breakingBad(inputNames?: string[] | string) {
  if (!inputNames) return [];

  const characterNames = Array.isArray(inputNames) ? inputNames : [inputNames];

  try {
    const episodes = await getBreakingBadEpisodes();

    return getEpisodeLabelsWithCharacters(characterNames, episodes);
  } catch (err) {
    console.error('Unable to receive episodes');
    console.error(err);
  }
}
