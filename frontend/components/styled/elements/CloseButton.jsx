import React from 'react';
import { css } from '@emotion/core';

const X = css`
	border: 2px solid var(--blueMedium);
	background-color: white;
	font-size: 0.8rem;
	height: 2.5em;
	width: 2.5em;
	border-radius: 100%;
	position: relative;
  transform: rotate(-45deg);

  :hover {
    background-color: var(--blueMedium);
    :after, :before {
      background-color: white;
      transition: transform 0.3s;
    }
    :before {
      transform: translate(-300%, -50%);
      height: 0.7rem;
    }
    :after {
      transform: translate(-50%, -300%);
      width: 0.7rem;
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
    transition: transform 0.3s;
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

const CloseButton = (props) => (<div css={X} {...props}></div>);

export default CloseButton;