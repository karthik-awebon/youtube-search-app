import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import { searchVideos, getVideos } from './services/youtubeApi';
import styles from './App.module.css';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setError(null);
      const { items, nextPageToken: token } = await getVideos();
      setVideos(items);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Sorry, there was an error fetching videos.');
    }
  };

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      fetchVideos();
      return;
    }
    setQuery(searchQuery);
    setIsLoading(true);
    setVideos([]);
    setError(null);
    try {
      const { items, nextPageToken: token } = await searchVideos(searchQuery);
      setVideos(items);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error searching videos:', error);
      if (error instanceof TypeError) {
        setError(error.message);
      } else {
        setError('Sorry, there was an error searching for videos.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!nextPageToken || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const { items, nextPageToken: token } =
        query !== ''
          ? await searchVideos(query, nextPageToken)
          : await getVideos(query, nextPageToken);
      setVideos((prevVideos) => [...prevVideos, ...items]);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error loading more videos:', error);
      setError('Sorry, there was an error loading more videos.');
    } finally {
      setIsLoading(false);
    }
  }, [query, nextPageToken, isLoading]);

  return (
    <>
      <h1 className={styles.pageTitle}>Youtube Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <VideoList
        videos={videos}
        isLoading={isLoading}
        error={error}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}

export default App;
