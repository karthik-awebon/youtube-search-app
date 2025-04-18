import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import VideoItem from './VideoItem';
import Loader from './Loader';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import styles from './VideoList.module.css';

function VideoList({ videos = [], onLoadMore, isLoading }) {
  useInfiniteScroll(onLoadMore);
  if (videos && videos.length === 0 && !isLoading) {
    return <p data-testid='no-videos-found'>No videos found.</p>;
  }

  return (
    <>
      {!isLoading && (
        <ul className={styles.videoList} data-testid='video-list'>
          {videos &&
            videos.map((video) => {
              return <VideoItem key={uuidv4()} video={video} />;
            })}
        </ul>
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default VideoList;
