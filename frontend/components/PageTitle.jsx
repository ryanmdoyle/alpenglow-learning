import React from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/core';

const titleStyles = css`
  width: 100%;
  min-height: 75px;
  padding: 1.2rem 2rem;
  background-color: var(--blueLight);
  h3 {
    margin: 0;
    padding: 0rem 0;
  }
  span {
    color: var(--blueMedium);
  }
`;

const PageTitle = ({ children, subtitle }) => {
  const capitalizedSubtitle = subtitle ? subtitle[0] + subtitle.slice(1).toLowerCase() : null;
  return (
    <div css={titleStyles}>
      <h3>{children}</h3>
      {capitalizedSubtitle &&
        <span>{capitalizedSubtitle} Playlist</span>
      }
    </div>
  );
};

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default PageTitle;

