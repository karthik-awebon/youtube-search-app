import React from 'react';
import VideoItem from './VideoItem';
import Loader from './Loader';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import styles from './VideoList.module.css';

function VideoList({ videos, onLoadMore, isLoading, error }) {
  useInfiniteScroll(onLoadMore);
  if (videos.length === 0 && !isLoading && !error) {
    return <p>No videos found.</p>;
  }

  return (
    <>
      <div className={styles.videoList}>
        {videos.map((video) => (
          <VideoItem key={video.id.videoId} video={video} />
        ))}
      </div>
      {isLoading && <Loader />}
    </>
  );
}

export default VideoList;
