import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/react-hooks';

import TextButton from '../../components/styled/elements/TextButton';

const requestContainer = css`
  width: 100%;
  /* box-shadow: var(--shadowLight); */
  padding: 0.5rem 1rem;
  border-radius: var(--borderRadius);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  :hover {
    box-shadow: var(--shadowLight);
  }
`;

const DENY_QUIZ_REQUEST = gql`
  mutation DENY_QUIZ_REQUEST($playlistId: ID) {
    deleteRequest(playlistId: $playlistId) {
      _id
    }
  }
`;

const QuizRequest = ({ id, name, playlist, approved, approvalAccepted }) => {
  const [deny, { data }] = useMutation(DENY_QUIZ_REQUEST, {
    variables: { playlistId: id }
  })

  return (
    <div css={requestContainer}>
      <div>
        <span><strong>{name}</strong></span>
        <span css={css`margin-left: 1rem;color: var(--blueMedium);`}><small>{playlist}</small></span>
      </div>
      <div>
        <TextButton css={css`height: 30px; width: 100px; margin: 0;`}>Approve</TextButton>
        <TextButton css={css`height: 30px; width: 100px; margin: 0 10px;`}>Deny</TextButton>
      </div>
    </div>
  );
};

QuizRequest.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  playlist: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired,
  approvalAccepted: PropTypes.bool.isRequired,
}

export default QuizRequest;