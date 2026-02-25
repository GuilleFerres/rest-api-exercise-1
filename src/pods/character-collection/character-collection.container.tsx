import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';

export const CharacterCollectionContainer = () => {
  const { characterCollection, paginationInfo, loadCharacterCollection } = useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleSelect = (id: number) => {
    navigate(linkRoutes.selectedCharacter(id.toString()));
  };

  const handlePageChange = (page: number) => {
    loadCharacterCollection(page);
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      paginationInfo={paginationInfo}
      onSelect={handleSelect}
      onPageChange={handlePageChange}
    />
  );
};
