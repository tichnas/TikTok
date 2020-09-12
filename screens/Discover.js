import React, { useEffect, useState, useRef } from 'react';

import VideosContainer from '../components/VideosContainer';

const DiscoverScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const page = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: page.current })
      }
    );

    const jsonData = await res.json();

    page.current++;

    setVideos(vids => [...vids, ...jsonData]);
  };

  useEffect(() => {
    if (!videos.length) getData();
  });

  return (
    <VideosContainer
      videos={videos}
      navigation={navigation}
      onEndReached={getData}
    />
  );
};

export default DiscoverScreen;
