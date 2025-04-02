import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import { searchVideos, getVideos } from './services/youtubeApi';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { items, nextPageToken: token } = await getVideos();
        setVideos(items);
        setNextPageToken(token);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery) return;
    setQuery(searchQuery);
    setIsLoading(true);
    setVideos([]);
    try {
      const { items, nextPageToken: token } = await searchVideos(searchQuery);
      setVideos(items);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!nextPageToken || isLoading) return;
    setIsLoading(true);
    try {
      const { items, nextPageToken: token } =
        query !== ''
          ? await searchVideos(query, nextPageToken)
          : await getVideos(query, nextPageToken);
      setVideos((prevVideos) => [...prevVideos, ...items]);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, nextPageToken, isLoading]);

  return (
    <div class='container'>
      <h1>
        <a href='http://codecanyon.net/item/youtube-api-ultimate-integration/403773?ref=yougapi'></a>
        <img
          src='include/graph/youtube-integration-mini.png'
          style={{ marginRight: '30px' }}
          alt='image'
        />
        YouTube Search and API integration
      </h1>
      <hr />
      <div>
        <SearchBar onSearch={handleSearch} />
        <VideoList
          videos={videos}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}

export default App;
