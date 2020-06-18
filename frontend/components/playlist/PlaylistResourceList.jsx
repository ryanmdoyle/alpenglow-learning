import React from 'react';
import { css } from '@emotion/core';

const list = css`
list-style: none;
margin: 0;
padding: 0;
  li {
    min-height: 65px;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    overflow: hidden;
    box-sizing: border-box;
    :hover {
      box-shadow: var(--shadowMedium)
    }
  }
  span, small {
    padding-left: 1rem;
  }
`;

const info = css`
  display: flex;
  flex-direction: column;
`;

const PlaylistResourceList = () => {
  return (
    <ul css={list}>
      <li>
        <img src='/article-40.png' />
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        <img src='/video-40.png' />
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        <img src='/practice-40.png' />
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        <img src='/image-40.png' />
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        <img src='/audio-40.png' />
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>

    </ul>
  );
};

export default PlaylistResourceList;