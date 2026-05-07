import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Rightbar from './index';

const mockUnsubscribe = jest.fn();

jest.mock('../../firebase/firebaseConfig', () => ({
  db: {
    collection: () => ({
      orderBy: () => ({
        onSnapshot: (cb) => {
          cb({
            forEach: (iterate) => {
              [
                {
                  id: '1',
                  data: () => ({
                    rol: 'Administrador',
                    texto: 'admin post',
                    nombreUsuario: 'A',
                    apellidoUsuario: 'B',
                    fechaPublicacion: 1,
                  }),
                },
                {
                  id: '2',
                  data: () => ({
                    rol: 'Residente',
                    texto: 'res post',
                    nombreUsuario: 'C',
                    apellidoUsuario: 'D',
                    fechaPublicacion: 2,
                  }),
                },
              ].forEach(iterate);
            },
          });
          return mockUnsubscribe;
        },
      }),
    }),
  },
}));

jest.mock('../Post', () => ({ data }) => <div data-testid="post">{data.texto}</div>);
jest.mock('@mui/material/Badge', () => ({ children, badgeContent }) => (
  <div data-testid="badge">
    {children}
    <span>{badgeContent}</span>
  </div>
));
jest.mock('@mui/icons-material/Mail', () => () => <span>mail</span>);
jest.mock('@mui/material/IconButton', () => ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
));
jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/colors', () => ({ indigo: { 500: '#3f51b5' } }));

// Suppress CSS import
jest.mock('./rightbar.css', () => ({}), { virtual: true });

describe('Rightbar', () => {
  beforeEach(() => {
    mockUnsubscribe.mockClear();
  });

  test('renders without crashing and shows the mail icon button', () => {
    render(<Rightbar />);
    expect(screen.getByText('mail')).toBeInTheDocument();
  });

  test('clicking the mail button shows admin posts', () => {
    render(<Rightbar />);

    // Posts should not be visible before the button is clicked
    expect(screen.queryByTestId('post')).not.toBeInTheDocument();

    // Click the mail icon button to toggle show=true
    fireEvent.click(screen.getByRole('button'));

    // Only the admin post (rol='Administrador') should render
    const posts = screen.getAllByTestId('post');
    expect(posts).toHaveLength(1);
    expect(posts[0]).toHaveTextContent('admin post');
  });
});
