# Testing Debt en `social-neighborhood-front-end`

En este documento se describen las prácticas de *testing debt* identificadas en el proyecto, junto con ejemplos específicos.

## 1. Falta de Pruebas Unitarias
- **Observación**: No se han implementado pruebas unitarias para las funcionalidades principales del proyecto. Además, el archivo `suma.test.js` no está relacionado con la funcionalidad del proyecto.
- **Ejemplo**: A continuación, se muestra un ejemplo de cómo podrían implementarse pruebas unitarias para el componente `DropForm`:
  ```js
  // filepath: src/Components/Conjuntos/DropForm.test.js
  import { render, screen } from '@testing-library/react';
  import DropForm from './DropForm';

  test('renderiza el formulario correctamente', () => {
    render(<DropForm />);
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });
  ```
- **Impacto**: Los componentes críticos como `DropForm` y `ZonasComunes` no tienen cobertura de pruebas, lo que aumenta el riesgo de errores en producción.
- **Recomendación**: Escribir pruebas unitarias para componentes clave usando Jest y React Testing Library.

## 2. Dependencias Hardcodeadas
- **Observación**: Las llamadas a la API están directamente incrustadas en los componentes, dificultando la simulación de dependencias durante las pruebas.
- **Ejemplo**:
  ```js
  // filepath: src/Components/Conjuntos/DropForm.js
  axios.get(window.$dir + location + `/` + param)
    .then(res => setData(res.data))
    .catch(e => console.log("Error: :c " + e));
  ```
- **Impacto**: Esto hace que las pruebas sean menos aisladas y más propensas a fallar debido a dependencias externas.
- **Recomendación**: Abstraer las llamadas a la API en una capa de servicios.

## 3. Baja Cobertura de Pruebas
- **Observación**: No se han implementado pruebas para flujos críticos como la gestión de usuarios o el alquiler de zonas comunes.
- **Impacto**: La falta de cobertura aumenta el riesgo de regresiones.
- **Recomendación**: Priorizar la cobertura de pruebas en flujos críticos.

## 4. Ausencia de Pruebas de Integración
- **Observación**: No se han implementado pruebas de integración para verificar la interacción entre componentes.
- **Impacto**: Esto dificulta la detección de errores en la comunicación entre módulos.
- **Recomendación**: Usar herramientas como Cypress o Playwright para pruebas de integración.

---