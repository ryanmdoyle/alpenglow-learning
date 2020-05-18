import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const classRow = css`
  width: 100%;
  padding: 0.2rem 1rem;
  border-radius: var(--borderRadius);
  border: 1px solid white;
  display: flex;
  align-items: center;
  :hover, :focus, :active {
    border: 1px solid var(--blueMedium);
    box-shadow: var(--shadowLight);
  }

  h5, p {
    margin: 0.25rem;
    line-height: 3rem;
    padding: 0;
    color: var(--blueMedium);
    flex-basis: 50%;
  }

  p {
    margin-left: 2rem;
    flex-basis: 25%;
    text-align: right;
  }
`;

const classRowHeader = css`
  width: 100%;
  padding: 0.2rem 1rem;
  border-bottom: 1px solid var(--blueMedium);
  display: flex;
  p {
    margin: 0.25rem;
    line-height: 1rem;
    padding: 0;
    color: var(--blueMedium);
  }
  .name{ 
    flex-basis: 50%;
  }
  .column {
    margin-left: 2rem;
    flex-shrink: 10;
    flex-basis: 25%;
    text-align: right;
  }
`;

const ClassInfo = ({ classData }) => {
  const { _id, name, enrollId, enrolled } = classData;
  return (
    <div css={classRow}>
      <h5>{name}</h5>
      <p>{enrollId}</p>
      <p>{enrolled.length}</p>
    </div>
  );
};

const ClassInfoHeader = () => {
  return (
    <div css={classRowHeader}>
      <p className='name'>Class Name</p>
      <p className='column'>Enroll Id</p>
      <p className='column'>Students Enrolled</p>
    </div>
  );
}

ClassInfo.propTypes = {
  classData: PropTypes.node.isRequired,
}

export default ClassInfo;
export { ClassInfoHeader };