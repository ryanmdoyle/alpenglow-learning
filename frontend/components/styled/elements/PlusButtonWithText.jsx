import React, { useState } from 'react';
import { css } from '@emotion/core';

import { plus } from './PlusButton';

const style = css`
  min-width: 3rem;
  display: flex;
  align-items:center;
  padding-left: 1rem;
  p {
    margin: 0;
    padding-left:0.5rem;
    color: var(--blueMedium);
    transition: color 0.3s;
  }
  :hover {
    p, i {
      color: var(--pink);
      transition: color 0.3s;
      }
  }
`;

const PlusButtonWithText = ({ children, onClick, ...props }) => {
  const [isHover, toggleHover] = useState(false);

  return (
    <div
      css={style}
      onClick={onClick}
      onMouseEnter={() => { toggleHover(!isHover) }}
      onMouseLeave={() => { toggleHover(!isHover) }}
      {...props}
    >
      <i
        className='material-icons'
        css={plus}
        onClick={props.onClick}
      >
        {isHover ? 'add_circle' : 'add_circle_outline'}
      </i>
      <p>{children}</p>
    </div>
  )
};

export default PlusButtonWithText;