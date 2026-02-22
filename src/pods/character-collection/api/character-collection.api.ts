import { CharacterEntityApi } from './character-collection.api-model';
import { mockCharacterCollection } from './character-collection.mock-data';
import axios from 'axios';

let characterCollection = [...mockCharacterCollection];

const url = 'https://rickandmortyapi.com/api/character';

export const getCharacterCollection = async (): Promise<CharacterEntityApi[]> => {
  const { data } = await axios.get(url);

  if (!data || !data.results) {
    throw new Error('Invalid response structure: missing data or results');
  }
  return data.results as CharacterEntityApi[];
};

export const getCharacter = async (id: number): Promise<CharacterEntityApi> => {
  const { data } = await axios.get(`${url}/${id}`);

  if (!data) {
    throw new Error('Character not found');
  }
  return data as CharacterEntityApi;
}

export const searchCharacters = async (query: string): Promise<CharacterEntityApi[]> => {
  const { data } = await axios.get(`${url}/?${query}`);

  if (!data || !data.results) {
    throw new Error('No characters found');
  }
  return data.results as CharacterEntityApi[];
}

export const deleteCharacter = async (id: number): Promise<boolean> => {
  characterCollection = characterCollection.filter((c) => c.id !== id);
  return true;
};
