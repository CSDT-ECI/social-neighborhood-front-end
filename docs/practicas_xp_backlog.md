# Prácticas XP y Backlog de Acciones

## Tabla de Contenidos

- [9. Prácticas XP que aplicaríamos para mejorar calidad](#9-prácticas-xp-que-aplicaríamos-para-mejorar-calidad)
  - [9.1 Refactor continuo (Boy Scout en serio)](#91-refactor-continuo-boy-scout-en-serio)
  - [9.2 TDD (o al menos test-first) en partes nuevas](#92-tdd-o-al-menos-test-first-en-partes-nuevas)
  - [9.3 Integración Continua fuerte (CI)](#93-integración-continua-fuerte-ci)
  - [9.4 Pair programming](#94-pair-programming)
- [10. Backlog de acciones (cosas concretas para mejorar el proyecto)](#10-backlog-de-acciones-cosas-concretas-para-mejorar-el-proyecto)


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
