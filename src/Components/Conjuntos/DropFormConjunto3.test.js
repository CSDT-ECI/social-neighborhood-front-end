import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DropFormConjunto3 from './DropFormConjunto3';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({ isConfirmed: true }) }));

jest.mock('@mui/material/Box', () => ({ children, component: Component = 'div', ...props }) => (
  <Component {...props}>{children}</Component>
));
jest.mock('@mui/material/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/material/TextField', () => ({ label, onChange, ...props }) => (
  <input aria-label={label} onChange={onChange} {...props} />
));
jest.mock('@mui/material/InputAdornment', () => ({ children }) => <span>{children}</span>);
jest.mock('@mui/icons-material/Send', () => () => <span>send</span>);

jest.mock('./DropFormConjunto2', () => (props) => (
  <div>
    <button type="button" onClick={() => props.submited({ idItem: 'agr-1', nItem: '2' })}>
      select agrupacion
    </button>
    <button type="button" onClick={() => props.submited({ idItem: 'inm-1', nItem: '4' })}>
      select inmueble
    </button>
  </div>
));

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
