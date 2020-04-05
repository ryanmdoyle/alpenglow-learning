import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreatePlaylistForm = () => {
  const { register, handleSubmit } = useForm();
  [objectiveCount, setObjectiveCount] = useState(3);

  const onSubmit = data => {
    console.log(data);
  }

  return (
    <form>
      <input name="title" ref={register} />
      <input name="details" ref={register} />
      <input name="objectiveCount" ref={register} type='number' oninput={(val) => { setObjectiveCount(val) }} />

      <input name="firstName" ref={register} />
      <input name="firstName" ref={register} />
      <input type="submit" />
    </form>
  );
};

export default CreatePlaylistForm;