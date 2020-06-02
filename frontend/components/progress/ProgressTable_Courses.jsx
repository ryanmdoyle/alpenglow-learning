import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import ProgressBox_Course from './ProgressBox_Course';

const tableStyles = css`
  width: 100%;
  padding: 1rem;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid var(--blueMedium);
  }

  thead > tr > th {
    text-align: center;
    font-family: var(--headerFontFamily);
    font-size: 1.2rem;
    color: var(--blueMedium);
    padding: 1rem 0 0.5rem 0;
  }

  thead > tr > th:first-of-type {
    text-align: left;
  }
  
  tbody > tr > th {
    text-align: left;
    font-family: var(--headerFontFamily);
    font-size: 0.9rem;
    vertical-align: center;
    padding: 1rem 0;
  }
  
  tbody > tr > td {
    text-align: center;
    padding: 1rem 0;
  }
`;

const ProgressTable_Courses = ({ courses, students }) => {
  return (
    <table css={tableStyles}>
      <thead>
        <tr>
          <th scope='col'>Student</th>
          <th scope='col'>Course 1</th>
          <th scope='col'>Course 2</th>
          <th scope='col'>Course 3</th>
          <th scope='col'>Course 4</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
        <tr>
          <th scope='row'>Student Name</th>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
          <td><ProgressBox_Course /></td>
        </tr>
      </tbody>

    </table>
  );
};

ProgressTable_Courses.proptypes = {
  courses: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
}

export default ProgressTable_Courses;