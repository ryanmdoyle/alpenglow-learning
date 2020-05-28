import React, { useContext } from 'react';
import { gql } from 'apollo-boost';

import FormWrapper from '../../components/styled/FormWrapper';
import AlertContext from '../../components/context/AlertContext';
import PagePadding from '../../components/styled/PagePadding';
import PageTitle from '../../components/PageTitle';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

const ENROLL_MUTATION = gql`
  mutation ENROLL($enrollId: String!) {
    enroll(enrollId: $enrollId) {
      _id
    }
  }
`;

const enroll = () => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);

  const [enroll, { data }] = useMutation(ENROLL_MUTATION, {
    onCompleted: (data) => {
      alert.success(`Successfully enrolled in class!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  }
  )

  const onSubmit = data => {
    enroll({ variables: { enrollId: data.enrollId } });
    setIsAdding(false);
  }

  return (
    <div>
      <PageTitle>Welcome To Alpenglow</PageTitle>
      <PagePadding>
        <h3>Enroll in Class</h3>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='Enter Enroll ID' name='enrollId' ref={register({ required: true })}></input>
            <button type="submit">Enroll</button>
          </form>
        </FormWrapper>
      </PagePadding>
    </div>
  );
};

export default enroll;