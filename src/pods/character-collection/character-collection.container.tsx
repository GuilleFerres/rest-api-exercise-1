import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';

export const CharacterCollectionContainer = () => {
  const { characterCollection, loadCharacterCollection } = useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleSelect = (id: number) => {
    navigate(linkRoutes.selectedCharacter(id.toString()));
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      onSelect={handleSelect}
    />
  );
};
