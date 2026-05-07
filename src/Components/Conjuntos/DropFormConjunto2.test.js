import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DropFormConjunto2 from './DropFormConjunto2';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  all: jest.fn((reqs) => Promise.all(reqs)),
}));
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({ isConfirmed: true }) }));

jest.mock('@mui/material/Box', () => ({ children, component: Component = 'div', ...props }) => (
  <Component {...props}>{children}</Component>
));

jest.mock('@mui/material/Grid', () => ({ children, ...props }) => <div {...props}>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/lab/LoadingButton', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/material/CircularProgress', () => () => <span>loading</span>);
jest.mock('@mui/icons-material/Send', () => () => <span>send</span>);
jest.mock('@mui/material/MenuItem', () => {
  const React = require('react');

  return ({ children, onClick, ...props }) => {
    React.useEffect(() => {
      if (onClick) {
        onClick({});
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <button type="button" onClick={onClick} {...props}>
        {children}
      </button>
    );
  };
});
jest.mock('@mui/material/TextField', () => ({ children, label, select, id, onChange, ...props }) => {
  if (select) {
    return (
      <div data-testid={`select-${label}`}>
        <div>{label}</div>
        {children}
      </div>
    );
  }

  return <input aria-label={label} id={id} onChange={onChange} {...props} />;
});

describe('DropFormConjunto2', () => {
  beforeEach(() => {
    window.$dir = 'http://example.test/';
    axios.get.mockReset();
    axios.post.mockReset();
    axios.all.mockImplementation((reqs) => Promise.all(reqs));
  });

  test('carga datos, selecciona un item y envía el formulario', async () => {
    axios.get
      .mockResolvedValueOnce({
        data: [{ id: 'agg-1', idTipoAgrupacion: 'type-1', numero: 2 }],
      })
      .mockResolvedValueOnce({ data: { id: 'detail-1', nombre: 'Agrupacion' } });
    axios.post.mockResolvedValue({ status: 200, data: {} });

    const submited = jest.fn();

    render(
      <DropFormConjunto2
        param="Agrupacion"
        param2="newAgrupacion"
        location="admin"
        location2="admin"
        location3="social"
        param3="tipoAgrupacionConjuntoById"
        param4="tipoAgrupacionById"
        currentConjunto={{ idconjunto: 1, idusuarioadministrador: 2, id: 3 }}
        currentUsuario={{ tipoUsuario: 'Administrador' }}
        enableSubmit
        submited={submited}
        needNumber={false}
        level={1}
      />
    );

    fireEvent.change(screen.getByLabelText('#'), { target: { value: '5' } });

    await waitFor(() => expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(axios.post).toHaveBeenCalledWith('http://example.test/admin/newAgrupacion', {
      idtipoagrupacionconjunto: 'agg-1',
      numero: '5',
    });
    expect(submited).toHaveBeenCalled();
  });
});
