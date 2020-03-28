import React from 'react';
import fetch from 'isomorphic-unfetch';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Login from '../components/Login';

const SEND_COOKIE = gql`
  mutation sendCookie {
    sendCookie {
      firstName
    }
  }
`;

const HomePage = () => {

  const testPost = async () => { //THIS WORKS
    // console.log('testGet running')
    fetch('http://localhost:4000/cookie', {
      method: "POST",
      credentials: 'include',
      body: {
        name: 'Ryan',
        something: 'some data!'
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div>
      <h2>Welcome to Next.js!</h2>
      <Login />
      <button onClick={() => { testPost() }}>Test Query</button>
    </div>
  )

}

export default HomePage
