import React from 'react';
import VideoItem from './VideoItem';
import Loader from './Loader';

function VideoList({ videos, onLoadMore, isLoading }) {
  if (videos.length === 0 && !isLoading) {
    return <p>No videos found.</p>;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {videos.map((video) => (
        <VideoItem key={video.id.videoId} video={video} />
      ))}
      {isLoading && <Loader />}
    </div>
  );
}

export default VideoList;
