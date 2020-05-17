import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
`;

const NavSectionHeader = ({ title }) => {
  return (
    <h5 css={navSectionHeader}>{title}</h5>
  );
};

NavSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavSectionHeader;