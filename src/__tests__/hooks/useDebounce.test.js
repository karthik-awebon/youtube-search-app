import { renderHook, act } from '@testing-library/react';
import useDebounce from '../../hooks/useDebounce';

describe('useDebounce', () => {
  let mockFn;
  const delay = 1000;

  beforeEach(() => {
    jest.useFakeTimers();
    mockFn = jest.fn();
  });

  test('calls the function after the specified delay', () => {
    const debouncedFn = renderHook(() => useDebounce(mockFn, delay)).result
      .current;
    act(() => {
      debouncedFn('test');
    });
    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(mockFn).toHaveBeenCalledWith('test');
  });

  test('does not call the function if the delay is not reached', () => {
    const debouncedFn = renderHook(() => useDebounce(mockFn, delay)).result
      .current;
    act(() => {
      debouncedFn('test');
    });
    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay - 1);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  //   test('resets the delay if called again before delay is reached', () => {
  //     const debouncedFn = renderHook(() => useDebounce(mockFn, delay)).result
  //       .current;
  //     act(() => {
  //       debouncedFn('test1');
  //       jest.advanceTimersByTime(delay - 500);
  //       debouncedFn('test2');
  //     });

  //     act(() => {
  //       jest.advanceTimersByTime(500);
  //     });

  //     expect(mockFn).not.toHaveBeenCalled();

  //     act(() => {
  //       jest.advanceTimersByTime(500);
  //     });

  //     expect(mockFn).toHaveBeenCalledWith('test2');
  //   });

  //   test('calls the function with the latest arguments', () => {
  //     const debouncedFn = renderHook(() => useDebounce(mockFn, delay)).result
  //       .current;

  //     act(() => {
  //       debouncedFn('test1');
  //       debouncedFn('test2');
  //       jest.advanceTimersByTime(delay);
  //     });

  //     expect(mockFn).toHaveBeenCalledWith('test2');
  //   });
});
