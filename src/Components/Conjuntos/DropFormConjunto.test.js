import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DropFormConjunto from './DropFormConjunto';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));
jest.mock('@mui/material/TextField', () => ({ label, value, disabled, ...props }) => (
  <input aria-label={label || 'field'} value={value || ''} readOnly={disabled} onChange={() => {}} {...props} />
));
jest.mock('@mui/material/Box', () => ({ children, component: C = 'div', ...props }) => <C {...props}>{children}</C>);
jest.mock('@mui/material/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/icons-material/Send', () => () => <span>send</span>);

describe('DropFormConjunto', () => {
  beforeEach(() => {
    window.$dir = 'http://test/';
    axios.get.mockReset();
    axios.post.mockReset();
  });

  test('renders without crashing and shows conjunto name', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { idconjunto: 5 } })
      .mockResolvedValueOnce({ data: { nombre: 'Conjunto A' } });

    const onChange = jest.fn();

    render(
      <DropFormConjunto
        param="testParam"
        location="social"
        onChange={onChange}
        enableSubmit={false}
      />
    );

    await waitFor(() =>
      expect(screen.getByLabelText('field')).toHaveValue('Conjunto A')
    );

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith({ idconjunto: 5 });
  });

  test('shows confirm button when enableSubmit=true and submits form', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { idconjunto: 5 } })
      .mockResolvedValueOnce({ data: { nombre: 'Conjunto A' } });
    axios.post.mockResolvedValue({ status: 200, data: {} });

    const onChange = jest.fn();

    render(
      <DropFormConjunto
        param="testParam"
        location="social"
        onChange={onChange}
        enableSubmit={true}
        param2="newTipoInmueble"
        currentConjunto={{ idconjunto: 1 }}
      />
    );

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });
});
