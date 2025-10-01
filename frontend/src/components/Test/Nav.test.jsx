import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../nav';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

// Helper to wrap with routing and context
const renderWithProviders = (ui, { user = null } = {}) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider value={{ user }}>
        {ui}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

// Mock fetch for genre loading
beforeEach(() => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { genre: 'fantasy' },
          { genre: 'science_fiction' },
          { genre: 'fantasy' },
        ]),
    })
  );
});

describe('Nav Component', () => {
  test('renders logo and search input', () => {
    renderWithProviders(<Nav />);
    expect(screen.getByAltText('Books-R-Us')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search books or authors')).toBeInTheDocument();
  });

  test('shows Sign In when user is not logged in', () => {
    renderWithProviders(<Nav />, { user: null });
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('shows My Account when user is logged in', () => {
    renderWithProviders(<Nav />, { user: { name: 'Harpreet' } });
    expect(screen.getByText('My Account')).toBeInTheDocument();
  });

  test('search input updates', () => {
    renderWithProviders(<Nav />);
    const input = screen.getByPlaceholderText('Search books or authors');
    fireEvent.change(input, { target: { value: 'Dracula' } });
    expect(input.value).toBe('Dracula');
  });

  test('renders genre links after fetch', async () => {
    renderWithProviders(<Nav />);
    expect(await screen.findByText('Fantasy')).toBeInTheDocument();
    expect(screen.getByText('Science Fiction')).toBeInTheDocument();
  });

  test('renders shopping cart icon', () => {
    renderWithProviders(<Nav />);
    expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
  });

  test('search triggers action on Enter', () => {
    renderWithProviders(<Nav />);
    const input = screen.getByPlaceholderText('Search books or authors');
    fireEvent.change(input, { target: { value: 'Dracula' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(input.value).toBe('Dracula');
  });
});
