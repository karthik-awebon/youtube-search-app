import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  test('renders search input with placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByTestId('search-bar');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch prop with input value after typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByTestId('search-bar');
    fireEvent.change(inputElement, { target: { value: 'React' } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    expect(mockOnSearch).toHaveBeenCalledWith('React');
  });

  test('does not call onSearch prop if input value is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByTestId('search-bar');

    fireEvent.change(inputElement, { target: { value: '' } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('input value updates on change', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByTestId('search-bar');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(inputElement.value).toBe('New Value');
  });
});
