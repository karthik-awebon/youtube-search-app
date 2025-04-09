import React from 'react';
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
        <div className={styles.videoList} data-testid='video-list'>
          {videos &&
            videos.map((video, index) => {
              return <VideoItem key={index} video={video} />;
            })}
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default VideoList;
