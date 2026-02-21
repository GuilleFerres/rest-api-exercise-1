import axios from 'axios';
import { EpisodeEntityApi } from './episode-collection.api-model';

const url = 'https://rickandmortyapi.com/api/episode';

export const getEpisode = async (episodeUrl: string): Promise<EpisodeEntityApi> => {
  const { data } = await axios.get(episodeUrl);

  if (!data) {
    throw new Error('Episode not found');
  }
  return data as EpisodeEntityApi;
}
