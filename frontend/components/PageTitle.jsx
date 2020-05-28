import React from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/core';

const titleStyles = css`
  width: 100%;
  min-height: 75px;
  padding: 0 2rem;
  background-color: var(--blueLight);
  h3 {
    margin: 0;
    padding: 1.2rem 0;
  }
`;

const PageTitle = ({ children }) => {
  return (
    <div css={titleStyles}>
      <h3>{children}</h3>
    </div>
  );
};

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
}

export default PageTitle;

