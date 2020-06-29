import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

const icon = css`
  position: relative;
  .icon {
    font-size: 1rem;
    position: absolute;
    top: 0.22rem;
    right: 0;
    color: var(--blueLight);
    transition: color 0.5s, transform 0.5s;
    :hover {
      color: var(--blueMedium);
      transition: color 0.5s, transform 0.5s;
      transform: rotate(180deg);
    }
  }
  h5 {
    position: relative;
    ::after {
      position: absolute;
      top: 100%;
      transform: skew(45deg);
      left: 0;
      width: 100%;
      height: 3px;
      background-color: var(--pink50);
      content: '';
      z-index: -100;
    }
  }
`;

const Header5Settings = ({ children, onClick }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');
  return (
    <div css={icon}>
      <h5>{children}</h5>
      {!studentView && (
        <i className="material-icons icon" onClick={onClick}>settings</i>
      )}
    </div>
  );
};

Header5Settings.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Header5Settings;