import React, { useContext } from 'react';

import TeacherWelcome from '../../components/welcome/TeacherWelcome';
import UserContext from '../../components/context/UserContext';

const teacherIndex = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <TeacherWelcome user={user} />
    </div>
  );
};

export default teacherIndex;