import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core'
import { useForm } from 'react-hook-form';
import { gql, useQuery, useMutation } from '@apollo/client';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import Loading from '../../Loading';
import { GET_INSTRUCTING_COURSES, GET_COURSE_DETAILS } from '../../../gql/queries';

const CREATE_COURSE_CONTRIBUTOR = gql`
    mutation CREATE_COURSE_CONTRIBUTOR(
      $courseId: ID!,
      $contributorEmail: String!,
    ) {
      createCourseContributor(
        courseId: $courseId,
        contributorEmail: $contributorEmail,
      ) {
        _id
      }
    }
  `;

const CreateCourseContributorForm = ({ courseId }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const [submitting, setSubmitting] = useState(false);

  const { data: queryData, loading, error } = useQuery(GET_COURSE_DETAILS, {
    variables: { courseId: courseId }
  });

  const [createContributor, { data }] = useMutation(CREATE_COURSE_CONTRIBUTOR, {
    refetchQueries: [
      { query: GET_INSTRUCTING_COURSES },
      { query: GET_COURSE_DETAILS, variables: { courseId: courseId } }
    ],
    onCompleted: (data) => {
      setSubmitting(false);
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully added contributor.`)
    },
    onError: (data) => {
      setSubmitting(false)
      alert.error(`Ooops, looks like there was a problem. ${data}`)
    },
  }
  )

  const onSubmit = data => {
    setSubmitting(true);
    createContributor({
      variables: {
        courseId: courseId,
        contributorEmail: data.contributorEmail,
      }
    })
  }
  if (loading) return <Loading />

  const { name, subject, grade, section, description, startDate, endDate } = queryData?.getCourse;
  return (
    <PagePadding>
      <h5 css={css`padding-left:3rem;margin:0;font-size: 1.1rem;`}>Add Contributor/Instructor</h5>
      <FormWrapper css={css`label{margin-top:0rem;}`}>
        <form onSubmit={handleSubmit(onSubmit)} >

          <label htmlFor='contributorEmail' >Email<small><em> required</em></small></label>
          <input type="email" name="contributorEmail" ref={register({ required: true })} />
          {errors.contributorEmail && 'You must provide and email to add a course contributor/co-instructor.'}

          <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Add Contributor/Co-Instructor'}</button>
        </form>
      </FormWrapper>
    </PagePadding >
  );
};

CreateCourseContributorForm.propTypes = {
  courseId: PropTypes.string.isRequired,
}

export default CreateCourseContributorForm;