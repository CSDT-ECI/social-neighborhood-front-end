import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useForm from './useForm';

const FormHarness = ({ callback }) => {
  const { handleChange, handleSubmit, values } = useForm(callback);

  return (
    <form onSubmit={handleSubmit}>
      <input aria-label="idoc" name="idoc" value={values.idoc} onChange={handleChange} />
      <input aria-label="ndoc" name="ndoc" value={values.ndoc} onChange={handleChange} />
      <input aria-label="contraseña" name="contraseña" value={values.contraseña} onChange={handleChange} />
      <button type="submit">submit</button>
    </form>
  );
};

describe('useForm', () => {
  test('actualiza valores y ejecuta callback al enviar', () => {
    const callback = jest.fn();

    render(<FormHarness callback={callback} />);

    fireEvent.change(screen.getByLabelText('idoc'), { target: { name: 'idoc', value: '123' } });
    fireEvent.change(screen.getByLabelText('ndoc'), { target: { name: 'ndoc', value: '456' } });
    fireEvent.change(screen.getByLabelText('contraseña'), { target: { name: 'contraseña', value: 'abc' } });
    fireEvent.submit(screen.getByRole('button', { name: 'submit' }));

    expect(screen.getByLabelText('idoc')).toHaveValue('123');
    expect(screen.getByLabelText('ndoc')).toHaveValue('456');
    expect(screen.getByLabelText('contraseña')).toHaveValue('abc');
    expect(callback).toHaveBeenCalled();
  });
});