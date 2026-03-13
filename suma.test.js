const suma = require('./suma');

test('sumar 1 + 2 es igual a 3', () => {
  expect(suma(1, 2)).toBe(3);
});

test('sumar números negativos', () => {
  expect(suma(-4, -6)).toBe(-10);
});

test('sumar números decimales', () => {
  expect(suma(2.5, 0.5)).toBe(3);
});