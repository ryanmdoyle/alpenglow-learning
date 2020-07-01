import React, { useContext } from 'react';

import StudentWelcome from '../../components/welcome/StudentWelcome';
import UserContext from '../../components/context/UserContext';

const studentIndex = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <StudentWelcome user={user} />
    </div>
  );
};

export default studentIndex;