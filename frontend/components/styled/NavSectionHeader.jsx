import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
`;

const NavSectionHeader = ({ title }) => {
  return (
    <span css={navSectionHeader}>{title}</span>
  );
};

NavSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavSectionHeader;