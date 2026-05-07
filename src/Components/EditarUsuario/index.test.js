import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';
import EditarUsuario from './index';

function mockDropForm({ submited, param }) {
  return <button onClick={() => submited({ id: 1, nombre: 'test' })}>{param}</button>;
}

mockDropForm.propTypes = {
  submited: PropTypes.func,
  param: PropTypes.string,
};

function mockTextField({ label, value, ...props }) {
  return <input aria-label={label || 'field'} value={value || ''} onChange={() => {}} {...props} />;
}

mockTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

function mockTypography({ children }) {
  return <h2>{children}</h2>;
}

mockTypography.propTypes = {
  children: PropTypes.node,
};

function mockGrid({ children }) {
  return <div>{children}</div>;
}

mockGrid.propTypes = {
  children: PropTypes.node,
};

jest.mock('../Conjuntos/DropForm', () => mockDropForm);
jest.mock('@mui/material/TextField', () => mockTextField);
jest.mock('@mui/material/Box', () => mockBox);
jest.mock('@mui/material/Button', () => mockButton);
jest.mock('@mui/material/Typography', () => mockTypography);
jest.mock('@mui/material/Grid', () => mockGrid);
jest.mock('@mui/icons-material/Send', () => () => <span>send</span>);

// Suppress CSS import
jest.mock('./register.css', () => ({}), { virtual: true });

describe('EditarUsuario', () => {
  const user = { id: 1 };
  const conjunto = { idconjunto: 2 };

  test('renders "Usuarios" heading', () => {
    render(<EditarUsuario user={user} conjunto={conjunto} />);
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
  });

  test('clicking a DropForm button (simulating submited callback) does not crash', () => {
    render(<EditarUsuario user={user} conjunto={conjunto} />);

    // The mocked DropForm renders a button labelled with the `param` prop.
    // Clicking it fires the submited callback — verify the component handles it gracefully.
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Click the first DropForm button (param='Usuario')
    fireEvent.click(buttons[0]);

    // Component should still be rendered after the callback
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
  });
});
