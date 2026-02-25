import { Character } from './character.api-model';
import { Lookup } from '#common/models';
import { mockCities, mockCharacterCollection } from './character.mock-data';
import axios from 'axios';

const url = 'https://rickandmortyapi.com/api/character';

export const getCharacter = async (id: number): Promise<Character> => {
  const { data } = await axios.get(`${url}/${id}`);
  
  if (!data) {
    throw new Error('Character not found');
  }
  
  return data as Character;
};
