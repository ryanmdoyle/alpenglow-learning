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
    transition: box-shadow 0.15s;
    :hover {
      box-shadow: var(--shadowMedium);
      transition: box-shadow 0.15s;
    }
  }
  i {
    padding-left: 0.5rem;
    font-size: 2rem;
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
        {/* <img src='/article-40.png' /> */}
        <i class="material-icons">article</i>
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        {/* <img src='/video-40.png' /> */}
        <i class="material-icons">videocam</i>
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        {/* <img src='/practice-40.png' /> */}
        <i class="material-icons">create</i>
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        {/* <img src='/image-40.png' /> */}
        <i class="material-icons">photo</i>
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>
      <li>
        <i class="material-icons">mic</i>
        <div css={info}>
          <span>Khan Academy Ratios & rates</span>
          <small>Some resource thats neat with a really long description so that we can see what it would look like if some resource had some redoculously long resource that some person placed without thinking of what it would end up looking like.</small>
        </div>
      </li>

    </ul>
  );
};

export default PlaylistResourceList;