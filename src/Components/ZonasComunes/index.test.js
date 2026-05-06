import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ZonasComunes from './index';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

describe('ZonasComunes', () => {
  const conjunto = { idconjunto: 1, idusuarioadministrador: 2, id: 3 };
  const user = { tipoUsuario: 'Administrador', id: 10 };
  const currentVivienda = { idconjunto: 1, idunidaddevivienda: 5 };

  test('submits form and calls axios.post', async () => {
    globalThis.$dir = 'http://test/';
    axios.post.mockResolvedValue({ status: 200 });
    axios.get = jest.fn().mockResolvedValue({ data: [] });

    render(<ZonasComunes conjunto={conjunto} user={user} currentVivienda={currentVivienda} />);

    const confirm = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirm);

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });
});
