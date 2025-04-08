import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoList from '../../components/VideoList';

describe('VideoList component', () => {
  it('renders list of videos when videos prop is provided', async () => {
    const videos = [
      {
        id: { videoId: '1' },
        snippet: {
          title: 'Video 1',
          thumbnails: {
            medium: {
              url: 'https://example.com/video1.jpg',
            },
          },
        },
      },
      {
        id: { videoId: '2' },
        snippet: {
          title: 'Video 2',
          thumbnails: {
            medium: {
              url: 'https://example.com/video2.jpg',
            },
          },
        },
      },
    ];

    render(<VideoList videos={videos} />);

    const videoElement1 = screen.getByTestId(`video-${videos[0].id.videoId}`);
    expect(videoElement1).toBeInTheDocument();

    const videoElement2 = screen.getByTestId(`video-${videos[1].id.videoId}`);
    expect(videoElement2).toBeInTheDocument();
  });

  it('renders No videos found message when videos prop is empty', async () => {
    render(<VideoList videos={[]} />);

    const noVideoElement = screen.getByTestId('no-videos-found');
    expect(noVideoElement).toBeInTheDocument();
  });
  it('renders No videos found message when videos is not provided', async () => {
    render(<VideoList />);

    const noVideoElement = screen.getByTestId('no-videos-found');
    expect(noVideoElement).toBeInTheDocument();
  });
  it('calls onLoadMore when scroll reaches bottom of the page', async () => {
    const scrollHeight = 1000;
    const innerHeight = 500;
    const scrollY = 500;
    const mockOnLoadMore = jest.fn();

    render(
      <div style={{ height: `${scrollHeight}px` }}>
        <VideoList onLoadMore={mockOnLoadMore} />
      </div>
    );

    global.innerHeight = innerHeight;
    global.scrollY = scrollY;
    global.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
  it('renders loader when isLoading is true', async () => {
    const isLoading = true;

    render(<VideoList isLoading={isLoading} />);

    const loaderElement = screen.getByTestId('loading-component');
    expect(loaderElement).toBeInTheDocument();
  });
  it('does not render loader when isLoading is false', async () => {
    const isLoading = false;

    render(<VideoList isLoading={isLoading} />);

    const loaderElement = screen.queryByTestId('loading-component');
    expect(loaderElement).not.toBeInTheDocument();
  });
});
