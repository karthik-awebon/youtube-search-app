import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should call onLoadMore when scroll reaches bottom of the page', async () => {
    const mockOnLoadMore = jest.fn();

    renderHook(() => useInfiniteScroll(mockOnLoadMore));

    global.innerHeight = 1000;
    global.scrollY = 900;
    global.dispatchEvent(new Event('scroll'));

    jest.advanceTimersByTime(200);

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should not call onLoadMore when scroll does not reach bottom of the page', async () => {
    const mockOnLoadMore = jest.fn();
    const { result } = renderHook(() => useInfiniteScroll(mockOnLoadMore));

    global.innerHeight = 1000;
    global.scrollY = 500;
    global.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('should clean up event listener when component is unmounted', async () => {
    const mockOnLoadMore = jest.fn();
    const { result, unmount } = renderHook(() =>
      useInfiniteScroll(mockOnLoadMore)
    );

    global.innerHeight = 1000;
    global.scrollY = 900;
    global.dispatchEvent(new Event('scroll'));
    jest.advanceTimersByTime(200);
    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);

    unmount();

    global.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
});
