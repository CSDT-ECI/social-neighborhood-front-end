import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from './index';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
}));

jest.mock('../../Components/Leftbar', () => (props) => (
  <div>
    <button type="button" onClick={props.changeSection('Feed')}>Feed</button>
    <button type="button" onClick={props.changeSection('Conjuntos')}>Conjuntos</button>
    <button type="button" onClick={props.changeSection('ConfigurarConjuntos')}>ConfigurarConjuntos</button>
    <button type="button" onClick={props.changeSection('EditarUsuario')}>EditarUsuario</button>
    <button type="button" onClick={props.changeSection('ZonasComunes')}>ZonasComunes</button>
    <button type="button" onClick={props.changeSection('Exit')}>Exit</button>
  </div>
));

jest.mock('../../Components/Feed', () => () => <div data-testid="feed-view">Feed</div>);
jest.mock('../../Components/Conjuntos', () => () => <div data-testid="conjuntos-view">Conjuntos</div>);
jest.mock('../../Components/RegisterUser', () => () => <div data-testid="register-view">Register</div>);
jest.mock('../../Components/ConfigurarConjuntos', () => () => <div data-testid="configurar-view">Configurar</div>);
jest.mock('../../Components/EditarUsuario', () => () => <div data-testid="editar-view">Editar</div>);
jest.mock('../../Components/ZonasComunes', () => () => <div data-testid="zonas-view">Zonas</div>);
jest.mock('../../Components/Rightbar', () => () => <div data-testid="rightbar-view">Rightbar</div>);
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({}) }));

describe('AdminDashboard', () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.setItem('user', JSON.stringify({ id: 1, tipousuario: 'Administrador' }));
    localStorage.setItem('conjunto', JSON.stringify({ idconjunto: 2 }));
    localStorage.setItem('vivienda', JSON.stringify({ idunidaddevivienda: 3 }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renderiza feed por defecto y cambia de sección', () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId('feed-view')).toBeInTheDocument();
    expect(screen.getByTestId('rightbar-view')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Conjuntos' }));
    expect(screen.getByTestId('conjuntos-view')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'ConfigurarConjuntos' }));
    expect(screen.getByTestId('configurar-view')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'EditarUsuario' }));
    expect(screen.getByTestId('editar-view')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'ZonasComunes' }));
    expect(screen.getByTestId('zonas-view')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Exit' }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});