# CSDT – Primera Entrega 2026

# Participantes

- Juan Camilo Posso Guevara
- Juan Sebastian Buitrago Piñeros
- Richard Santiago Urrea Garcia

## Introducción

La deuda técnica es un concepto fundamental en la ingeniería de software, que representa los compromisos y atajos tomados durante el desarrollo de un sistema, los cuales pueden afectar negativamente la calidad, mantenibilidad y evolución del software a largo plazo. Este documento analiza el proceso de reducción de deuda técnica realizado en 2026 sobre un sistema legado, relacionando las acciones tomadas con modelos de calidad de software como ISO/IEC 25010 y explorando herramientas modernas, incluyendo inteligencia artificial, para mejorar la calidad del código.

## Deuda Técnica Identificada

Durante el análisis inicial, se detectaron los siguientes problemas de deuda técnica:

- **Duplicación de código:** fragmentos repetidos en diferentes módulos.
- **Mala organización de archivos y carpetas:** estructura poco clara y difícil de navegar.
- **Funciones demasiado largas:** dificultad para entender y mantener el código.
- **Falta de documentación:** ausencia de comentarios y documentación técnica.
- **Dependencias obsoletas:** uso de paquetes desactualizados o inseguros.
- **Pruebas insuficientes:** cobertura limitada de tests automatizados.

| Problema               | Impacto en el sistema                  |
| ---------------------- | -------------------------------------- |
| Duplicación de código  | Incrementa errores y dificulta cambios |
| Mala organización      | Reduce la mantenibilidad               |
| Funciones largas       | Dificulta la comprensión               |
| Falta de documentación | Obstaculiza el onboarding y soporte    |
| Dependencias obsoletas | Riesgo de seguridad y compatibilidad   |
| Pruebas insuficientes  | Menor confiabilidad y calidad          |

---

## Mejoras y Refactorización Realizadas en 2026

Las acciones tomadas para reducir la deuda técnica incluyeron:

- **Refactorización de funciones:** se dividieron funciones largas en componentes más pequeños y reutilizables.
- **Reorganización de carpetas y archivos:** se estableció una estructura modular y clara.
- **Eliminación de código duplicado:** consolidación de lógica repetida en funciones comunes.
- **Actualización de dependencias:** renovación de paquetes en `package.json` y `package-lock.json`.
- **Mejora de pruebas automatizadas:** se amplió la cobertura de tests, especialmente en archivos como `suma.test.js`.
- **Documentación técnica:** se añadieron comentarios y se actualizó el archivo `INFORME_DEUDA_TECNICA_CSDT-2026.md`.

| Acción realizada              | Resultado esperado                   |
| ----------------------------- | ------------------------------------ |
| Refactorización               | Código más legible y mantenible      |
| Reorganización                | Navegación y escalabilidad mejoradas |
| Eliminación de duplicados     | Reducción de errores y esfuerzo      |
| Actualización de dependencias | Mayor seguridad y compatibilidad     |
| Mejora de pruebas             | Mayor confiabilidad y calidad        |
| Documentación                 | Facilita soporte y onboarding        |

---

## Relación con Modelos de Calidad de Software (ISO/IEC 25010)

Las mejoras implementadas se alinearon con los modelos de calidad de software, especialmente ISO/IEC 25010 vistos en clase, en los siguientes aspectos:

[![ISO-drawio.png](https://i.postimg.cc/HLYqDjXY/ISO-drawio.png)](https://postimg.cc/18dCDmv2)

| Característica ISO 25010 | Mejora aplicada                 |
| ------------------------ | ------------------------------- |
| Mantenibilidad           | Refactorización, reorganización |
| Usabilidad               | Documentación, estructura clara |
| Fiabilidad               | Pruebas automatizadas           |
| Compatibilidad           | Actualización de dependencias   |

---

## Herramientas Utilizadas o Propuestas

Durante el proceso se emplearon y/o se proponen las siguientes herramientas:

[![Herramientas-drawio.png](https://i.postimg.cc/V6R5sJHK/Herramientas-drawio.png)](https://postimg.cc/G84bqmRD)

| Herramienta     | Función principal                  |
| --------------- | ---------------------------------- |
| GitHub Copilot  | Sugerencias inteligentes de código |
| ESLint/Prettier | Análisis y formateo                |
| Jest            | Pruebas automatizadas              |
| SonarQube       | Métricas de calidad                |
| Dependabot      | Actualización de dependencias      |
| JSDoc           | Documentación técnica              |

---

## Resultados Obtenidos

Tras la reducción de la deuda técnica, se obtuvieron varios resultados positivos en el sistema. En primer lugar, el código pasó a ser más limpio y modular, lo que facilita su comprensión y mantenimiento por parte de los desarrolladores. Además, se logró mejorar la cobertura de pruebas, permitiendo detectar errores de manera más temprana durante el desarrollo. También se actualizó y organizó la documentación, haciéndola más accesible para quienes trabajan en el proyecto. Como consecuencia de estas mejoras, se redujo el riesgo de errores y fallos en el sistema, y se hizo más sencillo incorporar nuevas funcionalidades en el futuro. En conjunto, estas acciones contribuyen a una mayor sostenibilidad y escalabilidad del software a largo plazo.

---

## Conclusiones

La reducción de deuda técnica es un proceso esencial para garantizar la calidad, sostenibilidad y evolución de sistemas legados. Las acciones realizadas en 2026 permitieron alinear el sistema con los estándares de calidad definidos por modelos como ISO/IEC 25010, mejorando la mantenibilidad, fiabilidad y usabilidad. El uso de herramientas modernas, especialmente aquellas basadas en inteligencia artificial, complementa y potencia el trabajo de los equipos de desarrollo, asegurando un software robusto y preparado para el futuro.

---

**¡Bienvenida la creatividad y la mejora continua en ingeniería de software!**
