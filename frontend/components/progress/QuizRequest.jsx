import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/client';

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
  i {
    color: var(--pink);
    margin-right: 0.25rem;
  }
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

const APPROVE_ONLINE_QUIZ_REQUEST = gql`
  mutation APPROVE_ONLINE_QUIZ_REQUEST($requestId: ID!) {
    approveRequest(requestId: $requestId) {
      _id
    }
  }
`;

const APPROVE_PAPER_QUIZ_REQUEST = gql`
  mutation APPROVE_PAPER_QUIZ_REQUEST(
    $playlistId: ID!,
    $requestId: ID!,
  ) {
    createScore(playlistId: $playlistId) {
      _id
    }
    deleteRequest(requestId: $requestId)
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

const QuizRequest = ({ requestId, name, playlistId, playlistName, approved, approvalAccepted, type }) => {
  const [approvePaper, { data: approvePaperData }] = useMutation(APPROVE_PAPER_QUIZ_REQUEST, {
    variables: { 
      playlistId: playlistId,
      requestId: requestId,
     },
    refetchQueries: [{ query: GET_STUDENT_REQS_AND_PENDING_SCORES }],
  })
  const [approveOnline, { data: approveOnlineData }] = useMutation(APPROVE_ONLINE_QUIZ_REQUEST, {
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

  const icon = (type) => {
    switch (type) {
      case 'EXTERNAL':
        return 'link'
        break;
      case 'PAPER':
        return 'article'
        break;
      default:
        return 'link';
    }
  }

  const handleApproval = (type) => {
    if (type == "EXTERNAL") {
      approveOnline();
    }
    if (type == "PAPER") {
      approvePaper();
    }
  }

  return (
    <div css={requestContainer}>
      <div>
        <span>{name}</span><br></br>
        <div css={css`display: flex; align-items: center;`}>
          <i className="material-icons icon">{icon(type)}</i>
          <span><small>{playlistName}</small></span>
        </div>
      </div>
      <div>
        {approved ?
          <CancelButton approvalAccepted={approvalAccepted} cancel={cancel} deny={deny} />
          :
          <div css={twoWide}>
            <TextButton onClick={() => {handleApproval(type)}}
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
  id: PropTypes.string,
  name: PropTypes.string,
  playlist: PropTypes.string,
  type: PropTypes.string,
  approved: PropTypes.bool,
  approvalAccepted: PropTypes.bool,
}

export default QuizRequest;