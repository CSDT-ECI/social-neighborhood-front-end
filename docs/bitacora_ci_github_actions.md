# Implementación de Integración Continua (IC)

## Proyecto
**Flujo documentado:** GitHub Actions ([.github/workflows/ci.yml](../.github/workflows/ci.yml))

## Objetivo

Documentar la implementación del proceso de Integración Continua solicitado para el proyecto, incluyendo:

- Build
- Unit Test
- Code Analysis con SonarCloud
- Paso adicional de valor para el proyecto

## Resumen del pipeline

El workflow definido en GitHub Actions ejecuta un job principal con los siguientes pasos:

1. **Checkout repository**  
   Descarga el código fuente de la rama en ejecución.

2. **Setup Node.js (v18)**  
   Configura el entorno de ejecución de Node requerido por el front-end.

3. **Install dependencies**  
   Instala dependencias con `npm install --legacy-peer-deps` para compatibilidad con el árbol actual de paquetes.

4. **Build project**  
   Ejecuta `npm run build` con `NODE_OPTIONS=--openssl-legacy-provider` para generar el artefacto de producción.

5. **Run unit tests**  
   Ejecuta `npm test -- --coverage` para validar pruebas unitarias y cobertura.

6. **SonarCloud Scan (Code Analysis)**  
   Corre el análisis estático en SonarCloud usando:
   - `sonar.projectKey=CSDT-ECI_social-neighborhood-front-end`
   - `sonar.organization=csdt-eci`
   - `sonar.host.url=https://sonarcloud.io`

7. **OWASP Dependency Check (Valor agregado de seguridad)**  
   Ejecuta análisis de dependencias vulnerables y genera reporte en formato HTML (`dependency-check-report`).

8. **ChatOps: Notify Teams (Valor agregado de colaboración)**  
   Envía notificación de finalización de pipeline a un canal de Microsoft Teams para visibilidad del equipo.

## Cobertura del requerimiento

Se valida el cumplimiento de la solicitud de la entrega:

- **Build:** Implementado.
- **Unit test:** Implementado.
- **Code Analysis en Sonar:** Implementado con SonarCloud.
- **Step adicional:** Implementado con enfoque doble:
  - OWASP Dependency Check (seguridad)
  - ChatOps Teams (comunicación operativa)

## Secrets/variables requeridas en GitHub

Para una ejecución correcta del pipeline, se deben configurar estos secrets en el repositorio:

- `SONAR_TOKEN`: token de autenticación de SonarCloud.
- `TEAMS_WEBHOOK_URL`: webhook del canal de Teams para notificaciones.

## Beneficios para el proyecto

- **Calidad continua:** cada cambio puede validarse con build y pruebas.
- **Detección temprana:** SonarCloud ayuda a detectar deuda técnica y problemas de mantenibilidad.
- **Seguridad preventiva:** OWASP Dependency Check detecta librerías con vulnerabilidades conocidas.
- **Feedback rápido al equipo:** Teams permite seguimiento en tiempo real del estado del pipeline.

## Observaciones de mejora recomendadas

- Agregar caché de dependencias (`actions/cache`) para reducir tiempo de ejecución.
- Publicar artefactos del reporte OWASP como artifact de GitHub Actions.
- Incluir protección por ramas con regla de Quality Gate de Sonar antes de merge a `main`.
- Separar jobs en paralelo (build/test/analysis) para optimizar tiempos.

## Evidencia técnica

- Definición del pipeline: [.github/workflows/ci.yml](../.github/workflows/ci.yml)
- Configuración de análisis: [sonar-project.properties](../sonar-project.properties)
- Informe principal: [INFORME_DEUDA_TECNICA_CSDT-2026.md](../INFORME_DEUDA_TECNICA_CSDT-2026.md)

---
[⬅ Volver al Índice Principal](../INFORME_DEUDA_TECNICA_CSDT-2026.md)