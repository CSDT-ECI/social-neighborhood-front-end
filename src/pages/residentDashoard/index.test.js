import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResidentDashboard from './index';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
}));

jest.mock('../../Components/Leftbar', () => (props) => (
  <div>
    <button type="button" onClick={props.changeSection('Feed')}>Feed</button>
    <button type="button" onClick={props.changeSection('Alquiler')}>Alquiler</button>
    <button type="button" onClick={props.changeSection('Exit')}>Exit</button>
  </div>
));

jest.mock('../../Components/Feed', () => () => <div data-testid="feed-view">Feed</div>);
jest.mock('../../Components/Rightbar', () => () => <div data-testid="rightbar-view">Rightbar</div>);
jest.mock('../../Components/Alquiler', () => (props) => (
  <div data-testid="alquiler-view" data-open={String(props.isEnabled)}>
    <button type="button" onClick={props.handleClose}>close</button>
  </div>
));
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({}) }));

describe('ResidentDashboard', () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.setItem('user', JSON.stringify({ id: 1, tipousuario: 'Residente' }));
    localStorage.setItem('conjunto', JSON.stringify({ idconjunto: 2 }));
    localStorage.setItem('vivienda', JSON.stringify({ idunidaddevivienda: 3 }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('muestra feed, abre alquiler y permite salir', () => {
    render(<ResidentDashboard />);

    expect(screen.getByTestId('feed-view')).toBeInTheDocument();
    expect(screen.getByTestId('rightbar-view')).toBeInTheDocument();
    expect(screen.getByTestId('alquiler-view')).toHaveAttribute('data-open', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'Alquiler' }));
    expect(screen.getByTestId('alquiler-view')).toHaveAttribute('data-open', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.getByTestId('alquiler-view')).toHaveAttribute('data-open', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'Exit' }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});