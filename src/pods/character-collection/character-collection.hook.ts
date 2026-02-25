import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacterCollection } from './api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from '#common/mappers';
import { PaginationInfo } from './api/character-collection.api-model';

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<CharacterEntityVm[]>(
    []
  );
  const [paginationInfo, setPaginationInfo] = React.useState<PaginationInfo | null>(null);

  const loadCharacterCollection = (currentPage: number = 1) => {
    getCharacterCollection(currentPage).then((response) => {
      setCharacterCollection(mapToCollection(response.results, mapFromApiToVm));
      setPaginationInfo(response.info);
    });
  };

  return { characterCollection, paginationInfo, loadCharacterCollection };
};
