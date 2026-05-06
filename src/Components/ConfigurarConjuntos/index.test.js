import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfigurarConjuntos from './index';

jest.mock('../Conjuntos/DropFormConjunto2', () => (props) => (
  <div data-testid="drop-form-2">{props.param}</div>
));

jest.mock('../Conjuntos/DropFormConjunto3', () => (props) => (
  <div data-testid="drop-form-3">{props.param}</div>
));

describe('ConfigurarConjuntos', () => {
  test('alternar entre agrupacion e inmueble', () => {
    render(<ConfigurarConjuntos user={{ id: 1 }} conjunto={{ idconjunto: 2 }} />);

    expect(screen.getByText('Configuracion de Conjuntos')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Crear Agrupacion/i }));
    expect(screen.getByTestId('drop-form-2')).toHaveTextContent('TipoAgrupacionesPropia');

    fireEvent.click(screen.getByRole('button', { name: /Crear Inmueble/i }));
    expect(screen.getByTestId('drop-form-3')).toHaveTextContent('TipoAgrupacionesPropia2');
  });
});