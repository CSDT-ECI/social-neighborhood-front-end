---
title: Inicio
nav_order: 1
permalink: /
---

# Bitácora CSDT — Social Neighborhood Front-End
{: .fs-9 }

Informe de Deuda Técnica y análisis de calidad del proyecto `social-neighborhood-front-end`.
{: .fs-6 .fw-300 }

---

## Participantes

| Nombre | GitHub |
|--------|--------|
| Juan Camilo Posso Guevara | [@JCPosso](https://github.com/JCPosso) |
| Juan Sebastian Buitrago Piñeros | — |
| Richard Santiago Urrea Garcia | [@RichardUG](https://github.com/RichardUG) |

**Institución:** [Escuela Colombiana de Ingeniería Julio Garavito](https://www.escuelaing.edu.co/es/)  
**Año:** 2026

---

## Tabla de Contenidos

| # | Sección | Descripción breve |
|---|---------|-------------------|
| 1 | [Problemas de Arquitectura](./problemas_arquitectura) | Falta de modularización, URLs hardcodeadas, gestión de estado |
| 2 | [Violaciones de Principios de Diseño](./violaciones_principios_diseno) | SRP, DRY y KISS |
| 3 | [Olores de Código](./olores_codigo) | Funciones largas, estilos inline, console.log en producción |
| 4 | [Riesgos de Mantenibilidad](./riesgos_mantenibilidad) | Falta de tipos, documentación y acoplamiento fuerte |
| 5 | [Problemas de Testabilidad](./problemas_testabilidad) | Falta de pruebas y dependencias hardcodeadas |
| 6 | [Estrategias de Refactorización](./estrategias_refactorizacion) | Servicios, hooks, TypeScript |
| 7 | [Clean Code y Principios](./principios_clean_code) | KISS, YAGNI, DRY, SOLID |
| 8 | [Prácticas XP y Backlog](./practicas_xp_backlog) | Refactor continuo, TDD, CI, pair programming |
| 9 | [Testing Debt](./deuda_tecnica) | Deuda de pruebas y cobertura |
| 10 | [Análisis de Calidad y Herramientas](./quality_settings) | Dependabot, Snyk, vulnerabilidades |
| 11 | [Evaluación DevEx (SPACE)](./devex_space_analysis) | Experiencia del desarrollador y productividad |
| 12 | [Integración Continua (CI)](./bitacora_ci_github_actions) | GitHub Actions, SonarCloud, OWASP |
| 13 | [Vibe Coding + Spec-Driven Dev](./vibe_coding_spec_driven) | Prácticas, ventajas y retos |
| 14 | [Architectural Smells](./ArchitecturalSmells) | 11 smells arquitectónicos identificados |

---

## Resumen Ejecutivo

El proyecto `social-neighborhood-front-end` es una aplicación React que sirve de interfaz al sistema Social Neighborhood. El análisis de deuda técnica realizado identificó problemas en cuatro dimensiones principales:

### Arquitectura
- URLs y configuración dispersas por todo el código (`window.$dir`).
- Componentes que mezclan UI, lógica de negocio y llamadas a API.
- `AuthContext` definido pero nunca conectado (Unutilized Abstraction).
- Credenciales de infraestructura embebidas en el código fuente.

### Calidad
- Ausencia de pruebas unitarias en componentes críticos.
- Dependencias desactualizadas con vulnerabilidades conocidas (Axios, Firebase).
- Mezcla sin capa de abstracción de dos backends: REST (Heroku) y Firebase Firestore.

### Mantenibilidad
- Acoplamiento fuerte a `localStorage` para la sesión.
- Lógica repetida para rutas, errores y notificaciones.
- Uso extensivo de `console.log` en código de producción.

### Integración Continua
- Pipeline implementado en GitHub Actions con build, tests, SonarCloud y OWASP Dependency Check.

---
