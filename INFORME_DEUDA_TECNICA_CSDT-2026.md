# Participantes
* Juan Camilo Posso Guevara
* Juan Sebastian Buitrago Piñeros
* Richard Santiago Urrea Garcia

# Informe de Deuda Técnica para `social-neighborhood-front-end`

## 1. Problemas de Arquitectura

### 1.1 Falta de Modularización
- **Observación**: El proyecto mezcla lógica de negocio, componentes de UI y llamadas a la API acoplados dentro de los componentes de React (por ejemplo, `DropForm.js`, `ZonasComunes/index.js`).
- **Impacto**: Esto dificulta el mantenimiento, las pruebas y la escalabilidad del código.

- **Recomendación**: Separar las responsabilidades introduciendo capas:
  - **Capa de UI**: Enfocada en el renderizado y las interacciones del usuario.
  - **Capa de Servicios**: Manejo de llamadas a la API y lógica de negocio.
  - **Gestión de Estado**: Usar una biblioteca de gestión de estado centralizada (por ejemplo, Redux, Zustand) para el estado compartido.

### 1.2 URLs de API Hardcodeadas
- **Observación**: Las URLs de la API están hardcodeadas en múltiples archivos (por ejemplo, `window.$dir` en `DropForm.js`, `DropDeepForm.js`).
- **Impacto**: Cambiar la URL base de la API requiere modificar múltiples archivos, aumentando el riesgo de errores.
- **Recomendación**: Usar variables de entorno (`process.env`) para gestionar las URLs de la API.

### 1.3 Falta de Gestión Consistente del Estado
- **Observación**: El estado se gestiona localmente en los componentes usando `useState` y `useEffect`, lo que lleva a duplicaciones (por ejemplo, `currentUser`, `currentConjunto`).
- **Impacto**: El estado compartido es difícil de gestionar y sincronizar entre componentes.
- **Recomendación**: Introducir una solución de gestión de estado global (por ejemplo, Redux, Context API).

---

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

---

## 3. Olores de Código

### 3.1 Funciones Largas
- **Ejemplo**: `fetchData` en `DropForm.js` y `DropDeepForm.js` contiene múltiples responsabilidades.
- **Impacto**: Las funciones largas son más difíciles de entender y mantener.
- **Recomendación**: Dividir las funciones largas en funciones más pequeñas y reutilizables.

### 3.2 Estilos Inline Excesivos
- **Ejemplo**: Se usan estilos inline en múltiples componentes (por ejemplo, `Rightbar/index.js`).
- **Impacto**: Los estilos inline dificultan el mantenimiento de un estilo consistente.
- **Recomendación**: Usar módulos CSS o styled-components para un estilo consistente.

### 3.3 Logs de Consola en Código de Producción
- **Ejemplo**: Declaraciones de depuración `console.log` presentes en múltiples archivos (por ejemplo, `DropForm.js`, `Rightbar/index.js`).
- **Impacto**: Los logs innecesarios pueden saturar la consola y exponer datos sensibles.
- **Recomendación**: Eliminar las declaraciones `console.log` o usar una biblioteca de registro (por ejemplo, Winston).

---

## 4. Riesgos de Mantenibilidad

### 4.1 Falta de Verificación de Tipos
- **Observación**: El proyecto no usa TypeScript o PropTypes para la verificación de tipos.
- **Impacto**: Esto aumenta el riesgo de errores en tiempo de ejecución debido a tipos de datos incorrectos.
- **Recomendación**: Introducir TypeScript o PropTypes para una mejor seguridad de tipos.

### 4.2 Falta de Documentación
- **Observación**: Las funciones y componentes carecen de comentarios que expliquen su propósito.
- **Impacto**: Los nuevos desarrolladores tendrán dificultades para entender la base de código.
- **Recomendación**: Agregar comentarios JSDoc a las funciones y componentes.

### 4.3 Acoplamiento Fuerte entre Componentes
- **Observación**: Componentes como `DropForm` y `DropDeepForm` están fuertemente acoplados con sus componentes padre.
- **Impacto**: Los cambios en un componente pueden tener efectos en cascada.
- **Recomendación**: Desacoplar los componentes usando props y contextos de manera efectiva.

---

## 5. Problemas de Testabilidad

### 5.1 Falta de Pruebas Unitarias
- **Observación**: Solo existe un archivo de pruebas (`suma.test.js`), y prueba una función simple.
- **Impacto**: Los componentes críticos y la lógica de negocio no están probados, aumentando el riesgo de regresiones.
- **Recomendación**: Escribir pruebas unitarias para componentes y funciones clave usando Jest y React Testing Library.

### 5.2 Dependencias Hardcodeadas
- **Observación**: Las llamadas a la API están directamente incrustadas en los componentes (por ejemplo, `axios.get` en `DropForm.js`).
- **Impacto**: Esto dificulta la simulación de dependencias durante las pruebas.
- **Recomendación**: Abstraer las llamadas a la API en una capa de servicios para habilitar la simulación.

---

## 6. Estrategias de Refactorización Sugeridas

### 6.1 Extraer Funciones Utilitarias
- **Objetivo**: Lógica compartida como `getStringDataLocation`.
- **Acción**: Mover a un archivo de utilidades (por ejemplo, `src/utils/location.js`).

```javascript
// filepath: src/utils/location.js
export const getStringDataLocation = (user, conjunto, vivienda) => {
  return user?.tipoUsuario === 'Residente'
    ? `${vivienda.idconjunto}/${user.id}/${vivienda.idunidaddevivienda}`
    : `${conjunto.idconjunto}/${conjunto.idusuarioadministrador}/${conjunto.id}`;
};
```

### 6.2 Introducir una Capa de Servicios
- **Objetivo**: Llamadas a la API en `DropForm.js`, `DropDeepForm.js`, etc.
- **Acción**: Crear una capa de servicios para las interacciones con la API.

```javascript
// filepath: src/services/apiService.js
import axios from 'axios';

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

### 6.3 Usar Hooks Personalizados para la Gestión del Estado
- **Objetivo**: Lógica de estado repetida en componentes.
- **Acción**: Crear hooks reutilizables para la lógica de estado compartida.

```javascript
// filepath: src/hooks/useFetchData.js
import { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await fetchData(url);
      setData(result);
      setLoading(false);
    };
    load();
  }, [url]);

  return { data, loading };
};
```

### 6.4 Adoptar TypeScript
- **Objetivo**: Falta de seguridad de tipos.
- **Acción**: Migrar el proyecto a TypeScript para una mejor mantenibilidad.

### 6.5 Mejorar la Cobertura de Pruebas
- **Objetivo**: Componentes críticos como `DropForm`, `ZonasComunes`.
- **Acción**: Escribir pruebas unitarias e integrales.

---

## Conclusión

Abordar estos problemas mejorará significativamente la mantenibilidad, escalabilidad y testabilidad del proyecto `social-neighborhood-front-end`. Priorizar la refactorización de áreas de alto riesgo e introducir pruebas para prevenir regresiones.
