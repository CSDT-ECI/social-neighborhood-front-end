import React, { useContext } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext, AuthContextProvider } from './AuthContext';

const AuthConsumer = () => {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div>
      <span data-testid="user-email">{user?.email || 'none'}</span>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { id: 99, email: 'nuevo@correo.com' },
          })
        }
      >
        login
      </button>
    </div>
  );
};

describe('AuthContextProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('expone user null por defecto cuando no hay sesión guardada', () => {
    render(
      <AuthContextProvider>
        <AuthConsumer />
      </AuthContextProvider>
    );

    expect(screen.getByTestId('user-email').textContent).toBe('none');
  });

  test('actualiza user y persiste en localStorage tras LOGIN_SUCCESS', async () => {
    render(
      <AuthContextProvider>
        <AuthConsumer />
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'login' }));

    expect(screen.getByTestId('user-email').textContent).toBe('nuevo@correo.com');

    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('user'));
      expect(saved.email).toBe('nuevo@correo.com');
    });
  });
});
