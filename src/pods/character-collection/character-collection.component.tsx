import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';
import { searchCharacters } from './api/character-collection.api';
import { PaginationInfo } from './api/character-collection.api-model';
import {
  CharacterSearchFormComponent,
  CharacterSearchFormValues,
} from './components/character-search-form.component';
import { Pagination } from '@mui/material';

interface Props {
  characterCollection: CharacterEntityVm[];
  paginationInfo: PaginationInfo | null;
  onSelect: (id: number) => void;
  onPageChange: (page: number, searchQuery?: string) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { characterCollection, paginationInfo, onSelect, onPageChange } = props;
  const [visibleCharacters, setVisibleCharacters] = React.useState<CharacterEntityVm[]>(
    characterCollection
  );
  const [currentSearchQuery, setCurrentSearchQuery] = React.useState<string>('');
  const [isSearchActive, setIsSearchActive] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    setVisibleCharacters(characterCollection);
  }, [characterCollection]);

  const handleSearch = async (values: CharacterSearchFormValues) => {
    try {
      const params = new URLSearchParams();
      const term = values.searchTerm.trim();


      if (term) {
        if (values.filters.name && term) params.append('name', term);
        if (values.filters.species && term) params.append('species', term);
        if (values.filters.type && term) params.append('type', term);
      }

      if (values.filters.status && values.statusValue) {
        params.append('status', values.statusValue);
      }

      if (values.filters.gender && values.genderValue) {
        params.append('gender', values.genderValue);
      }

      const query = params.toString();

      if (!query) {
        setIsSearchActive(false);
        setCurrentSearchQuery('');
        setCurrentPage(1);
        setVisibleCharacters(characterCollection);
        onPageChange(1);
        return;
      }

      setCurrentSearchQuery(query);
      setIsSearchActive(true);
      setCurrentPage(1);

      const response = await searchCharacters(query, 1);
      setVisibleCharacters(response.results);

    } catch (error) {
      console.error('Error searching characters:', error);
    }
  };

  const handlePaginationChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    
    if (isSearchActive && currentSearchQuery) {
      try {
        const response = await searchCharacters(currentSearchQuery, page);
        setVisibleCharacters(response.results);
      } catch (error) {
        console.error('Error al cambiar de página en búsqueda:', error);
      }
    } else {
      onPageChange(page);
    }
  };

  return (
    <div className={classes.root}>
      <CharacterSearchFormComponent onSearch={handleSearch} />

      <ul className={classes.list}>
        {visibleCharacters.map((character) => (
          <li key={character.id}>
            <CharacterCard
              character={character}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>

      {paginationInfo && (
        <Pagination 
          count={paginationInfo.pages} 
          page={currentPage}
          onChange={handlePaginationChange}
          color="primary" 
          className={classes.pagination} />
      )}
    </div>
  );
};
