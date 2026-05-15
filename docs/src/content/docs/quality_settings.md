---
title: "Análisis de Calidad y Herramientas"
---

# Análisis de Calidad y Herramientas Automatizadas

## Introducción

La calidad del software es un pilar fundamental en el desarrollo de aplicaciones modernas. En este proyecto, se aplicó el modelo de calidad visto en clase, complementado con herramientas automatizadas para la detección temprana de vulnerabilidades y problemas técnicos. Esta sección documenta el proceso, resultados y conclusiones, integrando propuestas de mejora.

---

## Herramienta Utilizada: Dependabot

Dependabot es una herramienta de GitHub que automatiza la revisión de dependencias en proyectos, detectando vulnerabilidades y proponiendo actualizaciones. Su integración permite mantener el software seguro y actualizado, reduciendo riesgos y mejorando la calidad.

**¿Cómo funciona?**

- Escanea archivos de dependencias (como `package.json`).
- Detecta versiones vulnerables de librerías.
- Crea issues y pull requests para actualizar dependencias.
- Documenta cada hallazgo con detalles técnicos y recomendaciones.

---

## Issues Detectados por Dependabot

Durante el análisis, Dependabot reportó 4 issues: dos críticos y dos moderados.

### 1. Axios — SSRF y filtración de credenciales via URL absoluta

- **Descripción:** Axios permite realizar peticiones a URLs absolutas ignorando el `baseURL` configurado. Esto puede causar SSRF (Server-Side Request Forgery) y filtración de credenciales.
- **Riesgo:** Un atacante puede redirigir peticiones a servidores maliciosos y obtener información sensible.
- **Solución:** Actualizar Axios a la versión `0.30.3` o superior.

### 2. Axios — Denial of Service via `__proto__` en `mergeConfig`

- **Descripción:** El uso de la clave `__proto__` en objetos de configuración puede provocar un crash por `TypeError`, causando Denial of Service.
- **Riesgo:** Un atacante puede enviar configuraciones maliciosas y tumbar el servicio.
- **Solución:** Actualizar Axios a la versión `0.30.3` o superior.

### 3. Axios — Cross-Site Request Forgery (CSRF)

- **Descripción:** Axios incluye el token `XSRF-TOKEN` en todas las peticiones, exponiendo información sensible a hosts externos.
- **Riesgo:** Filtración de tokens de autenticación.
- **Solución:** Actualizar Axios a la versión `0.30.3` o superior.

### 4. Firebase SDK — Manipulación de `_authTokenSyncURL`

- **Descripción:** El SDK de Firebase permite manipular la URL de sincronización de tokens, lo que puede ser explotado para capturar sesiones de usuario.
- **Riesgo:** Robo de sesiones y datos de usuario.
- **Solución:** Actualizar Firebase a la versión `10.9.0` o superior.

---

## Análisis Complementario: Snyk

Snyk es una herramienta de análisis de seguridad que detecta vulnerabilidades en dependencias, prioriza riesgos y sugiere soluciones.

![Snyk Snapshot](https://i.postimg.cc/7Y2bt3FM/imagen-2026-03-15-150352908.png)

### Principales Vulnerabilidades

| Dependencia | Issues | Prioridad máx. | Solución |
|---|---|---|---|
| `react-scripts@4.0.3` | 60 transitivos | 828 | Actualizar a `react-scripts@5.0.0` |
| `axios@0.22.0` | 6 directos | 756 | Actualizar a `axios@0.30.0` |
| `firebase@9.23.0` | 2 transitivos | 559 | Actualizar a `firebase@10.9.0` |
| `material-ui-icons@1.0.0-beta.36` | 2 transitivos | — | Sin solución disponible |

**Ejemplos de vulnerabilidades detectadas:**

- `react-scripts`: Inefficient Algorithmic Complexity (`minimatch@3.0.4`), Directory Traversal (`rollup@1.32.1`), Symlink Attack (`tar@6.2.1`)
- `axios`: CSRF (CWE-352), ReDoS (CWE-1333), SSRF (CWE-918)
- `firebase`: Resource Exhaustion (`@grpc/grpc-js@1.7.3`), XSS (`@firebase/auth@0.23.2`)
- `material-ui-icons`: Information Exposure y Denial of Service (`node-fetch@1.7.3`)

---

## Resultados y Conclusiones

- El uso de Dependabot y Snyk permitió identificar vulnerabilidades críticas en dependencias clave.
- La actualización de estas librerías es esencial para mantener la seguridad y calidad del proyecto.
- La mayoría de los issues tienen solución disponible mediante actualización de dependencias.
- La integración de modelos de calidad y automatización mejora la robustez y confiabilidad del software.

---

**Autores:** Juan Camilo Posso Guevara · Juan Sebastian Buitrago Piñeros · Richard Santiago Urrea Garcia

[⬅ Volver al Índice Principal](./)
