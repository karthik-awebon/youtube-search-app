import React from 'react';

function VideoItem({ video }) {
  const { snippet } = video;
  const imageUrl = snippet.thumbnails.medium.url;
  const title = snippet.title;

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '20px',
        width: '80%',
        maxWidth: '600px',
        border: '1px solid #ccc',
        padding: '10px',
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ marginRight: '10px', width: '120px', height: '90px' }}
      />
      <div>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default VideoItem;
