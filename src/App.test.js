import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

jest.mock('./pages/home', () => () => <div data-testid="home-page">Home</div>);
jest.mock('./pages/adminDashboard', () => () => <div data-testid="admin-page">Admin</div>);
jest.mock('./pages/residentDashoard', () => () => <div data-testid="resident-page">Resident</div>);
jest.mock('./pages/login', () => () => <div data-testid="login-page">Login</div>);
jest.mock('./pages/register', () => () => <div data-testid="register-page">Register</div>);
jest.mock('./Components/Conjuntos', () => () => <div data-testid="conjuntos-page">Conjuntos</div>);
jest.mock('./Components/ConfigurarConjuntos', () => () => <div data-testid="configurar-page">Configurar</div>);
jest.mock('./Components/EditarUsuario', () => () => <div data-testid="editar-page">Editar</div>);
jest.mock('./Components/ZonasComunes', () => () => <div data-testid="zonas-page">Zonas</div>);
jest.mock('./Components/Alquiler', () => () => <div data-testid="alquiler-page">Alquiler</div>);

describe('App routing', () => {
  afterEach(() => {
    cleanup();
  });

  test('renderiza Home en ruta /', () => {
    window.history.pushState({}, 'Home', '/');
    render(<App />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('renderiza Login en ruta /Login', () => {
    window.history.pushState({}, 'Login', '/Login');
    render(<App />);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  test('renderiza Register en ruta /Register', () => {
    window.history.pushState({}, 'Register', '/Register');
    render(<App />);

    expect(screen.getByTestId('register-page')).toBeInTheDocument();
  });

  test('renderiza AdminDashboard en ruta /AdminDashboard/', () => {
    window.history.pushState({}, 'Admin', '/AdminDashboard/');
    render(<App />);

    expect(screen.getByTestId('admin-page')).toBeInTheDocument();
  });

  test('renderiza Home como fallback en ruta desconocida', () => {
    window.history.pushState({}, 'Unknown', '/ruta-que-no-existe');
    render(<App />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
