# Violaciones de Principios de Diseño

## Tabla de Contenidos

- [2. Violaciones de Principios de Diseño](#2-violaciones-de-principios-de-diseño)
  - [2.1 Violaciones del Principio de Responsabilidad Única (SRP)](#21-violaciones-del-principio-de-responsabilidad-única-srp)
  - [2.2 Violaciones del Principio DRY](#22-violaciones-del-principio-dry)
  - [2.3 Violaciones del Principio KISS](#23-violaciones-del-principio-kiss)

## 2. Violaciones de Principios de Diseño

### 2.1 Violaciones del Principio de Responsabilidad Única (SRP)
- **Ejemplo**: `DropForm.js` maneja el renderizado de UI, llamadas a la API y gestión del estado.
- **Impacto**: Los componentes son más difíciles de probar y mantener.
- **Recomendación**: Dividir las responsabilidades en componentes o hooks más pequeños y enfocados.

### 2.2 Violaciones del Principio DRY
- **Ejemplo**: Lógica repetida para `getStringDataLocation` en múltiples archivos (`DropForm.js`, `ZonasComunes/index.js`, `Alquiler/index.js`).
- **Impacto**: La duplicación de código aumenta el riesgo de inconsistencias.
- **Recomendación**: Extraer la lógica compartida en funciones utilitarias o hooks personalizados.

### 2.3 Violaciones del Principio KISS
- **Ejemplo**: Renderizado condicional complejo en `DropForm.js` y `ZonasComunes/index.js` (por ejemplo, operadores ternarios anidados).
- **Impacto**: La legibilidad del código se reduce, dificultando la depuración.
- **Recomendación**: Simplificar los condicionales dividiéndolos en funciones más pequeñas.
