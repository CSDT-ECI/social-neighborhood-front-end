# Características de Clean Code y Principios de Programación

## Tabla de Contenidos

- [7. Características de Clean Code que no se están cumpliendo y recomendaciones](#7-características-de-clean-code-que-no-se-están-cumpliendo-y-recomendaciones)
- [8. Principios de programación: conclusiones de lo que NO se cumple (o está en riesgo)](#8-principios-de-programación-conclusiones-de-lo-que-no-se-cumple-o-está-en-riesgo)
  - [8.1 KISS (Keep it Simple)](#81-kiss-keep-it-simple)
  - [8.2 YAGNI (You Aren't Gonna Need It)](#82-yagni-you-arent-gonna-need-it)
  - [8.3 DRY (Don't Repeat Yourself)](#83-dry-dont-repeat-yourself)
  - [8.4 SOLID (como guía)](#84-solid-como-guía)

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
