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
    <li
      className={styles.videoCard}
      data-testid={`video-${video.id?.videoId || video.id || 'unknown'}`}
    >
      <figure className={styles.videoFigure}>
        <div className={styles.videoImageContainer}>
          {viewCount && (
            <div className={styles.viewCount}>{viewCount} views</div>
          )}
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
        <figcaption className={styles.videoInfo}>
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
        </figcaption>
      </figure>
    </li>
  );
});

export default VideoItem;
