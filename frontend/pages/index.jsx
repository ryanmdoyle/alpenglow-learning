import React from 'react';
import axios from 'axios';

import Login from '../components/Login';

const HomePage = () => {
  const testGet = async () => {
    console.log('testGet running')

    axios.get('http://localhost:4000/get')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div>
      <h2>Welcome to Next.js!</h2>
      <Login />
      <button onClick={() => { testGet() }}>Test Query</button>
    </div>
  )

}

export default HomePage
