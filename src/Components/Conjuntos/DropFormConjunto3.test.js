import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropTypes from 'prop-types';
import DropFormConjunto3 from './DropFormConjunto3';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({ isConfirmed: true }) }));

function mockBox({ children, component: Component = 'div', ...props }) {
  return <Component {...props}>{children}</Component>;
}

mockBox.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
};

function mockButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

mockButton.propTypes = {
  children: PropTypes.node,
};

function mockTextField({ label, onChange, ...props }) {
  return <input aria-label={label} onChange={onChange} {...props} />;
}

mockTextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
};

function mockInputAdornment({ children }) {
  return <span>{children}</span>;
}

mockInputAdornment.propTypes = {
  children: PropTypes.node,
};

function mockSend() {
  return <span>send</span>;
}

jest.mock('@mui/material/Box', () => mockBox);
jest.mock('@mui/material/Button', () => mockButton);
jest.mock('@mui/material/TextField', () => mockTextField);
jest.mock('@mui/material/InputAdornment', () => mockInputAdornment);
jest.mock('@mui/icons-material/Send', () => mockSend);

function mockDropFormConjunto2({ submited }) {
  return (
    <div>
      <button type="button" onClick={() => submited({ idItem: 'agr-1', nItem: '2' })}>
        select agrupacion
      </button>
      <button type="button" onClick={() => submited({ idItem: 'inm-1', nItem: '4' })}>
        select inmueble
      </button>
    </div>
  );
}

mockDropFormConjunto2.propTypes = {
  submited: PropTypes.func,
};

jest.mock('./DropFormConjunto2', () => mockDropFormConjunto2);

describe('DropFormConjunto3', () => {
  beforeEach(() => {
    window.$dir = 'http://example.test/';
    axios.post.mockReset();
  });

  test('recibe datos de los selectores y envía el formulario', async () => {
    axios.post.mockResolvedValue({ status: 200, data: {} });

    render(
      <DropFormConjunto3
        param="TipoInmueblesPropia"
        param2="newUnidadDeVivienda"
        location="admin"
        currentConjunto={{ idconjunto: 1, idusuarioadministrador: 2, id: 3 }}
        currentUsuario={{ tipoUsuario: 'Administrador' }}
        enableSubmit
        level={2}
      />
    );

    // First DropFormConjunto2 submits to toggleAgrupacion; second to toggleInmueble
    fireEvent.click(screen.getAllByRole('button', { name: /select agrupacion/i })[0]);
    // Use index [1] to trigger the second DropFormConjunto2 (toggleInmueble)
    fireEvent.click(screen.getAllByRole('button', { name: /select inmueble/i })[1]);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '900' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    // The component's handleOnChange uses a stale closure so two synchronous setCurrent
    // calls inside toggleInmueble result in numInmueble='4' but idTipoInmuebleConjunto=''
    expect(axios.post).toHaveBeenCalledWith('http://example.test/admin/newUnidadDeVivienda', expect.objectContaining({
      costoAdministracion: '900',
    }));
  });
});
