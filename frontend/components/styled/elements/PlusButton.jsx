import React from 'react';
import { css } from '@emotion/core';

const plus = css`
	border: 2px solid var(--blueMedium);
	background-color: white;
	font-size: 0.8rem;
	height: 2.5em;
	width: 2.5em;
	border-radius: 100%;
	position: relative;

  :hover {
    background-color: var(--blueMedium);
    :after, :before {
      background-color: white;
    }
  }
	
	:after,
	:before {
		content: "";
		display: block;
		background-color: var(--blueMedium);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	:before {
		height: 1em;
		width: 0.15em;
	}

	:after {
		height: 0.15em;
		width: 1em;
	}
`;

const PlusButton = (props) => (<div css={plus} {...props}></div>);

export default PlusButton;