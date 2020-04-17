import React from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import Loading from './Loading';
import { subjectsEnum } from '../lib/subjectsEnum';

const CREATE_OBJECTIVE_MUTATION = gql`
  mutation CREATE_OBJECTIVE(
    $name: String!,
    $subject: String!,
    $description: String!,
    $grade: Int!,
  ) {
    createObjective(
      name: $name,
      subject: $subject,
      description: $description,
      grade: $grade,
    ) {
      _id
    }
  }
`;

const CreateObjective = () => {
  const { register, handleSubmit, errors } = useForm();

  const [createObjective, { data }] = useMutation(CREATE_OBJECTIVE_MUTATION);

  const onSubmit = data => {
    createObjective({
      variables: {
        name: data.name,
        subject: data.subject,
        description: data.description,
        grade: parseInt(data.grade), //has to be int for gql
      }
    })
  };

  return (
    <PagePadding>
      <h3>Create New Objective</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          <label htmlFor='subject'>subject*</label>
          <select name='subject' ref={register({ required: true })}>
            {subjectsEnum.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </select>

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="grade" ref={register({ required: true, max: 12, min: 1 })} />

          <button type='submit'>Create Objective</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateObjective;