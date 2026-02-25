import { CharacterEntityApi, CharacterCollectionResponse, PaginationInfo } from './character-collection.api-model';
import { mockCharacterCollection } from './character-collection.mock-data';
import axios from 'axios';

let characterCollection = [...mockCharacterCollection];

const url = 'https://rickandmortyapi.com/api/character';

export const getCharacterCollection = async (currentPage: number): Promise<CharacterCollectionResponse> => {
  const { data } = await axios.get(`${url}?page=${currentPage || 1}`);

  if (!data || !data.results) {
    throw new Error('Invalid response structure: missing data or results');
  }

  if (!data.info || typeof data.info.pages !== 'number') {
    throw new Error('Invalid response structure: missing info or pages');
  }

  return {
    results: data.results as CharacterEntityApi[],
    info: data.info as PaginationInfo
  };
}

export const getCharacter = async (id: number): Promise<CharacterEntityApi> => {
  const { data } = await axios.get(`${url}/${id}`);

  if (!data) {
    throw new Error('Character not found');
  }
  return data as CharacterEntityApi;
}

export const searchCharacters = async (query: string, currentPage: number = 1): Promise<CharacterCollectionResponse> => {
  const separator = query ? '&' : '';
  const { data } = await axios.get(`${url}/?${query}${separator}page=${currentPage}`);

  if (!data || !data.results) {
    throw new Error('No characters found');
  }
  
  return {
    results: data.results as CharacterEntityApi[],
    info: data.info as PaginationInfo
  };
}

export const deleteCharacter = async (id: number): Promise<boolean> => {
  characterCollection = characterCollection.filter((c) => c.id !== id);
  return true;
};
