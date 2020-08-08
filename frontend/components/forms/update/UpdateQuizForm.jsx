import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';

import Loading from '../../Loading';
import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import { GET_QUIZ_FOR_PLAYLIST } from '../../../gql/queries';

const UPDATE_QUIZ = gql`
  mutation UPDATE_QUIZ(
    $playlistId: ID!,
    $type: String!,
    $externalLink: String,
    $externalResponsesLink: String,
    $possibleScore: Int,
  ) {
    updateQuiz(
      playlistId: $playlistId,
      type: $type,
      externalLink: $externalLink,
      externalResponsesLink: $externalResponsesLink,
      possibleScore: $possibleScore,
    ) {
      _id
    }
  }
`;

const UpdateQuizForm = ({ playlistId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [quizType, setQuizType] = useState(null);
  const alert = useContext(AlertContext)
  const modal = useContext(ModalContext);

  const { data: queryData, loading, error } = useQuery(GET_QUIZ_FOR_PLAYLIST, {
    variables: { playlistId: playlistId },
    onCompleted: () => {
      // updates state for the form once the quiz info is fetched
      setQuizType(queryData.getQuizForPlaylist.type)
    }
  })

  const [updateQuiz, { data }] = useMutation(UPDATE_QUIZ, {
    refetchQueries: [{ query: GET_QUIZ_FOR_PLAYLIST, variables: { playlistId: playlistId } }],
    onCompleted: data => {
      reset();
      modal.close();
      alert.success(`Successfully updated quiz!`, 3);
    },
    onError: (error) => {
      alert.error('Sorry, there was a problem updating the quiz.');
    }
  });

  const onSubmit = data => {
    const possibleScore = data.possibleScore == '' ? null : parseInt(data.possibleScore);
    updateQuiz({
      variables: {
        playlistId: playlistId,
        type: data.type || "EXTERNAL",
        externalLink: data.externalLink,
        externalResponsesLink: data.externalResponsesLink,
        possibleScore: possibleScore,
      }
    })
  };

  if (loading) return <Loading />;
  return (
    <PagePadding>
      <h4>Manage Quiz</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor='type'>Quiz Type <small><em>required</em></small></label>
          <select name='type' ref={register({ required: true })} onChange={(event) => (setQuizType(event.target.value))} defaultValue={queryData?.getQuizForPlaylist?.type}>
            <option value='EXTERNAL' key='EXTERNAL'>Google Form Quiz</option>
            {/* <option value='CREATED' key='CREATED'>Created</option> */}
            <option value='PAPER' key='PAPER'>Paper/Physical Assessment</option>
          </select>
          {errors.type && 'Type of quiz is required!'}

          {quizType === 'EXTERNAL' && (
            <>
              <label htmlFor='externalLink'>Link to Quiz <small><em>required</em></small></label>
              <input type="text" name="externalLink" defaultValue={queryData?.getQuizForPlaylist?.externalLink} ref={register({ required: quizType === 'EXTERNAL' })} />
              {errors.externalLink && 'A link to an external quiz is required in order for students to assess this playlist.'}

              <label htmlFor='externalResponsesLink'>Link to Quiz Responses</label>
              <small><em>Placing a link to the quiz responses (either the form or Google sheet) will add the link to the pending scores for easy access.</em></small>
              <input type="text" name="externalResponsesLink" defaultValue={queryData?.getQuizForPlaylist?.externalResponsesLink} ref={register()} />
            </>
          )}

          <label htmlFor='possibleScore'>Possible Score (Highest Points Possible)</label>
          <small><em>If needed, you can change this when you enter a students final score.</em></small>
          <input type='number' name='possibleScore' defaultValue={queryData?.getQuizForPlaylist?.possibleScore} ref={register()} />
          {errors.possibleScore && 'The possible score must be a interger value.'}

          <button type='submit'>Save Quiz</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

UpdateQuizForm.propTypes = {
  playlistId: PropTypes.string.isRequired,
}

export default UpdateQuizForm;