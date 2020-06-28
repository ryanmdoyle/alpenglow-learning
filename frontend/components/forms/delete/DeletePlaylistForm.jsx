import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core'
import { useRouter } from 'next/router';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { INSTRUCTING_COURSES_QUERY } from '../../../gql/queries';

const DELETE_PLAYLIST = gql`
  mutation DELETE_PLAYLIST(
    $playlistId: String!,
  ) {
    deletePlaylist(
      playlistId: $playlistId,
    ) {
      _id
    }
  }
`;

const DeletePlaylistForm = ({ playlistId, playlistName }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const router = useRouter();

  const [deletePlaylist, { data }] = useMutation(DELETE_PLAYLIST, {
    refetchQueries: [{ query: INSTRUCTING_COURSES_QUERY }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      router.push('/teacher/manage/courses');
      alert.success(`Successfully deleted playlist!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  })

  const onSubmit = data => {
    deletePlaylist({
      variables: {
        playlistId: playlistId,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Delete {playlistName} Playlist</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span css={css`margin: 0rem 0;`}>Enter Playlist name below to confirm deletion.</span>
          <label htmlFor='name'>Type <span css={css`font-style:italic;color: var(--red);`}>{playlistName} </span>below:</label>
          <input type="text" name="name" ref={register({ validate: value => value.toLowerCase() === playlistName.toLowerCase() })} />
          {errors.name && "Playlist name is required"}

          <button type="submit" className='delete'>Delete Playlist</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default DeletePlaylistForm;