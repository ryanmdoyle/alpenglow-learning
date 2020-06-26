import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const icon = css`
  position: relative;
  .icon {
    font-size: 1.2rem;
    position: absolute;
    top: 0.25rem;
    right: 0;
    color: var(--blueLight);
    transition: color 0.5s, transform 0.5s;
    :hover {
      color: var(--blueMedium);
      transition: color 0.5s, transform 0.5s;
      transform: rotate(180deg);
    }
  }
`;

const Header4Settings = ({ children, onClick }) => {
  return (
    <div css={icon}>
      <h4>{children}</h4>
      <i className="material-icons icon" onClick={onClick}>settings</i>
    </div>
  );
};

Header4Settings.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Header4Settings;
export { icon };