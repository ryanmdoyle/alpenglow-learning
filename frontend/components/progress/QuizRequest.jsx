import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/react-hooks';

import TextButton from '../../components/styled/elements/TextButton';
import { GET_STUDENT_REQS_AND_PENDING_SCORES } from '../../pages/teacher/progress/grading';

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
  width: 170px;
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
    width: 80px;
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
  mutation APPROVE_QUIZ_REQUEST($requestId: ID!) {
    approveRequest(requestId: $requestId) {
      _id
    }
  }
`;

const CANCEL_APPROVE_QUIZ_REQUEST = gql`
  mutation CANCEL_APPROVE_QUIZ_REQUEST($requestId: ID!) {
    cancelRequest(requestId: $requestId) {
      _id
    }
  }
`;

const DENY_QUIZ_REQUEST = gql`
  mutation DENY_QUIZ_REQUEST($requestId: ID!) {
    deleteRequest(requestId: $requestId)
  }
`;

const QuizRequest = ({ requestId, name, playlistName, approved, approvalAccepted }) => {
  const [approve, { data: approveData }] = useMutation(APPROVE_QUIZ_REQUEST, {
    variables: { requestId: requestId },
    refetchQueries: [{ query: GET_STUDENT_REQS_AND_PENDING_SCORES }],
  })
  const [deny, { data: denyData }] = useMutation(DENY_QUIZ_REQUEST, {
    variables: { requestId: requestId },
    refetchQueries: [{ query: GET_STUDENT_REQS_AND_PENDING_SCORES }],
  })
  const [cancel, { data: cancelData }] = useMutation(CANCEL_APPROVE_QUIZ_REQUEST, {
    variables: { requestId: requestId },
    refetchQueries: [{ query: GET_STUDENT_REQS_AND_PENDING_SCORES }],
  })

  return (
    <div css={requestContainer}>
      <div>
        <span>{name}</span>
        <span css={css`margin-left: 1rem;color: var(--blueMedium);`}><small>{playlistName}</small></span>
        <span>{approved}</span>
      </div>
      <div>
        {approved ?
          <CancelButton approvalAccepted={approvalAccepted} cancel={cancel} deny={deny} />
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
    </div >
  );
};

const CancelButton = ({ approvalAccepted, cancel, deny }) => {
  if (approvalAccepted) {
    return <TextButton onClick={deny} css={[oneWide, css`:hover{background-color: var(--red);border-color: var(--red);}`]}>Stop Quiz</TextButton>
  }
  return <TextButton onClick={cancel} css={[oneWide, css`:hover{background-color: var(--red);border-color: var(--red);}`]}>Cancel Quiz Approval</TextButton>
}

QuizRequest.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  playlist: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired,
  approvalAccepted: PropTypes.bool.isRequired,
}

export default QuizRequest;