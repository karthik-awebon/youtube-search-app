import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader';

describe('Loader Component', () => {
  it('renders loader component', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loading-component');
    expect(loaderElement).toBeInTheDocument();
  });
});
