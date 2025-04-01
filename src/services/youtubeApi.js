const API_KEY = 'AIzaSyB95x_Pn5BrucVxNOulWeX9Tim5fTX1Ang';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function searchVideos(query, pageToken = '') {
  const url = `${BASE_URL}?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&pageToken=${pageToken}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
}
