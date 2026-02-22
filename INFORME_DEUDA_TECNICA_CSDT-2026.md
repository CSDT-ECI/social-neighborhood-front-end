# Participantes
* Juan Camilo Posso Guevara
* Juan Sebastian Buitrago Piñeros
* Richard Santiago Urrea Garcia

# Informe de Deuda Técnica para `social-neighborhood-front-end`

## Tabla de Contenidos

- [1. Problemas de Arquitectura](#1-problemas-de-arquitectura)
  - [1.1 Falta de Modularización](#11-falta-de-modularización)
  - [1.2 URLs de API Hardcodeadas](#12-urls-de-api-hardcodeadas)
  - [1.3 Falta de Gestión Consistente del Estado](#13-falta-de-gestión-consistente-del-estado)
- [2. Violaciones de Principios de Diseño](#2-violaciones-de-principios-de-diseño)
  - [2.1 Violaciones del Principio de Responsabilidad Única (SRP)](#21-violaciones-del-principio-de-responsabilidad-única-srp)
  - [2.2 Violaciones del Principio DRY](#22-violaciones-del-principio-dry)
  - [2.3 Violaciones del Principio KISS](#23-violaciones-del-principio-kiss)
- [3. Olores de Código](#3-olores-de-código)
  - [3.1 Funciones Largas](#31-funciones-largas)
  - [3.2 Estilos Inline Excesivos](#32-estilos-inline-excesivos)
  - [3.3 Logs de Consola en Código de Producción](#33-logs-de-consola-en-código-de-producción)
- [4. Riesgos de Mantenibilidad](#4-riesgos-de-mantenibilidad)
  - [4.1 Falta de Verificación de Tipos](#41-falta-de-verificación-de-tipos)
  - [4.2 Falta de Documentación](#42-falta-de-documentación)
  - [4.3 Acoplamiento Fuerte entre Componentes](#43-acoplamiento-fuerte-entre-componentes)
- [5. Problemas de Testabilidad](#5-problemas-de-testabilidad)
  - [5.1 Falta de Pruebas Unitarias](#51-falta-de-pruebas-unitarias)
  - [5.2 Dependencias Hardcodeadas](#52-dependencias-hardcodeadas)
- [6. Estrategias de Refactorización Sugeridas](#6-estrategias-de-refactorización-sugeridas)
  - [6.1 Extraer Funciones Utilitarias](#61-extraer-funciones-utilitarias)
  - [6.2 Introducir una Capa de Servicios](#62-introducir-una-capa-de-servicios)
  - [6.3 Usar Hooks Personalizados para la Gestión del Estado](#63-usar-hooks-personalizados-para-la-gestión-del-estado)
  - [6.4 Adoptar TypeScript](#64-adoptar-typescript)
  - [6.5 Mejorar la Cobertura de Pruebas](#65-mejorar-la-cobertura-de-pruebas)
- [7. Características de Clean Code que no se están cumpliendo y recomendaciones](#7-características-de-clean-code-que-no-se-están-cumpliendo-y-recomendaciones)
- [8. Principios de programación: conclusiones de lo que NO se cumple (o está en riesgo)](#8-principios-de-programación-conclusiones-de-lo-que-no-se-cumple-o-está-en-riesgo)
  - [8.1 KISS (Keep it Simple)](#81-kiss-keep-it-simple)
  - [8.2 YAGNI (You Aren't Gonna Need It)](#82-yagni-you-arent-gonna-need-it)
  - [8.3 DRY (Don't Repeat Yourself)](#83-dry-dont-repeat-yourself)
  - [8.4 SOLID (como guía)](#84-solid-como-guía)
- [9. Prácticas XP que aplicaríamos para mejorar calidad](#9-prácticas-xp-que-aplicaríamos-para-mejorar-calidad)
  - [9.1 Refactor continuo (Boy Scout en serio)](#91-refactor-continuo-boy-scout-en-serio)
  - [9.2 TDD (o al menos test-first) en partes nuevas](#92-tdd-o-al-menos-test-first-en-partes-nuevas)
  - [9.3 Integración Continua fuerte (CI)](#93-integración-continua-fuerte-ci)
  - [9.4 Pair programming](#94-pair-programming)
- [10. Backlog de acciones (cosas concretas para mejorar el proyecto)](#10-backlog-de-acciones-cosas-concretas-para-mejorar-el-proyecto)

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
## 7)  Características de Clean Code que no se están cumpliendo y recomendaciones

1. **Nombres significativos**:
   - **Observación**: Algunos nombres de variables y funciones no reflejan claramente su propósito.
   - **Recomendación**: Usar nombres descriptivos que indiquen la intención del código.

2. **Funciones pequeñas**:
   - **Observación**: Hay funciones largas que manejan múltiples responsabilidades.
   - **Recomendación**: Dividir las funciones en unidades más pequeñas y reutilizables.

3. **Evitar comentarios innecesarios**:
   - **Observación**: Algunos comentarios explican lo obvio en lugar de agregar valor.
   - **Recomendación**: Mantener los comentarios solo donde sean necesarios para aclarar la intención.

4. **Consistencia en el estilo**:
   - **Observación**: Hay inconsistencias en el formato del código (por ejemplo, uso de comillas simples y dobles).
   - **Recomendación**: Usar herramientas como Prettier o ESLint para estandarizar el estilo.

## 8) Principios de programación: conclusiones de lo que NO se cumple (o está en riesgo)

### KISS (Keep it Simple)
- *En riesgo* por mezcla de librerías/versions (MUI v4 + MUI v5).
- *Mejora concreta:* estandarizar dependencias y reducir redundancias.

### YAGNI (You Aren’t Gonna Need It)
- *En riesgo* si mantenemos paquetes duplicados para la misma necesidad (UI e íconos).
- *Mejora concreta:* quedarnos con lo mínimo que soporte los requerimientos reales.

### DRY (Don’t Repeat Yourself)
- *En riesgo* por el tamaño del proyecto y cantidad de features/pantallas.
- *Mejora concreta:* crear servicios/hooks/utils comunes para que el código no se copie/pegue.

### SOLID (como guía)
- *SRP y DIP* son los que más suelen romperse en React cuando no hay separación de capas.
- *Mejora concreta:* mover integración (API/Firebase) a servicios y dejar componentes más “limpios”.

---

## 9) Prácticas XP que aplicaríamos para mejorar calidad

### 1) Refactor continuo (Boy Scout en serio)
- No esperar a “la gran refactorización”.
- Mejoras pequeñas pero constantes por PR.

### 2) TDD (o al menos test-first) en partes nuevas
- Empezar por servicios y hooks (son más fáciles de probar).
- Luego componentes críticos.

### 3) Integración Continua fuerte (CI)
- El pipeline debería correr:
  - instalación limpia (npm ci)
  - build (npm run build)
  - tests (npm run test:ci)
  - (opcional) lint/format

### 4) Pair programming
- Ideal para tareas sensibles:
  - migración/estandarización de MUI
  - refactor de pantallas grandes
  - diseño de capa de servicios y hooks

---
## 10) Backlog de acciones (cosas concretas para mejorar el proyecto)
1. *Definir una sola versión de UI library* (MUI v4 o v5) y limpiar dependencias.
2. *Agregar scripts de testing* y correrlos en CI.
3. *Crear src/services/* para Axios/Firebase (unificar llamadas).
4. *Normalizar nombres y estructura* (consistencia en carpetas y naming).
5. *Eliminar artefactos que no aportan al front* (si no son necesarios).
6. *No versionar build/* si se confirma que es output generado.

---