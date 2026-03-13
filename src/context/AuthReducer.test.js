import AuthReducer from './AuthReducer';

describe('AuthReducer', () => {
  test('LOGIN_START debe activar isFetching y limpiar user', () => {
    const prev = { user: { id: 1 }, isFetching: false, error: false };

    const next = AuthReducer(prev, { type: 'LOGIN_START' });

    expect(next).toEqual({ user: null, isFetching: true, error: false });
  });

  test('LOGIN_SUCCESS debe guardar payload y limpiar flags', () => {
    const payload = { id: 11, email: 'test@mail.com' };

    const next = AuthReducer(
      { user: null, isFetching: true, error: false },
      { type: 'LOGIN_SUCCESS', payload }
    );

    expect(next).toEqual({ user: payload, isFetching: false, error: false });
  });

  test('LOGIN_FAILURE debe dejar error en true', () => {
    const next = AuthReducer(
      { user: { id: 11 }, isFetching: true, error: false },
      { type: 'LOGIN_FAILURE' }
    );

    expect(next).toEqual({ user: null, isFetching: false, error: true });
  });

  test('acción desconocida debe retornar el mismo state', () => {
    const prev = { user: { id: 3 }, isFetching: false, error: false };

    const next = AuthReducer(prev, { type: 'OTRA_ACCION' });

    expect(next).toBe(prev);
  });
});
