import React, { useState, useEffect } from 'react';
import { Dimensions, Text, StyleSheet } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from 'recyclerlistview';

import VideoItem from './VideoItem';

const VideosContainer = ({ videos, navigation, onEndReached }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const onChange = () => setDimensions(Dimensions.get('window'));

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  const windowWidth = dimensions.width;
  const windowHeight = dimensions.height;

  if (!videos.length) return <Text style={styles.text}>No Videos Here</Text>;

  let data = new DataProvider(
    (vid1, vid2) => vid1.playbackUrl !== vid2.playbackUrl
  ).cloneWithRows(
    videos.map(({ playbackUrl }) => ({ type: 'video', item: { playbackUrl } }))
  );

  const layoutProvider = new LayoutProvider(
    () => 'video',
    (type, dim) => {
      dim.width = windowHeight > windowWidth ? windowWidth : windowWidth / 2;
      dim.height =
        windowHeight > windowWidth ? windowHeight / 3 : windowHeight / 2;
    }
  );

  const rowRenderer = (type, data) => (
    <VideoItem video={data.item} navigation={navigation} />
  );

  return (
    <RecyclerListView
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
      layoutProvider={layoutProvider}
      dataProvider={data}
      rowRenderer={rowRenderer}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize: 15
  }
});

export default VideosContainer;
