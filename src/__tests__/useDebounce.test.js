import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '../hooks/useDebounce';

describe('useDebounce', () => {
  let mockFn;
  let debouncedFn;
  const delay = 1000;

  beforeEach(() => {
    jest.useFakeTimers();
    mockFn = jest.fn();
    debouncedFn = renderHook(() => useDebounce(mockFn, delay)).result.current;
  });

  test('calls the function after the specified delay', () => {
    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(mockFn).toHaveBeenCalledWith('test');
  });

  test('does not call the function if the delay is not reached', () => {
    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay - 1);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('resets the delay if called again before delay is reached', () => {
    debouncedFn('test1');
    act(() => {
      jest.advanceTimersByTime(delay - 500);
    });
    debouncedFn('test2');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledWith('test2');
  });

  test('calls the function with the latest arguments', () => {
    debouncedFn('test1');
    debouncedFn('test2');

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(mockFn).toHaveBeenCalledWith('test2');
  });
});
