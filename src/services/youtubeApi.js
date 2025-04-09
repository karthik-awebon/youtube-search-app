const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function searchVideos(query, pageToken = '') {
  if (typeof query !== 'string') {
    throw new TypeError('Search Text must be a string');
  }
  const sanitizedQuery = query.trim().replace(/[\s,]+/g, ' ');
  if (sanitizedQuery === '') {
    throw new TypeError('Search Text cannot be empty');
  }

  const url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
    sanitizedQuery
  )}&maxResults=10&type=video&videoEmbeddable=true&videoSyndicated=true&key=${API_KEY}&type=video&pageToken=${pageToken}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorDetails = await response.json();
    const errorMessage = errorDetails.message || response.statusText;
    const errorCode = response.status;
    throw new Error(
      `Failed to fetch videos (Error ${errorCode}): ${errorMessage}`
    );
  }
  return response.json();
}

export async function getVideos(pageToken = '') {
  const url = `${BASE_URL}/videos?part=snippet,statistics&chart=mostpopular&maxResults=10&key=${API_KEY}&pageToken=${pageToken}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorDetails = await response.json();
    const errorMessage = errorDetails.message || response.statusText;
    const errorCode = response.status;
    throw new Error(
      `Failed to fetch videos (Error ${errorCode}): ${errorMessage}`
    );
  }
  return response.json();
}
