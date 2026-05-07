import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('./post.css', () => ({}), { virtual: true });

jest.mock('@mui/material/Card', () => ({ children }) => <div data-testid="card">{children}</div>);
jest.mock('@mui/material/CardHeader', () => ({ title, avatar, action }) => (
  <div data-testid="card-header">
    <span data-testid="title">{title}</span>
    {avatar}
    {action}
  </div>
));
jest.mock('@mui/material/CardMedia', () => ({ image, alt }) => (
  <img data-testid="card-media" src={image} alt={alt} />
));
jest.mock('@mui/material/CardContent', () => ({ children }) => (
  <div data-testid="card-content">{children}</div>
));
jest.mock('@mui/material/Avatar', () => ({ children }) => (
  <div data-testid="avatar">{children}</div>
));
jest.mock('@mui/material/IconButton', () => ({ children }) => (
  <button data-testid="icon-button">{children}</button>
));
jest.mock('@mui/material/Typography', () => ({ children }) => (
  <span data-testid="typography">{children}</span>
));
jest.mock('@mui/material/Grow', () => ({ children }) => <>{children}</>);
jest.mock('@mui/icons-material/MoreVert', () => () => <span data-testid="more-vert-icon" />);
jest.mock('@mui/material/colors', () => ({ red: { 500: '#f44336' } }));

import Post from './index';

describe('Post', () => {
  const baseData = {
    nombreUsuario: 'Juan',
    apellidoUsuario: 'Perez',
    texto: 'Hello world',
    fechaPublicacion: new Date('2024-01-01').getTime(),
    imagen: null,
  };

  test('renders post header with user name and post text (no image)', () => {
    render(<Post data={baseData} />);

    expect(screen.getByTestId('title')).toHaveTextContent('Juan Perez');
    expect(screen.getByTestId('typography')).toHaveTextContent('Hello world');
    expect(screen.queryByTestId('card-media')).not.toBeInTheDocument();
  });

  test('renders card media when image is provided', () => {
    const dataWithImage = { ...baseData, imagen: 'http://example.com/photo.jpg' };
    render(<Post data={dataWithImage} />);

    expect(screen.getByTestId('title')).toHaveTextContent('Juan Perez');
    const media = screen.getByTestId('card-media');
    expect(media).toBeInTheDocument();
    expect(media).toHaveAttribute('src', 'http://example.com/photo.jpg');
  });
});
