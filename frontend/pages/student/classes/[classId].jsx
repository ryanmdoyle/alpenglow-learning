import React, { useContext } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';

import PageTitle from '../../../components/styled/PageTitle';
import PagePadding from '../../../components/styled/PagePadding';
import Loading from '../../../components/Loading';
import AlertContext from '../../../components/context/AlertContext';
import ModalContext from '../../../components/context/ModalContext';
import CreateTaskForm from '../../../components/forms/create/CreateTaskForm';
import PlusButtonWithText from '../../../components/styled/elements/PlusButtonWithText';
import PercentScoreRectangle from '../../../components/styled/elements/PercentScoreRectangle';
import CourseTimelines from '../../../components/courses/CourseTimelines';
import { GET_STUDENT_CLASS } from '../../../gql/queries';

const doubleHeader = css`
  display: flex;
  div {
    width: 49%;
    padding-right: 1%; 
  }
`;

const removeTask = css`
  :hover {
    color: var(--red);
    text-decoration: line-through;
  }
`;

const list = css`
  list-style: none;
  padding: 0;
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    :hover {
      box-shadow: var(--shadowMedium);
    }
    .scores {
      display: flex;
      span {
        width: 80px;
        margin-right: 1rem;
      }
    }
  }
`;

const REMOVE_TASK = gql`
  mutation REMOVE_TASK($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
    }
  }
`;

const GET_COURSE_OF_CLASS = gql`
  query GET_COURSE_OF_CLASS($classId: ID!) {
    getCourseOfClass(classId: $classId) {
      _id
      name
      subject
      essentialPlaylists {
        _id
        name
        type
      }
      corePlaylists {
        _id
        name
        type
      }
      challengePlaylists {
        _id
        name
        type
      }
    }
  }
`;

const GET_STUDENT_CLASS_SCORES = gql`
  query GET_STUDENT_CLASS_SCORES($classId: ID!) {
    getScoresForEnrolledClass(classId: $classId) {
      _id
      score
      possibleScore
      timeScored
      playlist {
        _id
        name
      }
    }
  }
`;

const studentClass = () => {
  const router = useRouter();
  const { classId } = router.query;
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const { loading: courseLoading, data: courseData } = useQuery(GET_COURSE_OF_CLASS, {
    variables: { classId: classId },
  })

  const { loading, error, data } = useQuery(GET_STUDENT_CLASS, {
    variables: { classId: classId },
  })

  const { data: scoreData } = useQuery(GET_STUDENT_CLASS_SCORES, {
    variables: { classId: classId },
  })

  const [deleteTask, { data: removeTaskData }] = useMutation(REMOVE_TASK, {
    refetchQueries: [{ query: GET_STUDENT_CLASS, variables: { classId: classId } }],
  });

  const handleTaskRemove = (taskId) => {
    deleteTask({
      variables: { taskId: taskId }
    })
  }

  const addGoal = () => {
    modal.setChildComponent(
      <CreateTaskForm
        classId={classId}
        taskType='Goal'
      />
    )
    modal.open();
  }

  const addTodo = () => {
    modal.setChildComponent(
      <CreateTaskForm
        classId={classId}
        taskType='Todo'
      />
    )
    modal.open();
  }
  const course = courseData?.getCourseOfClass;
  const essential = courseData?.getCourseOfClass?.essentialPlaylists.map(playlist => {
    playlist.best = null;
    scoreData?.getScoresForEnrolledClass.forEach(score => {
      if (score.playlist._id === playlist._id) {
        const percent = parseInt(score.score / score.possibleScore * 100);
        if (percent > playlist.best) { playlist.best = percent }
      }
    })
    return playlist;
  })
  const core = courseData?.getCourseOfClass?.corePlaylists.map(playlist => {
    playlist.best = null;
    scoreData?.getScoresForEnrolledClass.forEach(score => {
      if (score.playlist._id === playlist._id) {
        const percent = parseInt(score.score / score.possibleScore * 100);
        if (percent > playlist.best) { playlist.best = percent }
      }
    })
    return playlist;
  })
  const challenge = courseData?.getCourseOfClass?.challengePlaylists.map(playlist => {
    playlist.best = null;
    scoreData?.getScoresForEnrolledClass.forEach(score => {
      if (score.playlist._id === playlist._id) {
        const percent = parseInt(score.score / score.possibleScore * 100);
        if (percent > playlist.best) { playlist.best = percent }
      }
    })
    return playlist;
  });

  if (loading || courseLoading) return <Loading />

  const { name } = data?.getClass;
  return (
    <>
      <Head>
        <title>Alpenglow Learning - {name}</title>
        <meta name='description' content={`Goals and Progress for ${name}`}></meta>
      </Head>
      <PageTitle>{name}</PageTitle>
      <PagePadding>
        <CourseTimelines
          name={`Class at a Glance`}
          courseId={course._id}
          essentialPlaylists={course.essentialPlaylists}
          corePlaylists={course.corePlaylists}
          challengePlaylists={course.challengePlaylists}
          subject={course.subject}
          key={course._id}
          css={css`
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
            :hover { box-shadow: none;} 
          `}
        />
        <div css={doubleHeader}>
          <div>
            <h4>Weekly Goals</h4>
            <ul>
              {data?.getTasks.map(task => {
                if (task.type == 'GOAL') return (
                  <li css={removeTask} onClick={() => { handleTaskRemove(task._id) }} key={task._id}>{task.description}</li>
                )
              })}
            </ul>
            <PlusButtonWithText onClick={addGoal}>Add Goal</PlusButtonWithText>
          </div>
          <div>
            <h4>To-Do's</h4>
            <ul>
              {data?.getTasks.map(task => {
                if (task.type == 'TODO') return (
                  <li css={removeTask} onClick={() => { handleTaskRemove(task._id) }} key={task._id}>{task.description}</li>
                )
              })}
            </ul>
            <PlusButtonWithText onClick={addTodo}>Add Todo</PlusButtonWithText>
          </div>
        </div>
        <h4>Past Playlist Scores</h4>
        <ul css={list}>
          {scoreData?.getScoresForEnrolledClass.map(score => {
            const date = new Date(score.timeScored).toLocaleDateString();
            return (
              <Link href='/student/playlists/[playlistId]' as={`/student/playlists/${score.playlist._id}`} key={score._id}>
                <li>
                  <div css={css`width: 30%;`}>
                    <strong>
                      {score.playlist.name}
                    </strong>
                  </div>
                  <div className='scores'>
                    <span>{date}</span>
                    <span>{score.score}/{score.possibleScore}</span>
                    <PercentScoreRectangle percent={score.score / score.possibleScore * 100} />
                  </div>
                </li>
              </Link>
            )
          }
          )}
        </ul>
      </PagePadding>
    </>
  );
};

export default studentClass;