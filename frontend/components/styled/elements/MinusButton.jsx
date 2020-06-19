import React, { useState } from 'react';
import { css } from '@emotion/core';

const minus = css`
  color: var(--blueMedium);
  font-size: 1.8rem;
  transition: color 0.3s;
  :hover {
    color: var(--pink);
    transition: color 0.3s;
  }
`;

const MinusButton = (props) => {
  const [isHover, toggleHover] = useState(false);

  return (
    <i
      className='material-icons'
      css={minus}
      onClick={props.onClick}
      onMouseEnter={() => { toggleHover(!isHover) }}
      onMouseLeave={() => { toggleHover(!isHover) }}
    >
      {isHover ? 'remove_circle' : 'remove_circle_outline'}
    </i>
  )
};

export default MinusButton;