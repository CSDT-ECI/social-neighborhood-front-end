import { getStringDataLocation } from './location';

describe('getStringDataLocation', () => {
  const residentUser = { tipoUsuario: 'Residente', id: 'user42' };
  const adminUser = { tipoUsuario: 'Administrador', id: 'adminUser1' };
  const vivienda = { idconjunto: 'conj10', idunidaddevivienda: 'uv5' };
  const conjunto = { idconjunto: 'conj10', idusuarioadministrador: 'adminUser1', id: 'conj10' };

  test('returns vivienda-based path for Residente', () => {
    const result = getStringDataLocation(residentUser, conjunto, vivienda);
    expect(result).toBe('conj10/user42/uv5');
  });

  test('returns conjunto-based path for non-Residente (Administrador)', () => {
    const result = getStringDataLocation(adminUser, conjunto, vivienda);
    expect(result).toBe('conj10/adminUser1/conj10');
  });

  test('returns conjunto-based path when user is undefined', () => {
    const result = getStringDataLocation(undefined, conjunto, vivienda);
    expect(result).toBe('conj10/adminUser1/conj10');
  });
});
