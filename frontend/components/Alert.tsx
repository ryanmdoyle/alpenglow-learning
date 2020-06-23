import React from 'react';
import { css } from '@emotion/core';

import AlertContext from './context/AlertContext';
import { AlertStatus } from '../lib/enums';

const coreStyle = css`
  position: fixed;
  bottom: 0;
  width: calc(100% - var(--navWidth));
  padding: 1rem 1rem;
  background-color: var(--blueLight);
  color: var(--blueMedium);
  box-shadow: 10px 10px 8px 10px #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p { margin: 0;}
  i { font-size: 2rem;}
`;

const errorStyle = css`
  border: 1px solid var(--red);
  background-color: var(--pink);
  color: var(--red);
  button {
    color: var(--red);
    border: 1px solid var(--red);
    :hover {
      background-color: var(--red);
    }
  }
  i { color: var(--red);}
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

const text = css`
  display: flex;
  align-items: center;
`;

const Alert = () => {
  return (
    <AlertContext.Consumer>
      {(context) => {
        const { alert, clear, alertText } = context;
        if (alert !== AlertStatus.None) {
          return (
            <div css={(alert === AlertStatus.Success) ? [coreStyle] : [coreStyle, errorStyle]} >
              <div css={text}>
                {alert === AlertStatus.Success ?
                  <i className='material-icons'>check_circle</i>
                  :
                  <i className='material-icons error'>error</i>
                }
                <span>
                  {alertText}
                </span>
              </div>
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