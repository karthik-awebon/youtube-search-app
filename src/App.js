import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import { searchVideos } from './services/youtubeApi';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true);
    setVideos([]);
    try {
      const { items } = await searchVideos(searchQuery);
      setVideos(items);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        <VideoList videos={videos} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
