import React from 'react';
import styles from './VideoItem.module.css';

function VideoItem({ video = {} }) {
  const { snippet = {} } = video;
  const imageUrl = snippet.thumbnails?.medium?.url || '';
  const title = snippet.title || 'No title available';

  if (!imageUrl) {
    return <p data-testid='error-loading-video'>Error loading video</p>;
  }

  return (
    <div
      className={styles.videoCard}
      data-testid={`video-${video.id?.videoId || 'unknown'}`}
    >
      <div className={styles.videoImageContainer}>
        <img src={imageUrl} alt={title} className={styles.videoImage} />
      </div>
      <div className={styles.videoInfo}>
        <h2 className={styles.videoTitle}>{title}</h2>
      </div>
    </div>
  );
}

export default VideoItem;
