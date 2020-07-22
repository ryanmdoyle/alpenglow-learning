import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const styles = css`
  display: flex;
  width: 100%;
  height: 60px;
  border-top: 1px solid var(--blueMedium);
  color: var(--blueDark);
  font-weight: 700;

  .child {
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--pink);
    border-right: 1px solid var(--pink);
    overflow: hidden;
    :after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height:5px;
        background-color: var(--pink);
        transform-origin: bottom left;
        transform: translateY(100%);
        transition: transform 0.2s;
      }
    :hover, :focus {
      background-color: var(--pink25);
      :after {
        transform: translateY(0%);
        transition: transform 0.2s;
      }
    }
    :last-child {
      border-right: none;
    }
  }

  .currentForm:after {
    content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height:5px;
        background-color: var(--pink);
        transform-origin: bottom left;
        transform: translateY(0%);
        transition: transform 0.2s;
  }
`;

const CreateContentNav = ({ currentForm, changeForm }) => {

  const isActive = (formToMatch, current) => {
    return (formToMatch === current) ? 'child currentForm' : 'child';
  }

  return (
    <div css={styles}>
      <div className={isActive('course', currentForm)} onClick={() => { changeForm("course") }}>Course</div>
      <div className={isActive('playlist', currentForm)} onClick={() => { changeForm("playlist") }}>Playlist</div>
      <div className={isActive('objective', currentForm)} onClick={() => { changeForm("objective") }} >Objective</div>
      <div className={isActive('question', currentForm)} onClick={() => { changeForm("question") }}>Question</div>
    </div >
  );
};

CreateContentNav.proptypes = {
  changeForm: PropTypes.func.isRequired,
  currentForm: PropTypes.string.isRequired,
}

export default CreateContentNav;