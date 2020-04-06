import React from 'react';
import CreatePlaylist from '../components/CreatePlaylist';
import { withApollo } from '../lib/apollo';

const createPlaylist = () => {
  return (
    <CreatePlaylist />
  );
};

export default withApollo({ ssr: false })(createPlaylist)