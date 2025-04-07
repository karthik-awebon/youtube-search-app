import React from 'react';
import styles from './VideoItem.module.css';

function VideoItem({ video }) {
  const { snippet } = video;
  const imageUrl = snippet.thumbnails.medium.url;
  const title = snippet.title;

  return (
    <div className={styles.videoCard}>
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
