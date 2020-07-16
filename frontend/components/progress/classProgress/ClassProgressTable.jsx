import React from 'react';
import { css } from '@emotion/core';

import PercentScoreRectangle from '../../styled/elements/PercentScoreRectangle';

const tableWrapper = css`
  position: relative;
	overflow-y: scroll;
  white-space: nowrap;
  width: 100%;
  padding-top: 3rem;

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }
  
  td {
    min-width: 120px;
    padding: 0.5rem;
    word-wrap: normal;
  }

  th {
    /* transform: rotate(-10deg); */
    max-width: 200px;
    max-height: 50px;
    /* height: 3rem; */
    color: var(--pink);
    border-bottom: 1px solid var(--pink);
    padding: 0.5rem 0.25rem;
    margin-bottom: 0.25rem;
    word-wrap: normal;
    white-space: normal;
  }

  th:first-of-type, td:first-of-type {
    transform: rotate(0deg);
    background-color: white;
    position: sticky;
    position: -webkit-sticky;    
    min-width: 200px;
    left: 0;    
    padding-left: 0;
    margin-left: 1px;
    font-weight: bold;
  }

  th:first-of-type { 
    background-color: white;
    z-index: 1;
  }

  td:first-of-type {
    /* background-color: #DDE6F9; */
    padding-left: 1rem;
  }

  tr:nth-child(even) {
    /* background-color: var(--blueLight50); */
  }

  small {
    display: block;
    height: 50px;
    width: 100%;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
  }

  .score {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ClassProgressTable = () => {
  return (
    <div css={tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>
              <small title='playlist'>Playlist 1</small>
            </th>
            <th>
              <small title='playlist'>Playlist 2</small>
            </th>
            <th>
              <small title='playlist'>Playlist 3</small>
            </th>
            <th>
              <small title='playlist'>Playlist 4</small>
            </th>
            <th>
              <small title='playlist'>Playlist 5</small>
            </th>
            <th>
              <small title='playlist'>Playlist 6</small>
            </th>
            <th>
              <small title='playlist'>Playlist 7</small>
            </th>
            <th>
              <small title='playlist'>Playlist 8</small>
            </th>
            <th>
              <small title='playlist'>Playlist 9</small>
            </th>
            <th>
              <small title='playlist'>Playlist 10</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ryan</td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={65} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={85} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={95} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={75} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={55} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={100} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={99} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={85} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={75} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={95} />
              </div>
            </td>
          </tr>
          <tr>
            <td>Alissa</td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={95} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={95} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={95} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={75} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={85} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={100} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={55} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={71} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={90} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={93} />
              </div>
            </td>
          </tr>
          <tr>
            <td className='fixed-col first-col'>Brynlee</td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={100} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={96} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={93} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={95} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={96} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={93} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={76} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={85} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={99} />
              </div>
            </td>
            <td>
              <div className='score'>
                <PercentScoreRectangle percent={75} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClassProgressTable;