import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';
import ConfigurarConjuntos from './index';

function mockDropFormConjunto2({ param }) {
  return <div data-testid="drop-form-2">{param}</div>;
}

mockDropFormConjunto2.propTypes = {
  param: PropTypes.string,
};

function mockDropFormConjunto3({ param }) {
  return <div data-testid="drop-form-3">{param}</div>;
}

mockDropFormConjunto3.propTypes = {
  param: PropTypes.string,
};

jest.mock('../Conjuntos/DropFormConjunto2', () => mockDropFormConjunto2);
jest.mock('../Conjuntos/DropFormConjunto3', () => mockDropFormConjunto3);

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