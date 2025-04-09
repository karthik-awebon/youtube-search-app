import { useEffect, useCallback, useState } from 'react';

function useInfiniteScroll(onLoadMore) {
  let isFetching = false;
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      if (!isFetching) {
        isFetching = true;
        onLoadMore().finally(() => {
          isFetching = false;
        });
      }
    }
  }, [onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}

export default useInfiniteScroll;
