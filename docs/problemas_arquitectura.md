# Problemas de Arquitectura

## Tabla de Contenidos

- [1. Problemas de Arquitectura](#1-problemas-de-arquitectura)
  - [1.1 Falta de Modularización](#11-falta-de-modularización)
  - [1.2 URLs de API Hardcodeadas](#12-urls-de-api-hardcodeadas)
  - [1.3 Falta de Gestión Consistente del Estado](#13-falta-de-gestión-consistente-del-estado)


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

[⬅ Volver al Índice Principal](../README.md)