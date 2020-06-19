import React, { useState } from 'react';
import { css } from '@emotion/core';

const close = css`
  color: var(--blueMedium);
  font-size: 1.8rem;
  transition: color 0.3s;
  :hover span {
    display: none;
  }
  :hover {
    content: 'add_circle';
    color: var(--pink);
    transition: color 0.3s;
  }
`;

const CloseButton = (props) => {
	const [isHover, toggleHover] = useState(false);

	return (
		<i
			className='material-icons'
			css={close}
			onClick={props.onClick}
		>
			cancel
		</i>
	)
};

export default CloseButton;