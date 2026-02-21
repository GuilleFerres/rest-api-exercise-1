import * as React from 'react';
import { EpisodeCard } from './components/episode-card.component';
import * as classes from './episode-collection.styles';

interface Props {
  episodeCollection: string[];
}

export const EpisodeCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { episodeCollection } = props;

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        { episodeCollection.map((episodeUrl, index) => (
          <li key={index}>
            <EpisodeCard episodeUrl={episodeUrl} />
          </li>
        )) }
      </ul>
    </div>
  );
}

