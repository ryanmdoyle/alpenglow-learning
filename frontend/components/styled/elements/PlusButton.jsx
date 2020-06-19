import React, { useState } from 'react';
import { css } from '@emotion/core';

const plus = css`
  color: var(--blueMedium);
  font-size: 1.8rem;
  transition: color 0.3s;
  :hover {
    color: var(--pink);
    transition: color 0.3s;
  }
`;

const PlusButton = (props) => {
  const [isHover, toggleHover] = useState(false);

  return (
    <i
      className='material-icons'
      css={plus}
      onClick={props.onClick}
      onMouseEnter={() => { toggleHover(!isHover) }}
      onMouseLeave={() => { toggleHover(!isHover) }}
    >
      {isHover ? 'add_circle' : 'add_circle_outline'}
    </i>
  )
};

export default PlusButton;