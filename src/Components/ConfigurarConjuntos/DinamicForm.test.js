import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DinamicForm from './DinamicForm';

test('DinamicForm adds rows and calls toggleNext on submit', () => {
  const toggleNext = jest.fn();
  render(<DinamicForm name="Test" type="Item" toggleNext={toggleNext} />);

  // initially one textbox input
  expect(screen.getAllByRole('textbox').length).toBe(1);

  // click add (icon button via its svg test id)
  const addIcon = screen.getByTestId('AddCircleTwoToneIcon');
  const addButton = addIcon.closest('button');
  fireEvent.click(addButton);

  // now should have more inputs
  expect(screen.getAllByRole('textbox').length).toBe(2);

  // submit form
  const confirm = screen.getByRole('button', { name: /Confirmar/i });
  fireEvent.click(confirm);

  expect(toggleNext).toHaveBeenCalled();
});
