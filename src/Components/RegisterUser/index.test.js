import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterUser from './index';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({}) }));
jest.mock('@mui/material/TextField', () => ({ label, id, name, type, ...props }) => (
  <input aria-label={label || name} id={id} name={name} type={type || 'text'} {...props} />
));
jest.mock('@mui/material/Box', () => ({ children, component: C = 'div', ...props }) => <C {...props}>{children}</C>);
jest.mock('@mui/material/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <h1>{children}</h1>);
jest.mock('@mui/icons-material/Send', () => () => <span>send</span>);

// Suppress the CSS import that CRA handles but bare Jest does not
jest.mock('./registerUser.css', () => ({}), { virtual: true });

describe('RegisterUser', () => {
  beforeEach(() => {
    window.$dir = 'http://test/';
    axios.post.mockReset();
    axios.post.mockResolvedValue({ status: 200, data: { id: 99 } });
  });

  test('renders "Registrate!" when no user/conjunto props are provided', () => {
    render(<RegisterUser />);
    expect(screen.getByText('Registrate!')).toBeInTheDocument();
  });

  test('renders "Crear Usuario" when user and conjunto props are provided', () => {
    render(
      <RegisterUser
        user={{ id: 1 }}
        conjunto={{ idconjunto: 2 }}
      />
    );
    expect(screen.getByText('Crear Usuario')).toBeInTheDocument();
  });

  test('submits form and calls axios.post with the correct endpoint', async () => {
    render(<RegisterUser />);

    const form = document.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(axios.post).toHaveBeenCalledWith(
      'http://test/social/newUsuario',
      expect.any(Object)
    );
  });
});
