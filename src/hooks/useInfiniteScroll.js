import { useEffect, useCallback } from 'react';

function useInfiniteScroll(onLoadMore) {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}

export default useInfiniteScroll;
