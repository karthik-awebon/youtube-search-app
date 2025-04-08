import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoItem from '../../components/VideoItem';
describe('VideoItem component', () => {
  it('renders video item with correct thumbnail and title', () => {
    const video = {
      id: { videoId: '1' },
      snippet: {
        title: 'Video 1',
        thumbnails: {
          medium: {
            url: 'https://example.com/video1.jpg',
          },
        },
      },
    };

    render(<VideoItem video={video} />);

    const videoElement = screen.getByTestId(`video-${video.id.videoId}`);
    expect(videoElement).toBeInTheDocument();
    expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
    expect(screen.getByAltText(video.snippet.title)).toHaveAttribute(
      'src',
      video.snippet.thumbnails.medium.url
    );
  });

  it('renders error message when video prop is empty', () => {
    render(<VideoItem video={{}} />);

    const errorLoadingElement = screen.getByTestId('error-loading-video');

    expect(errorLoadingElement).toBeInTheDocument();
  });

  it('renders error message when video prop is missing', () => {
    render(<VideoItem />);

    const errorLoadingElement = screen.getByTestId('error-loading-video');

    expect(errorLoadingElement).toBeInTheDocument();
  });
});
