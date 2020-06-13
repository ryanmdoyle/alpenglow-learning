import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/react-hooks';

import TextButton from '../../components/styled/elements/TextButton';
import { GET_STUDENT_QUIZ_REQUESTS } from '../../pages/teacher/progress/grading';

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

const APPROVE_QUIZ_REQUEST = gql`
  mutation APPROVE_QUIZ_REQUEST($playlistId: ID!) {
    approveRequest(playlistId: $playlistId) {
      _id
    }
  }
`;

const CANCEL_APPROVE_QUIZ_REQUEST = gql`
  mutation CANCEL_APPROVE_QUIZ_REQUEST($playlistId: ID!) {
    cancelRequest(playlistId: $playlistId) {
      _id
    }
  }
`;

const DENY_QUIZ_REQUEST = gql`
  mutation DENY_QUIZ_REQUEST($playlistId: ID!) {
    deleteRequest(playlistId: $playlistId)
  }
`;

const QuizRequest = ({ id, name, playlist, approved, approvalAccepted }) => {
  const [approve, { data: approveData }] = useMutation(APPROVE_QUIZ_REQUEST, {
    variables: { playlistId: id },
    refetchQueries: [{ query: GET_STUDENT_QUIZ_REQUESTS }],
  })
  const [deny, { data: denyData }] = useMutation(DENY_QUIZ_REQUEST, {
    variables: { playlistId: id },
    refetchQueries: [{ query: GET_STUDENT_QUIZ_REQUESTS }],
  })
  const [cancel, { data: cancelData }] = useMutation(CANCEL_APPROVE_QUIZ_REQUEST, {
    variables: { playlistId: id },
    refetchQueries: [{ query: GET_STUDENT_QUIZ_REQUESTS }],
  })

  return (
    <div css={requestContainer}>
      <div>
        <span><strong>{name}</strong></span>
        <span css={css`margin-left: 1rem;color: var(--blueMedium);`}><small>{playlist}</small></span>
        <span>{approved}</span>
      </div>
      <div>
        {approved ?
          <TextButton onClick={cancel} css={css`height: 30px; width: 210px; margin: 0;`}>Cancel Quiz Approval</TextButton>
          :
          <div css={css`display: flex; align-items: center;`}>
            <TextButton onClick={approve} css={css`height: 30px; width: 100px; margin: 0;`}>Approve</TextButton>
            <TextButton onClick={deny} css={css`height: 30px; width: 100px; margin: 0 0 0 10px;`}>Deny</TextButton>
          </div>
        }
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