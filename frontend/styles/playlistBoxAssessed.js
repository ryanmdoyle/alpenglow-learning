import { css } from '@emotion/core';

const playlistBoxAssessed = (score) => {
  if (score >= 80) {
    return css`
      background-color: var(--green);
      border-color: var(--green);
      span { color: white;}
    `
  }

  if (score >= 70) {
    return css`
      background-color: var(--yellow);
      border-color: var(--yellow);
      span { color: white; text-shadow: 0 0 5px #00000030;}
    `
  }

  if (score !== null && score >= 0) {
    return css`
      background-color: var(--red);
      border-color: var(--red);
      span { color: white;}
    `
  }
  return null
};

export default playlistBoxAssessed;