import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DropDeepForm from './DropDeepForm';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));
jest.mock('@mui/material/TextField', () => ({ children, label, select, ...props }) =>
  select ? <div data-testid="select">{children}</div> : <input aria-label={label} {...props} />
);
jest.mock('@mui/material/MenuItem', () => ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
));
jest.mock('@mui/material/Box', () => ({ children, component: C = 'div', ...props }) => (
  <C {...props}>{children}</C>
));
jest.mock('@mui/material/Button', () => ({ children, ...props }) => (
  <button {...props}>{children}</button>
));
jest.mock('@mui/icons-material/Send', () => () => <span>send</span>);

describe('DropDeepForm', () => {
  beforeEach(() => {
    window.$dir = 'http://test/';
    axios.get.mockReset();
    axios.post.mockReset();
  });

  test('renders without crashing', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <DropDeepForm
        param="unidadDeVivienda"
        location="admin"
        onChange={jest.fn()}
        enableSubmit={false}
        param2="newTipoAgrupacion"
        currentConjunto={{ idconjunto: 1 }}
        submited={jest.fn()}
      />
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });

  test('shows Confirmar button when enableSubmit=true and submits', async () => {
    const mockData = [
      {
        idunidaddevivienda: 1,
        nombreconjunto: 'C1',
        tipoagrupacion: 'null',
        numagrupacion: 'null',
        tipoinmueble: 'Apt',
        numinmueble: 101,
      },
    ];
    axios.get.mockResolvedValue({ data: mockData });
    axios.post.mockResolvedValue({ status: 200, data: {} });

    const onChange = jest.fn();

    render(
      <DropDeepForm
        param="unidadDeVivienda"
        location="admin"
        onChange={onChange}
        enableSubmit={true}
        param2="newTipoInmueble"
        currentConjunto={{ idconjunto: 1 }}
        submited={jest.fn()}
      />
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });
});
