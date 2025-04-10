const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PAGE_SIZE = process.env.REACT_APP_PAGE_SIZE || 10;

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
  )}&maxResults=${PAGE_SIZE}&type=video&key=${API_KEY}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }`;
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
  const url = `${BASE_URL}/videos?part=snippet&chart=mostpopular&maxResults=${PAGE_SIZE}&key=${API_KEY}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }`;
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
