import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';

import Login from '../components/Login';

const GET_ID = gql`
  query currentUser {
    currentUser {
      googleId
      firstName
    }
  }
`;

const HomePage = () => {

  const testPost = async () => { //THIS WORKS
    // console.log('testGet running')
    fetch('http://localhost:4000/token', {
      method: "POST",
      credentials: 'include',
      body: {
        name: 'Ryan',
        something: 'some data!'
      }
    })
      .then((res) => {
        console.log('test post request')
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const { loading, error, data } = useQuery(GET_ID);
  return (
    <div>
      <h2>Welcome to Next.js!</h2>
      <Login />
      <button onClick={() => { testPost() }}>Test Query</button>
      {loading && <p>Loading...</p>}
      {data && <h1>{data.currentUser.firstName}</h1>}
    </div>
  )

}

export default HomePage
