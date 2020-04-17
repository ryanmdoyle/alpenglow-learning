import React from 'react';
import { css } from '@emotion/core';

import AlertContext from './context/AlertContext';

const alertCore = css`
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

const error = css`
  border: 1px solid var(--red);
  background-color: var(--pink50);
  color: var(--red);
  button {
    color: var(--red);
    border: 1px solid var(--red);
    :hover {
      background-color: var(--red);
    }
  }
`;

const dismiss = css`
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

const Alert = ({ status }) => {
  // const statusStyle = (status === 'success') ? [alertCore] : [alertCore, error];  // within div css to build
  return (
    <AlertContext.Consumer>
      {(context) => {
        const { alert, alertStatus, alertText, setAlert, setAlertStatus, setAlertText } = context;
        if (alert) {
          return (
            <div css={(alertStatus === 'success') ? [alertCore] : [alertCore, error]} >
              <p>{alertStatus === 'success' ? <span>✅ </span> : <span>🛑 </span>}{alertText}</p>
              <button css={dismiss} onClick={() => (setAlert(false), setAlertStatus('success'))}>Dismiss</button>
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