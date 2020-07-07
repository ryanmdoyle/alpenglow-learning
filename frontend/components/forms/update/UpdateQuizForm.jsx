import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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
    $externalLink: String!,
  ) {
    updateQuiz(
      playlistId: $playlistId,
      type: $type,
      externalLink: $externalLink,
    ) {
      _id
    }
  }
`;

const UpdateQuizForm = ({ playlistId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const alert = useContext(AlertContext)
  const modal = useContext(ModalContext);

  const { data: queryData, loading, error } = useQuery(GET_QUIZ_FOR_PLAYLIST, {
    variables: { playlistId: playlistId }
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
    updateQuiz({
      variables: {
        playlistId: playlistId,
        type: data.type || "EXTERNAL",
        externalLink: data.externalLink,
      }
    })
  };

  if (loading) return <Loading />;
  return (
    <PagePadding>
      <h4>Create Quiz</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* <label htmlFor='type'>Quiz Type*</label>
          <select name='type' ref={register({ required: true })}>
            <option value='EXTERNAL' key='EXTERNAL'>External</option>
            <option value='CREATED' key='CREATED'>Created</option>
          </select>
          {errors.type && 'Type of quiz is required!'} */}

          <label htmlFor='externalLink'>Link to Quiz*</label>
          <input type="text" name="externalLink" defaultValue={queryData?.getQuizForPlaylist?.externalLink} ref={register({ required: true })} />
          {errors.externalLink && 'A link to an external quiz is required in order for students to assess this playlist.'}

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