import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockPropTypes from 'prop-types';
import DropFormConjunto2 from './DropFormConjunto2';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  all: jest.fn((reqs) => Promise.all(reqs)),
}));
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({ isConfirmed: true }) }));

function mockBox({ children, component: Component = 'div', ...props }) {
  return <Component {...props}>{children}</Component>;
}

mockBox.propTypes = {
  children: mockPropTypes.node,
  component: mockPropTypes.elementType,
};

function mockGrid({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

mockGrid.propTypes = {
  children: mockPropTypes.node,
};

function mockButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

mockButton.propTypes = {
  children: mockPropTypes.node,
};

function mockLoadingButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

mockLoadingButton.propTypes = {
  children: mockPropTypes.node,
};

function mockCircularProgress() {
  return <span>loading</span>;
}

function mockSend() {
  return <span>send</span>;
}

jest.mock('@mui/material/Box', () => mockBox);
jest.mock('@mui/material/Grid', () => mockGrid);
jest.mock('@mui/material/Button', () => mockButton);
jest.mock('@mui/lab/LoadingButton', () => mockLoadingButton);
jest.mock('@mui/material/CircularProgress', () => mockCircularProgress);
jest.mock('@mui/icons-material/Send', () => mockSend);

jest.mock('@mui/material/MenuItem', () => {
  const React = require('react');

  function mockMenuItem({ children, onClick, ...props }) {
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
  }

  mockMenuItem.propTypes = {
    children: mockPropTypes.node,
    onClick: mockPropTypes.func,
  };

  return mockMenuItem;
});
function mockTextField({ children, label, select, id, onChange, ...props }) {
  if (select) {
    return (
      <div data-testid={`select-${label}`}>
        <div>{label}</div>
        {children}
      </div>
    );
  }

  return <input aria-label={label} id={id} onChange={onChange} {...props} />;
}

mockTextField.propTypes = {
  children: mockPropTypes.node,
  label: mockPropTypes.string,
  select: mockPropTypes.bool,
  id: mockPropTypes.string,
  onChange: mockPropTypes.func,
};

jest.mock('@mui/material/TextField', () => mockTextField);

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
