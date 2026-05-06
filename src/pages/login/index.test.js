import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './index';
import axios from 'axios';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
}));

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({ isConfirmed: true }) }));

jest.mock('../../Components/Conjuntos/DropFormConjunto', () => (props) => (
  <button
    type="button"
    onClick={() => props.onChange({ idconjunto: 7, idusuarioadministrador: 8, id: 9 })}
  >
    select conjunto
  </button>
));

jest.mock('../../Components/Conjuntos/DropDeepForm', () => (props) => (
  <button
    type="button"
    onClick={() => props.onChange({ idconjunto: 11, idunidaddevivienda: 12 })}
  >
    select vivienda
  </button>
));

describe('Login', () => {
  beforeEach(() => {
    mockPush.mockClear();
    axios.get.mockReset();
    axios.post.mockReset();
    axios.post.mockResolvedValue({ status: 200, data: {} });
    window.$dir = 'http://example.test/';
    localStorage.clear();
  });

  test('inicia sesión como administrador', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        email: 'admin@test.com',
        nombres: 'Admin',
        password: 'secret',
        tipousuario: 'Administrador',
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByRole('textbox', { name: /username/i }), {
      target: { value: 'admin@test.com' },
    });

    await screen.findByRole('button', { name: /select conjunto/i });
    fireEvent.click(screen.getByRole('button', { name: /select conjunto/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/adminDashboard/'));
    expect(localStorage.getItem('user')).toContain('admin@test.com');
    expect(axios.post).toHaveBeenCalled();
  });

  test('inicia sesión como residente', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        id: 2,
        email: 'resident@test.com',
        nombres: 'Resident',
        password: 'secret',
        tipousuario: 'Residente',
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByRole('textbox', { name: /username/i }), {
      target: { value: 'resident@test.com' },
    });

    await screen.findByRole('button', { name: /select vivienda/i });
    fireEvent.click(screen.getByRole('button', { name: /select vivienda/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/residentDashboard/'));
    expect(localStorage.getItem('user')).toContain('resident@test.com');
    expect(axios.post).toHaveBeenCalled();
  });
});