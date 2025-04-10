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
      setIsLoading(true);
      const { items, nextPageToken: token } = await getVideos();
      setVideos(items);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Sorry, there was an error fetching videos.');
    } finally {
      setIsLoading(false);
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
    if (!nextPageToken) return;
    try {
      const { items, nextPageToken: token } =
        query !== ''
          ? await searchVideos(query, nextPageToken)
          : await getVideos(nextPageToken);
      setVideos((prevVideos) => [...prevVideos, ...items]);
      setNextPageToken(token);
    } catch (error) {
      console.error('Error loading more videos:', error);
      setError('Sorry, there was an error loading more videos.');
    } finally {
      return true;
    }
  }, [query, nextPageToken]);
  return (
    <>
      <h1 className={styles.pageTitle}>Youtube Search</h1>
      <SearchBar onSearch={handleSearch} focus={true} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && (
        <VideoList
          videos={videos}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
}

export default App;
