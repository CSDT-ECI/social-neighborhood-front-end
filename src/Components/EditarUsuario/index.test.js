import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditarUsuario from './index';

jest.mock('../Conjuntos/DropForm', () => ({ submited, param }) => (
  <button onClick={() => submited({ id: 1, nombre: 'test' })}>{param}</button>
));
jest.mock('@mui/material/TextField', () => ({ label, value, ...props }) => (
  <input aria-label={label || 'field'} value={value || ''} onChange={() => {}} {...props} />
));
jest.mock('@mui/material/Box', () => ({ children, component: C = 'div', ...props }) => <C {...props}>{children}</C>);
jest.mock('@mui/material/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/material/Typography', () => ({ children }) => <h2>{children}</h2>);
jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);
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
