import React from 'react';
import { Character } from './character.vm';
import * as classes from './character.styles';
import { EpisodeCollectionContainer } from '#pods/episode-collection/episode-collection.container';


interface Props {
  character: Character;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character} = props;

  return (
    <div className={classes.root}>
      <div className={classes.characterData}>
        <section>
          <img src={character.image} alt={character.name} className={classes.image} />
        </section>
        <section>
          <h1>{character.name}</h1>
          <p className={classes.dataField}>
            <span className={classes.field}>Species:</span>
            {character.species}
            </p>
          <p className={classes.dataField}>
            <span className={classes.field}>Status:</span>
            {character.status}
          </p>
          <p className={classes.dataField}>
            <span className={classes.field}>Location:</span>
            {character.location.name}
          </p>
        </section>
      </div>


      <p className={classes.dataField}>
        <span className={classes.field}>Character episodes:</span>
      </p>
      <EpisodeCollectionContainer episodeCollection={character.episode} />
    </div>
  );
};

