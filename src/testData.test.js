import { Users, Conjuntos, unidadesVivienda } from './testData';

describe('testData', () => {
  test('Users debe contener ids únicos', () => {
    const ids = Users.map((u) => u.id);
    const unique = new Set(ids);

    expect(unique.size).toBe(ids.length);
  });

  test('debe existir al menos un usuario Administrador', () => {
    const admins = Users.filter((u) => u.rol === 'Administrador');

    expect(admins.length).toBeGreaterThan(0);
  });

  test('Conjuntos y unidadesVivienda no deben estar vacíos', () => {
    expect(Conjuntos.length).toBeGreaterThan(0);
    expect(unidadesVivienda.length).toBeGreaterThan(0);
  });
});
