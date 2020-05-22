import React from 'react';
import { css } from '@emotion/core';

import AlertContext from './context/AlertContext';
import { AlertStatus } from '../lib/enums';

const coreStyle = css`
  position: absolute;
  bottom: 0;
  width: calc(100% - 2rem);
  margin: 1rem;
  padding: 0 1rem;
  border-radius: 2px;
  background-color: var(--blueLight);
  color: var(--blueMedium);
  border: 1px solid var(--blueMedium);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const errorStyle = css`
  border: 1px solid var(--red);
  background-color: var(--pink);
  box-shadow: var(--shadowHeavy); 
  color: var(--red);
  button {
    color: var(--red);
    border: 1px solid var(--red);
    :hover {
      background-color: var(--red);
    }
  }
`;

const dismissStyle = css`
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--blueMedium);
  color: var(--blueMedium);
  border-radius: 2px;
  padding: 0 1rem;
  :hover {
    background-color: var(--blueMedium);
    color: white;
  }
`

const Alert = () => {
  return (
    <AlertContext.Consumer>
      {(context) => {
        const { alert, clear, alertText } = context;
        if (alert !== AlertStatus.None) {
          return (
            <div css={(alert === AlertStatus.Success) ? [coreStyle] : [coreStyle, errorStyle]} >
              <p>{alert === AlertStatus.Success ? <span>✅ </span> : <span>🛑 </span>}{alertText}</p>
              <button css={dismissStyle} onClick={() => (clear())}>Dismiss</button>
            </div>
          )
        } else {
          return null;
        }
      }}
    </AlertContext.Consumer>
  );
};

export default Alert;