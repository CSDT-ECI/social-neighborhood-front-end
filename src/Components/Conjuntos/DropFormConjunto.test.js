import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropTypes from 'prop-types';
import DropFormConjunto from './DropFormConjunto';
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));
function mockTextField({ label, value, disabled, ...props }) {
  return <input aria-label={label || 'field'} value={value || ''} readOnly={disabled} onChange={() => {}} {...props} />;
}

mockTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
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
jest.mock('@mui/material/Box', () => mockBox);
jest.mock('@mui/material/Button', () => mockButton);
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
