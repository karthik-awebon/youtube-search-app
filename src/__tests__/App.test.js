import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
  debug,
} from '@testing-library/react';
import { getVideos, searchVideos } from '../services/youtubeApi';
import App from '../App';

jest.mock('../services/youtubeApi');

describe('App', () => {
  const mockVideos = {
    nextPageToken: 'nextPageToken',
    items: [
      {
        id: { videoId: 'video1' },
        snippet: {
          title: 'video 1',
          description: 'this is a video',
          thumbnails: {
            medium: {
              url: 'https://example.com/video1.jpg',
            },
          },
        },
      },
      {
        id: { videoId: 'video2' },
        snippet: {
          title: 'video 2',
          description: 'this is another video',
          thumbnails: {
            medium: {
              url: 'https://example.com/video2.jpg',
            },
          },
        },
      },
    ],
  };
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('renders the search bar and the video list', async () => {
    getVideos.mockResolvedValue(mockVideos);
    const { getByTestId } = await waitFor(() => {
      render(<App />);
      return screen;
    });
    const searchInput = getByTestId('search-bar');
    expect(searchInput).toBeInTheDocument();
    await waitFor(() => {
      const videoList = getByTestId('video-list');
      expect(videoList).toBeInTheDocument();
    });
  });
  it('calls getVideos function when the component mounts', async () => {
    getVideos.mockResolvedValue(mockVideos);
    await waitFor(() => render(<App />));
    expect(getVideos).toHaveBeenCalledWith();
  });
  it('renders the list of videos returned by getVideos', async () => {
    getVideos.mockResolvedValue(mockVideos);
    waitFor(() => {
      render(<App />);
      const videoList = screen.getByTestId('video-list');
      expect(videoList.children.length).toBe(2);
    });
  });
  it('calls searchVideos when the user types in the search bar', async () => {
    const userSearchText = 'Chess';
    getVideos.mockResolvedValue(mockVideos);
    searchVideos.mockResolvedValue(mockVideos);
    const { getByTestId } = await waitFor(() => {
      render(<App />);
      return screen;
    });
    const searchInput = getByTestId('search-bar');
    fireEvent.change(searchInput, { target: { value: userSearchText } });
    await waitFor(
      () => expect(searchVideos).toHaveBeenCalledWith(userSearchText),
      { timeout: 2001 }
    );
  });
  it('renders the list of videos returned by searchVideos', async () => {
    const userSearchText = 'Chess';
    getVideos.mockResolvedValue(mockVideos);
    searchVideos.mockResolvedValue(mockVideos);
    const { getByTestId } = await waitFor(() => {
      render(<App />);
      return screen;
    });
    const searchInput = getByTestId('search-bar');
    fireEvent.change(searchInput, { target: { value: userSearchText } });
    await waitFor(
      () => expect(searchVideos).toHaveBeenCalledWith(userSearchText),
      { timeout: 2001 }
    );
    const videoList = await screen.findByTestId('video-list');
    expect(videoList.children.length).toBe(2);
  });
});
