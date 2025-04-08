import { searchVideos } from '../../services/youtubeApi';

describe('searchVideos function', () => {
  const mockResponse = {
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
  it('should throw an error if the query is not a string', async () => {
    await expect(searchVideos({})).rejects.toThrowError(
      'Search Text must be a string'
    );
  });

  it('should throw an error if the query is empty', async () => {
    await expect(searchVideos('')).rejects.toThrowError(
      'Search Text cannot be empty'
    );
  });

  it('should return a valid response when the query is valid', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => mockResponse })
      );

    const response = await searchVideos('javascript');
    expect(response).toEqual(mockResponse);
    expect(response.items.length).toBeGreaterThan(0);
  });

  it('should throw an error if the API request fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => {
          return { message: 'Failed to fetch videos' };
        },
      })
    );
    await expect(searchVideos('javascript')).rejects.toThrowError(
      'Failed to fetch videos'
    );
  });

  it('should return the next page of videos when pageToken is provided', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => mockResponse })
      );
    const response1 = await searchVideos('javascript');
    const mockResponse1 = {
      nextPageToken: 'nextPageToken1',
      items: [
        {
          id: { videoId: 'video3' },
          snippet: {
            title: 'video 3',
            description: 'this is a video',
            thumbnails: {
              medium: {
                url: 'https://example.com/video3.jpg',
              },
            },
          },
        },
      ],
    };
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => mockResponse1 })
      );
    const response2 = await searchVideos('javascript', response1.nextPageToken);
    expect(response2.items[0].id.videoId).not.toBe(
      response1.items[0].id.videoId
    );
  });
});
