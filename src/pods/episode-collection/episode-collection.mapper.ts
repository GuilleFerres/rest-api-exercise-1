import * as apiModel from './api/episode-collection.api-model';
import * as viewModel from './episode-collection.vm';

export const mapFromApiToVm = (
  episode: apiModel.EpisodeEntityApi
): viewModel.EpisodeEntityVm => ({
  id: episode.id,
  name: episode.name,
  air_date: episode.air_date,
  episode: episode.episode,
  characters: episode.characters,
  url: episode.url,
  created: episode.created,
});
