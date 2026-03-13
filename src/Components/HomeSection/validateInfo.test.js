import validateInfo from './validateInfo';

describe('validateInfo', () => {
  test('debe retornar errores requeridos cuando todo está vacío', () => {
    const errors = validateInfo({ username: '', email: '', message: '' });

    expect(errors).toEqual({
      username: 'Username required',
      email: 'Email required',
      message: 'Message is empty',
    });
  });

  test('debe marcar username inválido cuando solo tiene espacios', () => {
    const errors = validateInfo({
      username: '   ',
      email: 'correo@dominio.com',
      message: 'Hola',
    });

    expect(errors.username).toBe('Username required');
  });

  test('debe marcar email inválido con formato incorrecto', () => {
    const errors = validateInfo({
      username: 'Santi',
      email: 'correo-invalido',
      message: 'Hola',
    });

    expect(errors.email).toBe('Email address is invalid');
  });

  test('debe marcar mensaje vacío cuando no hay contenido', () => {
    const errors = validateInfo({
      username: 'Santi',
      email: 'correo@dominio.com',
      message: '',
    });

    expect(errors).toEqual({ message: 'Message is empty' });
  });

  test('no debe retornar errores con datos válidos', () => {
    const errors = validateInfo({
      username: 'Santi',
      email: 'correo@dominio.com',
      message: 'Todo bien',
    });

    expect(errors).toEqual({});
  });
});
