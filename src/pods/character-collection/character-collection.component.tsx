import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';
import { searchCharacters } from './api/character-collection.api';
import {
  CharacterSearchFormComponent,
  CharacterSearchFormValues,
} from './components/character-search-form.component';

interface Props {
  characterCollection: CharacterEntityVm[];
  onSelect: (id: number) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { characterCollection, onSelect } = props;
   const [visibleCharacters, setVisibleCharacters] = React.useState<CharacterEntityVm[]>(
    characterCollection
  );

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
        setVisibleCharacters(characterCollection);
        return;
      }

      const results = await searchCharacters(query);

      setVisibleCharacters(results);

    } catch (error) {
      console.error('Error searching characters:', error);
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
    </div>
  );
};
