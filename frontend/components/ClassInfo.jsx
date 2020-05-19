import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const classTable = css`
  width: 100%;
  border-radius: var(--borderRadius);
  border: 1px solid rgba(1, 1, 1, 0);
  display: flex;
  align-items: center;
  p {
    flex: 0 1 25%;
    text-align: right;
  }
  .name {
    flex: 1 0 50%;
    text-align: left;
  }
`;

const row = css`
  padding: 0.2rem 1rem;
  :hover, :focus, :active {
      border: 1px solid var(--blueMedium);
      box-shadow: var(--shadowLight);
      text-align: left;
  }
`;

const header = css`
  padding: 0rem 1rem;
  font-size: 0.85rem;
  line-height: 0.5rem;
  border-radius: 0;
`;

const firstDivBorder = css`
  div:nth-of-type(2) {
    border-top: 1px solid var(--blueMedium50);
    border-radius: 0;
    :hover {
      border-radius: var(--borderRadius);
      border: 1px solid var(--blueMedium);
      box-shadow: var(--shadowLight);
    }
  }
`;

const ClassTable = ({ classData }) => {

  return (
    <div css={firstDivBorder}>
      <ClassTableHeader />
      {classData.map(c => {
        return (
          <div css={[classTable, row]} key={c._id}>
            <p className='name'>{c.name}</p>
            <p>{c.enrollId}</p>
            <p>{c.enrolled.length}</p>
          </div>
        )
      })}
    </div>
  );
};

const ClassTableHeader = () => {
  return (
    <div css={[classTable, header]}>
      <p className='name'>Class Name</p>
      <p>Enroll ID</p>
      <p>Students Enrolled</p>
    </div>
  )
}

ClassTable.propTypes = {
  classData: PropTypes.array.isRequired,
}

export default ClassTable;
export { ClassTableHeader };