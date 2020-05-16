import React from 'react';
import styled from '@emotion/styled';

const PagePaddingStyled = styled.div`
  display: relative;
  padding: 0 2rem 3rem 2rem;
`;

const PagePadding = ({ children }) => {
  return (
    <PagePaddingStyled>
      {children}
    </PagePaddingStyled>
  );
};

export default PagePadding;