import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import SiteTitle from '../components/SiteTitle';
import NavItem from '../components/NavItem';

const NavStudent = props => {
  return (
    <>
      <SiteTitle />
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='Course View' href='/courses' />
        <NavItem title='Grades' href='/' />
      </ul>
    </>
  );
};

NavStudent.propTypes = {

};

export default NavStudent;