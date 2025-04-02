const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function searchVideos(query, pageToken = '') {
  const url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
    query
  )}&maxResults=20&type=video&videoEmbeddable=true&videoSyndicated=true&key=${API_KEY}&type=video&pageToken=${pageToken}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
}

export async function getVideos(query, pageToken = '') {
  const url = `${BASE_URL}/videos?part=snippet,statistics&chart=mostpopular&maxResults=20&key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
}
