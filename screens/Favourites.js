import React from 'react';
import { useSelector } from 'react-redux';

import VideosContainer from '../components/VideosContainer';

const FavouritesScreen = ({ navigation }) => {
  const favVideos = useSelector(state => state.favourites);

  return <VideosContainer videos={favVideos} navigation={navigation} />;
};

export default FavouritesScreen;
