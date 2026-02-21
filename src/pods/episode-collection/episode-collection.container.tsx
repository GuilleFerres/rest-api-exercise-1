import * as React from 'react';
import { EpisodeCollectionComponent } from './episode-collection.component';

interface Props {
  episodeCollection: string[];
}
export const EpisodeCollectionContainer = (props: Props) => {
  const { episodeCollection } = props;

  return (
    <EpisodeCollectionComponent
      episodeCollection={episodeCollection}
    />
  );
};
