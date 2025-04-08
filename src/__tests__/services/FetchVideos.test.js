import { getVideos } from '../../services/youtubeApi';

describe('getVideos function', () => {
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

  it('should return a valid response when the query is valid', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => mockVideos })
      );
    const response = await getVideos('javascript');
    expect(response).toEqual(mockVideos);
    expect(response.items.length).toBeGreaterThan(0);
  });

  it('should throw an error if the API request fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Internal Server Error',
          }),
      })
    );
    await expect(getVideos('javascript')).rejects.toThrowError(
      'Failed to fetch videos (Error 500): Internal Server Error'
    );
  });

  it('should return the next page of videos when pageToken is provided', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => mockVideos })
      );
    const response1 = await getVideos('javascript');
    const mockResponse1 = {
      nextPageToken: 'nextPageToken1',
      items: [
        {
          id: { videoId: 'video3' },
          snippet: {
            title: 'video 3',
            description: 'this is another video',
            thumbnails: {
              medium: {
                url: 'https://example.com/video3.jpg',
              },
            },
          },
        },
      ],
    };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse1),
      })
    );
    const response2 = await getVideos('javascript', response1.nextPageToken);
    expect(response2.items[0].id.videoId).not.toBe(
      response1.items[0].id.videoId
    );
  });
});
