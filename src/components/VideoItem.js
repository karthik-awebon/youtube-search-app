import React from 'react';
import styles from './VideoItem.module.css';

const VideoItem = React.memo(({ video = {} }) => {
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
      <a
        href={`https://www.youtube.com/watch?v=${video.id.videoId || video.id}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className={styles.videoImageContainer}>
          <img src={imageUrl} alt={title} className={styles.videoImage} />
        </div>
      </a>
      <div className={styles.videoInfo}>
        <a
          className={styles.videoTitle}
          href={`https://www.youtube.com/watch?v=${
            video.id.videoId || video.id
          }`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {title}
        </a>
      </div>
    </div>
  );
});

export default VideoItem;
