import React from 'react';

import PageFade from '../components/styled/blocks/PageFade';
import CreateAccount from '../components/CreateAccount';

const createAccount = () => {
  return (
    <PageFade>
      <CreateAccount />
    </PageFade>
  );
};

export default createAccount;