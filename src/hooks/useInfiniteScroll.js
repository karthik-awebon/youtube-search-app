import { useEffect, useCallback, useState } from 'react';

import useDebounce from './useDebounce';

function useInfiniteScroll(onLoadMore) {
  const debouncedOnLoadMore = useDebounce(onLoadMore, 200);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      debouncedOnLoadMore();
    }
  }, [debouncedOnLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}

export default useInfiniteScroll;
