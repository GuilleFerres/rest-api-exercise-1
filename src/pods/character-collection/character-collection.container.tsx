import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { deleteCharacter } from './api';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';

export const CharacterCollectionContainer = () => {
  const { characterCollection, loadCharacterCollection } = useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleCreateCharacter = () => {
    navigate(linkRoutes.createCharacter);
  };

  const handleSelect = (id: number) => {
    navigate(linkRoutes.selectedCharacter(id.toString()));
  };

  const handleDelete = async (id: number) => {
    await deleteCharacter(id);
    loadCharacterCollection();
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      onCreateCharacter={handleCreateCharacter}
      onSelect={handleSelect}
      onDelete={handleDelete}
    />
  );
};
