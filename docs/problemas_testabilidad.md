# Problemas de Testabilidad

## Tabla de Contenidos

- [5. Problemas de Testabilidad](#5-problemas-de-testabilidad)
  - [5.1 Falta de Pruebas Unitarias](#51-falta-de-pruebas-unitarias)
  - [5.2 Dependencias Hardcodeadas](#52-dependencias-hardcodeadas)


## 5. Problemas de Testabilidad

### 5.1 Falta de Pruebas Unitarias
- **Observación**: Solo existe un archivo de pruebas (`suma.test.js`), y prueba una función simple.
- **Impacto**: Los componentes críticos y la lógica de negocio no están probados, aumentando el riesgo de regresiones.
- **Recomendación**: Escribir pruebas unitarias para componentes y funciones clave usando Jest y React Testing Library.

### 5.2 Dependencias Hardcodeadas
- **Observación**: Las llamadas a la API están directamente incrustadas en los componentes (por ejemplo, `axios.get` en `DropForm.js`).
- **Impacto**: Esto dificulta la simulación de dependencias durante las pruebas.
- **Recomendación**: Abstraer las llamadas a la API en una capa de servicios para habilitar la simulación.

[⬅ Volver al Índice Principal](../INFORME_DEUDA_TECNICA_CSDT-2026.md)