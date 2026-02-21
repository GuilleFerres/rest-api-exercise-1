import { css } from '@emotion/css';

export const root = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: content-box;
`;

export const episodesList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const field = css`
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const dataField = css`
  font-size: 1.2rem;
`;

export const characterData = css`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const image = css`
  width: 200px;
  height: auto;
  border-radius: 8px;
`;
