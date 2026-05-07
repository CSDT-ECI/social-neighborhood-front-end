import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropTypes from 'prop-types';
import DropDeepForm from './DropDeepForm';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));
function mockTextField({ children, label, select, ...props }) {
  return select ? <div data-testid="select">{children}</div> : <input aria-label={label} {...props} />;
}

mockTextField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  select: PropTypes.bool,
};

function mockMenuItem({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

mockMenuItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

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

jest.mock('@mui/material/TextField', () => mockTextField);
jest.mock('@mui/material/MenuItem', () => mockMenuItem);
jest.mock('@mui/material/Box', () => mockBox);
jest.mock('@mui/material/Button', () => mockButton);
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
