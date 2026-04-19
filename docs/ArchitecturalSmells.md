# Architectural Smells — social-neighborhood-front-end

## 1) URLs y configuración repartidas (configuración “esparcida”)

### ¿Qué está pasando?
En el proyecto, la URL base del backend y las rutas se arman en muchos lugares del código. Eso hace que el “cómo se conecta el front con el back” quede repartido por varios componentes.

### Evidencia en el código
- En `src/index.js` se define un global:
  - `window.$dir="https://socialneighborhood.herokuapp.com/"`
- Luego, en varios archivos se usa `window.$dir + ...` para crear endpoints:
  - `src/Components/Conjuntos/DropForm.js` (GET/POST concatenando strings)
  - `src/pages/login/index.js` (URLs distintas según rol)
- Incluso hay un archivo donde se pone la URL completa otra vez:
  - `src/Components/Conjuntos/DropDeepForm.js` hace `axios.post('https://socialneighborhood.herokuapp.com/admin/' + param2, body)`.

### ¿Por qué es un problema de arquitectura?
Porque cuando la configuración está dispersa por todo el código:
- cambiar el backend (dominio, versión, ruta base) se vuelve un trabajo largo y riesgoso;
- aparecen inconsistencias (unos módulos apuntan a una URL, otros a otra);
- para pruebas, es más difícil “interceptar” o simular llamadas si cada componente arma sus URLs a su manera.

### Qué impacto tiene
- Más tiempo de mantenimiento.
- Más probabilidad de errores en despliegues.
- Dificulta pruebas y refactorizaciones.

### Qué haría para mejorarlo
- Usar variables de entorno: `REACT_APP_API_BASE_URL` en `.env`.
- Crear un cliente HTTP central:
  - `src/services/httpClient.js` con `axios.create({ baseURL })`
  - y que todos consuman ese cliente, no `axios` directo ni `window.$dir`.
- Crear “services” por módulo (usuarios, conjuntos, alquiler, etc.) para no repetir endpoints.

---

## 2) Componentes muy cargados: UI + lógica + API todo junto

### ¿Qué está pasando?
Hay componentes y páginas que no solo renderizan, sino que también:
- deciden reglas por rol,
- construyen payloads,
- llaman al backend,
- manejan errores,
- y además muestran alertas.

En otras palabras: el componente termina siendo “pantalla + controlador + integración” al mismo tiempo.

### Evidencia en el código
- `src/Components/Conjuntos/DropForm.js`:
  - calcula `currentstr` según tipo de usuario
  - arma el `body` según `param2`
  - hace `axios.get` y `axios.post`
  - y muestra alertas con `Swal.fire`
- `src/pages/login/index.js`:
  - pide usuario por email con API
  - guarda en `localStorage`
  - hace una llamada extra (`sendCache`)
  - decide redirecciones

### ¿Por qué es un problema de arquitectura?
Porque cuando todo queda dentro de UI:
- cuesta probar: para testear, tienes que montar el componente completo.
- cuesta reutilizar: si mañana otra pantalla necesita la misma lógica, terminas copiando.
- cuesta evolucionar: un cambio en API o reglas rompe pantallas, no solo “servicios”.

### Qué haría para mejorarlo
Separar en capas simples (sin “sobre-arquitecturar”):
1. **UI (components/pages)**: render y eventos.
2. **Servicios de aplicación (use-cases)**: decisiones, armado de datos.
3. **Servicios de infraestructura (API)**: llamadas HTTP.

---

## 3) Lógica repetida para rutas, manejo de errores y notificaciones

### ¿Qué está pasando?
Se repiten patrones en muchos archivos:
- construir URLs con strings,
- `axios.then/catch`,
- `console.log`,
- `Swal.fire` para mensajes.

Esto no es solo “código repetido”: significa que decisiones importantes (cómo reportamos errores, qué mensaje mostramos, cómo armamos endpoints) se están tomando muchas veces en distintos lugares.

### Evidencia
- Mucho `axios.*` directo en componentes (DropForms, Login, RegisterUser, Alquiler, Leftbar, ZonasComunes, etc.).
- Múltiples archivos calculan strings de contexto por rol:
  - `DropForm.js` tiene `getStringDataLocation` con `useCallback`
  - `ZonasComunes/index.js` tiene otra función parecida (otra forma de hacerlo)

### Por qué importa
- La app puede dar mensajes distintos para el mismo problema.
- Se hace difícil “estandarizar” UX y errores.
- Cambios como “mostrar un mensaje más claro cuando el backend responde 401” requieren tocar N archivos.

### Recomendación
- `httpClient` con interceptores (un solo lugar para manejar errores HTTP).
- Un helper reutilizable para construir el “context path” por rol:
  - por ejemplo `src/utils/buildUserContextPath.js`
- Un wrapper de notificaciones:
  - por ejemplo `src/ui/notify.js` (adentro usa Swal, pero el resto de la app no lo sabe)

---

## 4) Acoplamiento fuerte a `localStorage` (sesión distribuida por páginas)

### ¿Qué está pasando?
Varias páginas leen directamente `localStorage` como si fuera la fuente principal del estado de sesión.

### Evidencia
- `src/pages/residentDashoard/index.js`:
  - `JSON.parse(localStorage.getItem('user'))`, `conjunto`, `vivienda`
- `src/pages/adminDashboard/index.js`:
  - patrón similar

### Por qué es un problema de arquitectura
- Cada pantalla “re-implementa” la sesión.
- Si el storage está vacío o corrupto, el comportamiento queda repartido.
- A futuro, si se cambia el esquema del usuario guardado, hay que actualizar varias páginas.

### Qué haría para mejorarlo
- Crear un `AuthContext`/`SessionContext` (Context API o Zustand/Redux).
- Encapsular el acceso a storage:
  - `src/storage/session.js` con `getSession()`, `setSession()`, `clearSession()`
  - validación mínima del shape (para no romper en runtime)

---

## 5) Manejo de errores y “observabilidad” (logs) poco consistente

### ¿Qué está pasando?
El proyecto usa mucho `console.log` y a veces muestra Swal, a veces no. No hay un punto central que decida:
- cómo se reportan errores,
- qué mensaje ve el usuario,
- qué hacer ante 401/403,
- si hay reintentos/timeouts.

### Evidencia
- `console.log` en `DropForm.js`, `DropDeepForm.js`, `RegisterUser/index.js`, `Alquiler/index.js`, etc.

### Por qué importa
- Diagnosticar fallos en producción se vuelve difícil.
- El usuario recibe mensajes diferentes (o ninguno) dependiendo del componente.

### Recomendación
- Interceptores en Axios:
  - mapear errores a mensajes consistentes
  - manejar 401/403 de forma central (cerrar sesión/redirigir)
- Un logger simple que se pueda apagar en producción.

---

## 6) Mucho comportamiento controlado por strings (“contratos implícitos”)

### ¿Qué está pasando?
En algunos componentes, el comportamiento depende de strings como `param`, `param2`, `location`, etc. Por ejemplo, `DropForm` cambia su lógica cuando `param2 === "newTipoAgrupacion"`.

### Evidencia
- `src/Components/Conjuntos/DropForm.js`: lógica depende de `param2`
- En general: se pasan strings sin significado que significan cosas importantes.

### Por qué es un problema
- Si alguien cambia el nombre de un endpoint o de un parámetro, falla en runtime.
- Se hace difícil entender el contrato de un componente.

### Recomendación
- Reemplazar strings por constantes:
  - `const ACTIONS = { NEW_TIPO_AGRUPACION: 'newTipoAgrupacion', ... }`
- Mejor aún: dividir el componente en versiones más específicas por caso de uso.
