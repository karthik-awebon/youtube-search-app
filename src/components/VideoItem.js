import React from 'react';
import styles from './VideoItem.module.css';

const VideoItem = React.memo(({ video = {} }) => {
  const { snippet = {}, statistics = {} } = video;
  const imageUrl = snippet.thumbnails?.medium?.url || '';
  const title = snippet.title || 'No title available';
  const viewCount = statistics.viewCount
    ? (statistics.viewCount / 1000).toFixed(1) + 'K'
    : null;

  if (!imageUrl) {
    return <p data-testid='error-loading-video'>Error loading video</p>;
  }

  return (
    <div
      className={styles.videoCard}
      data-testid={`video-${video.id?.videoId || 'unknown'}`}
    >
      <div className={styles.videoImageContainer}>
        {viewCount && <div className={styles.viewCount}>{viewCount} views</div>}
        <a
          href={`https://www.youtube.com/watch?v=${
            video.id.videoId || video.id
          }`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={imageUrl} alt={title} className={styles.videoImage} />
        </a>
      </div>
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
