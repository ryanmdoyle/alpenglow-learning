import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { Draggable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import AlertContext from '../context/AlertContext';
import ModalContext from '../context/ModalContext';
import UpdateResourceForm from '../forms/update/UpdateResourceForm'
import { GET_PLAYLIST } from '../../gql/queries';

const item = css`
  border-radius: var(--borderRadius);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.75rem 1rem 0.5rem;
  overflow: hidden;
  box-sizing: border-box;
  transition: box-shadow 0.15s;
  :hover {
    box-shadow: var(--shadowMedium);
    transition: box-shadow 0.15s;
  }
  a {
    margin: 0;
    width: calc(100% - 80px);
    height: 100%;
    color: var(--blueDark);
  }
  a:visited { color: var(--blueMedium);}
  i {
    font-size: 2rem;
  }
  span, small {
    padding-left: 1rem;
  }
  .info {
    display: flex;
    align-items: center;
  }
  .info-text {
    display: flex;
    flex-direction: column;
  }
`;

const controls = css`
  display: flex;
  align-items: center;
  width: 80px;
  i {
    padding-left: 0.3rem;
    font-size: 1.5rem;
    color: var(--blueMedium50);
    transition: color 0.3s;
  }
  .edit:hover {
    color: var(--pink);
    transition: color 0.3s;
  }
  .delete:hover {
    color: var(--red);
    transition: color 0.3s;
  }
`;

const DELETE_RESOURCE = gql`
  mutation DELETE_RESOURCE($resourceId: ID!) {
    deleteResource(resourceId: $resourceId) {
      _id
    }
  }
`;

const PlaylistResourceListItem = ({ resource, index, playlistId }) => {
  const { pathname } = useRouter();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [remove, { data: deleteData }] = useMutation(DELETE_RESOURCE, {
    refetchQueries: [{ query: GET_PLAYLIST, variables: { playlistId: playlistId } }],
    onCompleted: data => {
      alert.success(`Sucessfully deleted!`, 3);
    },
  });

  const icon = (type) => {
    switch (type) {
      case 'Article':
        return 'article'
        break;
      case 'Image':
        return 'image'
        break;
      case 'Practice':
        return 'assignment'
        break;
      case 'Video':
        return 'videocam'
        break;
      case 'Audio':
        return 'mic'
        break;
      default:
        return 'link';
    }
  }

  const removeResource = resourceId => {
    remove({ variables: { resourceId: resourceId } });
  }

  const editResource = resourceId => {
    modal.setChildComponent(
      <UpdateResourceForm
        playlistId={playlistId}
        name={resource.name}
        description={resource.description}
        href={resource.href}
        type={resource.type}
        resourceId={resource._id}
      />
    )
    modal.open();
  }

  return (
    <Draggable draggableId={resource._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <li css={item}>
            <a
              href={`http://${resource.href}`}
              target="_blank"
              referrerPolicy='no-referrer'
              rel='external'
            >
              <div className='info'>
                <i className="material-icons icon">{icon(resource.type)}</i>
                <div className='info-text'>
                  <span>{resource?.name}</span>
                  <small>{resource?.description}</small>
                </div>
              </div>
            </a>
            <div css={controls}>
              <i className="material-icons edit" onClick={() => { editResource(resource._id) }}>create</i>
              <i className="material-icons delete" onClick={() => { removeResource(resource._id) }}>delete</i>
            </div>
          </li>
        </div>
      )
      }
    </Draggable >
  );
};

PlaylistResourceListItem.propTypes = {
  resource: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default PlaylistResourceListItem;



{/* <a
  href={`http://${resource.href}`}
  target="_blank"
  referrerPolicy='no-referrer'
  rel='external'
  css={link}
  onClick={(event) => { console.log(event.target) }}
>
  <li>
    <div className='info'>
      <i className="material-icons icon">{icon(resource.type)}</i>
      <div className='info-text'>
        <span>{resource?.name}</span>
        <small>{resource?.description}</small>
      </div>
    </div>
    {!pathname.startsWith('./students') && (
      <div className='controls'>
        <i className="material-icons edit">create</i>
        <i className="material-icons delete" onClick={() => { removeResource(resource._id) }}>delete</i>
      </div>
    )}
  </li >
</a > */}