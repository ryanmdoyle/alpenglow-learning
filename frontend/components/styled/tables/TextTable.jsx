import React from 'react';
import { css } from '@emotion/core';

const classTable = css`
  width: 100%;
  border-radius: var(--borderRadius);
  border: 1px solid rgba(1, 1, 1, 0);
  display: flex;
  align-items: center;
  span {
    flex: 0 1 20%;
    text-align: right;
    padding: 0.5rem 0;
  }
  span:first-of-type {
    flex: 1 1 50%;
    text-align: left;
  }
`;

const row = css`
  padding: 0.5rem 1rem;
  :hover, :focus, :active {
      border: 1px solid var(--blueMedium);
      box-shadow: var(--shadowLight);
      text-align: left;
  }
`;

const header = css`
  padding: 0rem 1rem;
  font-size: 0.85rem;
  line-height: 0.5rem;
  border-radius: 0;
`;

const firstDivBorder = css`
  min-width: 500px;
  div:nth-of-type(2) {
    border-top: 1px solid var(--blueMedium50);
    border-radius: 0;
    :hover {
      border-radius: var(--borderRadius);
      border: 1px solid var(--blueMedium);
      box-shadow: var(--shadowLight);
    }
  }
`;

const tableContainer = css`
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    height: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--blueMedium);
  }
`;

const TextTableContainer = ({ children }) => (
  <div css={tableContainer}>
    <div css={firstDivBorder}>
      {children}
    </div>
  </div>
)

const TextTableHeader = ({ children }) => (
  <div css={[classTable, header]}>
    {children}
  </div>
)

const TextTableRow = ({ children }) => (
  <div css={[classTable, row]}>
    {children}
  </div>
)

export default TextTableContainer;
export { TextTableContainer, TextTableHeader, TextTableRow }
