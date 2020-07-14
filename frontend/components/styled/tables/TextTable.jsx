import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import Link from 'next/link';

const classTable = css`
  width: 100%;
  display: flex;
  align-items: center;
  span {
    flex: 0 1 20%;
    text-align: right;
    padding: 0;
    padding-right: 0.75rem;
  }
  span:first-of-type {
    flex: 1 1 50%;
    text-align: left;
  }
  span:last-of-type {
    padding-right: 0rem;
  }
`;

const row = css`
  padding: 0.7rem 1rem;
  border-radius: var(--borderRadius);
  :hover, :focus, :active {
    box-shadow: var(--shadowLight);
  }
`;

const header = css`
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  line-height: 0.5rem;
  color: var(--pink);
`;

const tableContainer = css`
  width: 100%;
  /* overflow-y: scroll; */
  overflow-x: scroll;
  /* padding so scrollbar does not hide row box-shadow */
  padding: 0.2rem;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    height: 0.2rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--blueMedium);
  }
`;

const TextTableContainer = ({ children }) => (
  <div css={tableContainer}>
    {children}
  </div>
)

const TextTableHeader = ({ children }) => (
  <div css={[classTable, header]}>
    {children}
  </div>
)

const TextTableRow = ({ children, linkHref, linkAs, onClick }) => {
  if (linkAs && linkHref) {
    return (
      <div css={[classTable, row]} onClick={onClick}>
        {children}
      </div>
    )
  }
  return (
    <div css={[classTable, row]} onClick={onClick}>
      {children}
    </div>
  )
}

TextTableRow.propTypes = {
  linkHref: PropTypes.string,
  linkAs: PropTypes.string,
}

export default TextTableContainer;
export { TextTableContainer, TextTableHeader, TextTableRow }
