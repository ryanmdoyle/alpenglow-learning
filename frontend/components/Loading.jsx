import React from 'react';
import { css } from '@emotion/core';

//spinner from W3Schools
const outerSpinner = css`
    position: absolute;
    border: 16px solid rgba(0, 0, 0, 0);
    border-top: 16px solid var(--blueMedium);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const innerSpinner = css`
    position: absolute;
    border: 16px solid var(--pink);
    border-top: 16px solid rgba(0, 0, 0, 0);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spinRev 0.75s linear infinite;

  @keyframes spinRev {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
`;

const spinners = css`
  position: relative;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <div css={spinners}>
      <div css={outerSpinner}></div>
      <div css={innerSpinner}></div>
    </div>
  );
};

export default Loading;