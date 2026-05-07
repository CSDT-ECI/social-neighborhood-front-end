import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import { useFetchData } from './useFetchData';

jest.mock('../services/apiService');
import { fetchData } from '../services/apiService';

// Wrapper component that exposes hook state via data-testid attributes
function HookWrapper({ endpoint }) {
  const { data, loading, error } = useFetchData(endpoint);
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="error">{error ? error.message : ''}</span>
      <span data-testid="data">{JSON.stringify(data)}</span>
    </div>
  );
}

describe('useFetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns data on successful fetch', async () => {
    const mockData = [{ id: 1, name: 'Item 1' }];
    fetchData.mockResolvedValue(mockData);

    await act(async () => {
      render(<HookWrapper endpoint="/api/items" />);
    });

    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('');
    expect(screen.getByTestId('data').textContent).toBe(JSON.stringify(mockData));
  });

  test('sets error on fetch failure', async () => {
    const mockError = new Error('Network error');
    fetchData.mockRejectedValue(mockError);

    await act(async () => {
      render(<HookWrapper endpoint="/api/items" />);
    });

    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('Network error');
    expect(screen.getByTestId('data').textContent).toBe('[]');
  });

  test('stays loading when no endpoint is given', () => {
    render(<HookWrapper endpoint={null} />);

    expect(screen.getByTestId('loading').textContent).toBe('true');
    expect(screen.getByTestId('error').textContent).toBe('');
    expect(screen.getByTestId('data').textContent).toBe('[]');
    expect(fetchData).not.toHaveBeenCalled();
  });
});
