import React, { useRef } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import * as favouritesActions from '../store/actions/favourites';

const VideoItem = ({ video, fullScreen, navigation }) => {
  const dispatch = useDispatch();
  const videoRef = useRef();
  const favVideos = useSelector(state => state.favourites);

  const uri = video.playbackUrl;
  const isFav = favVideos.findIndex(vid => vid.playbackUrl === uri) !== -1;

  return fullScreen ? (
    <>
      <StatusBar hidden />
      <VideoPlayer
        navigator={navigation}
        disableFullscreen
        controlTimeout={5000}
        resizeMode='contain'
        style={styles.fullVideo}
        ref={videoRef}
        source={{ uri }}
      />
    </>
  ) : (
    <>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => navigation.navigate('video', { video })}>
        <>
          <ActivityIndicator
            size='large'
            color='dodgerblue'
            style={styles.loading}
          />
          <Video
            resizeMode='cover'
            paused={true}
            style={styles.video}
            ref={videoRef}
            source={{ uri }}
            onLoad={() => videoRef.current.seek(0)}
          />
        </>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favourite}
        onPress={() => dispatch(favouritesActions.toggleFavourite(video))}>
        <Icon
          name={isFav ? 'favorite' : 'favorite-border'}
          size={25}
          color='red'
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    alignSelf: 'center'
  },
  favourite: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  fullVideo: {
    backgroundColor: 'black'
  },
  video: {
    height: '100%'
  },
  videoContainer: {
    justifyContent: 'center'
  }
});

export default VideoItem;
