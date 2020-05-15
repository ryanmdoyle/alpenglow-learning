import React from 'react';
import { css } from '@emotion/core';

const minus = css`
border: 2px solid var(--blueMedium);
	background-color: white;
	font-size: 0.8rem;
	height: 2.5em;
	width: 2.5em;
	border-radius: 100%;
	position: relative;

  :hover {
    background-color: var(--blueMedium);
    :before {
      background-color: white;
    }
  }
	
	:before {
		content: "";
		display: block;
		background-color: var(--blueMedium);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 0.15em;
		width: 1em;
	}
`;

const MinusButton = (props) => (<div css={minus} {...props}></div>)

export default MinusButton;