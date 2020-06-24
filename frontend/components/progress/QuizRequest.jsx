import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/react-hooks';

import TextButton from '../../components/styled/elements/TextButton';
import { GET_STUDENT_QUIZ_REQUESTS } from '../../pages/teacher/progress/grading';

const requestContainer = css`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: var(--borderRadius);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  :hover, :focus, :active {
    box-shadow: var(--shadowLight);
  }
  span { color: var(--blueDark);}
  small { color: var(--pink);}
`;

const oneWide = css`
  height: 30px;
  width: 210px;
  margin: 0;
  @media (max-width: 750px) {
    width: 150px;
  }
`;

const twoWide = css`
  display: flex;
  align-items: center;
  button {
    height: 30px;
    width: 100px;
    margin: 0;
  }
  button:last-of-type {
    margin: 0 0 0 10px;
  }
  @media (max-width: 750px) {
    button { width: 70px; }
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
        <span>{name}</span>
        <span css={css`margin-left: 1rem;color: var(--blueMedium);`}><small>{playlist}</small></span>
        <span>{approved}</span>
      </div>
      <div>
        {approved ?
          <TextButton onClick={cancel} css={[oneWide, css`:hover{background-color: var(--red);border-color: var(--red);}`]}>Cancel Quiz Approval</TextButton>
          :
          <div css={twoWide}>
            <TextButton onClick={approve}
              css={css`:hover{background-color: var(--green);border-color: var(--green);}`}
            >Approve</TextButton>
            <TextButton onClick={deny}
              css={css`:hover{background-color: var(--red);border-color: var(--red);}`}
            >Deny</TextButton>
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