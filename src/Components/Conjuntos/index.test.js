import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';
import Conjuntos from './index';

function mockDropForm({ param }) {
  return <div data-testid="drop-form">{param}</div>;
}

mockDropForm.propTypes = {
  param: PropTypes.string,
};

jest.mock('./DropForm', () => mockDropForm);

describe('Conjuntos', () => {
  test('muestra la vista de agrupación y de inmueble', () => {
    render(<Conjuntos user={{ id: 1 }} conjunto={{ idconjunto: 2 }} />);

    expect(screen.getByText('Conjuntos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear Tipo Agrupacion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear Tipo Inmueble/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Crear Tipo Agrupacion/i }));
    expect(screen.getByTestId('drop-form')).toHaveTextContent('TipoAgrupacionesGeneral');

    fireEvent.click(screen.getByRole('button', { name: /Crear Tipo Inmueble/i }));
    expect(screen.getByTestId('drop-form')).toHaveTextContent('TipoInmueblesGeneral');
  });
});