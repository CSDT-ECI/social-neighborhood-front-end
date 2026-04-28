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

---

## 7) Abstracción sin usar: `AuthContext` definido pero no conectado (Unutilized Abstraction)

### ¿Qué está pasando?

El proyecto tiene `src/context/AuthContext.js` con un `AuthContextProvider` y un reducer completo (`AuthReducer.js`) para gestionar el estado de sesión. Sin embargo, este proveedor **nunca se aplica** en `src/index.js` ni en `src/App.js`. Como consecuencia, todos los componentes leen el estado de sesión directamente desde `localStorage` en lugar de consumir el contexto.

### Evidencia en el código

- `src/index.js` renderiza `<App />` sin envolver en `<AuthContextProvider>`:

- `src/pages/adminDashboard/index.js` y `src/pages/residentDashoard/index.js` usan:
  ```js
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));
  ```
  en lugar de `useContext(AuthContext)`.
- `src/context/AuthReducer.js` define `LOGIN_START`, `LOGIN_SUCCESS`, `LOGIN_FAILURE` que no se despachan desde ningún componente activo.

### ¿Por qué es un problema de arquitectura?

Según la clasificación del estudio de Azadi et al. (2019), este patrón corresponde al smell **Unutilized Abstraction**: una abstracción existe en el diseño pero no cumple ningún rol en la ejecución real del sistema. El costo de mantenerla crece con el tiempo (tests, actualizaciones) sin aportar valor.

- Doble fuente de verdad para la sesión: el contexto y el `localStorage` pueden desincronizarse.
- Los desarrolladores nuevos pueden asumir que el contexto está activo y escribir código incorrecto.
- El código de `AuthReducer` y sus tests (`AuthReducer.test.js`, `AuthContext.test.js`) mantienen cobertura sobre lógica que no afecta al sistema real.

### Qué impacto tiene

- Falsa seguridad: parece que la autenticación está centralizada, pero no lo está.
- Esfuerzo de mantenimiento duplicado sin beneficio funcional.
- Dificulta migrar la gestión de sesión en el futuro.

### Recomendaciones

1. Envolver `<App />` con `<AuthContextProvider>` en `src/index.js`.
2. Reemplazar los `useState(JSON.parse(localStorage.getItem(...)))` en los dashboards por `useContext(AuthContext)`.
3. Despachar `LOGIN_SUCCESS` desde el flujo de login para que el estado fluya por el contexto.

---

## 8) God Component: `AdminDashboard` como controlador central de toda la aplicación

### ¿Qué está pasando?

El componente `src/pages/adminDashboard/index.js` acumula múltiples responsabilidades que deberían estar distribuidas: actúa como guardia de autenticación, controlador de navegación interna, selector de vista y consumidor de estado de sesión al mismo tiempo.

### Evidencia en el código

- Lee `user`, `conjunto` y `vivienda` directamente desde `localStorage`.
- Implementa `switchSection(param)` con un `switch` de 7 casos que decide qué componente renderizar.
- Lanza una alerta y redirige si el usuario no está autenticado (`useEffect` con `Swal.fire` + `window.location.replace`).
- Contiene `console.log` de depuración sobre el estado de sesión.
- Orquesta directamente: `<Feed>`, `<RegisterUser>`, `<Conjuntos>`, `<ConfigurarConjuntos>`, `<EditarUsuario>`, `<ZonasComunes>`, `<Leftbar>`, `<Rightbar>`.

### ¿Por qué es un problema de arquitectura?

Este patrón corresponde al smell **God Component** (también llamado Blob): un único componente que conoce y controla demasiadas partes del sistema. De acuerdo con el estudio de referencia, este smell está asociado a "Concern Overload" y "Feature Concentration", ya que un solo artefacto implementa múltiples concerns arquitectónicos (seguridad, navegación, estado, presentación).

- Un cambio en el flujo de autenticación obliga a tocar el dashboard.
- Un cambio en la estructura de navegación también obliga a tocar el dashboard.
- Ambos dashboards (`AdminDashboard` y `ResidentDashboard`) duplican el patrón de guarda de auth, en lugar de reutilizar una solución común.

### Qué impacto tiene

- Alta complejidad ciclomática en un solo componente.
- Dificultad para probar el componente de forma aislada.
- Acoplamiento entre lógica de negocio, seguridad y presentación.

### Recomendaciones

- Extraer la guarda de autenticación a un componente `<PrivateRoute>` reutilizable en `App.js`.
- Separar `switchSection` en un componente de enrutamiento interno (`<DashboardRouter>`).
- Dejar que el dashboard solo se ocupe de la estructura visual (layout).

---

## 9) Rutas sin protección: separación de concerns de seguridad ausente

### ¿Qué está pasando?

`src/App.js` registra todas las rutas de la aplicación como públicas, sin ningún mecanismo de control de acceso. La verificación de autenticación ocurre **dentro** de cada página, en un `useEffect` que se ejecuta **después** de que el componente ya se montó y renderizó.

### Evidencia en el código

- `src/App.js` expone `/AdminDashboard/`, `/ResidentDashboard/`, `/Conjuntos`, `/ConfigurarConjuntos`, `/EditarUsuario`, `/ZonasComunes` y `/Alquiler` sin ninguna comprobación de sesión.
- Además, rutas como `/Conjuntos` y `/ZonasComunes` están duplicadas: existen como rutas top-level en `App.js` **y** como secciones embebidas dentro de `AdminDashboard`, generando una estructura de navegación ambigua.
- La verificación de sesión en cada dashboard se hace así:
  ```js
  useEffect(() => {
      if (!currentUser) {
          Swal.fire(...).then(() => window.location.replace("/login"))
      }
  }, [...]);
  ```
  Esto renderiza el dashboard momentáneamente antes de redirigir.

### ¿Por qué es un problema de arquitectura?

Según la taxonomía del estudio de referencia, esto corresponde a una **Responsibility Violation (Separation of Concerns)**: la responsabilidad de controlar el acceso está dispersa en múltiples componentes en lugar de residir en la capa de enrutamiento. Adicionalmente, la duplicación de rutas genera **Ambiguous Interface**: existen dos caminos para llegar a la misma funcionalidad, con comportamientos distintos (una con guarda, la otra sin ella).

### Qué impacto tiene

- Un usuario no autenticado puede ver brevemente contenido protegido.
- Las rutas duplicadas generan confusión sobre qué camino es el correcto.
- Agregar una nueva sección requiere recordar actualizar tanto `App.js` como el `switchSection` del dashboard.

### Recomendaciones

- Implementar un componente `<PrivateRoute>` que verifique la sesión antes de renderizar.
- Eliminar las rutas top-level duplicadas de `App.js` (`/Conjuntos`, `/ZonasComunes`, etc.) que ya están controladas dentro del dashboard.
- Centralizar la lógica de redirección en el enrutador, no en `useEffect` de cada página.

---

## 10) Credenciales de infraestructura embebidas en el código fuente

### ¿Qué está pasando?

Las credenciales de Firebase (API key, proyecto, storage bucket, messaging sender ID, app ID) están escritas literalmente en `src/firebase/firebaseConfig.js` y forman parte del repositorio de código fuente. De la misma forma, la URL del backend de producción está hardcodeada en `src/index.js` junto a URLs alternativas comentadas.

### Evidencia en el código

- `src/firebase/firebaseConfig.js`:

- `src/index.js`:

### ¿Por qué es un problema de arquitectura?

Esto corresponde a una **Architecture Violation** y a una violación del principio de externalizar la configuración. Según la clasificación del estudio de referencia, la presencia de datos de infraestructura embebidos en el código es un smell de configuración que impacta la seguridad y la mantenibilidad. Cambiar de entorno (desarrollo, staging, producción) requiere modificar el código fuente en lugar de cambiar variables de entorno.

### Qué impacto tiene

- Riesgo de exposición de credenciales si el repositorio es público o se filtra.
- Imposibilidad de desplegar en múltiples entornos sin modificar el código.
- Los entornos de prueba y producción comparten la misma configuración de infraestructura.

### Recomendaciones

- Mover todas las credenciales a variables de entorno: `REACT_APP_FIREBASE_API_KEY`, `REACT_APP_API_BASE_URL`, etc.
- Leer la configuración en runtime desde `process.env`:
  ```js
  const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      ...
  };
  ```
- Agregar `.env` al `.gitignore` y proveer un `.env.example` como referencia para el equipo.

---

## 11) Dos backends sin capa de abstracción: Mezcla de Firebase y REST (Scattered Functionality / Ambiguous Interface)

### ¿Qué está pasando?

La aplicación usa dos sistemas de backend con naturalezas distintas: una API REST en Heroku (para usuarios, conjuntos, alquiler, zonas comunes) y Firebase Firestore (para publicaciones del Feed). Ambos son consumidos directamente desde los componentes de UI, sin ninguna capa de abstracción que unifique o aísle estas dependencias de infraestructura.

### Evidencia en el código

- `src/Components/Feed/index.js` importa directamente desde Firebase:
  ```js
  import {db, storage} from './../../firebase/firebaseConfig';
  db.collection('Post').orderBy(...).onSnapshot(...)
  ```
- `src/Components/RegisterUser/index.js`, `ZonasComunes/index.js`, `Alquiler/index.js`, `Leftbar/index.js` importan `axios` y construyen URLs con `window.$dir`.
- No existe ningún módulo `src/services/` que centralice el acceso a datos.

### ¿Por qué es un problema de arquitectura?

Según la taxonomía del estudio, esto corresponde a **Scattered Functionality**: la misma categoría de preocupación (acceso a datos / persistencia) está dispersa por múltiples componentes con dos mecanismos completamente distintos. También se puede clasificar como **Ambiguous Interface**: los consumidores de datos no tienen un contrato claro sobre cómo acceder a la información; algunos usan promesas de Axios, otros usan `onSnapshot` de Firebase con suscriptores.

### Qué impacto tiene

- Un cambio de proveedor (por ejemplo, migrar de Firebase a otro servicio) requiere tocar todos los componentes de UI.
- Probar la capa de datos requiere mockear tanto Axios como el SDK de Firebase en distintos lugares.
- La mezcla de patrones asíncronos (`async/await` con Axios vs. suscriptores de Firestore) aumenta la carga cognitiva.

### Recomendaciones

- Crear una capa `src/services/` con módulos separados:
  - `src/services/postService.js` (encapsula Firebase Firestore)
  - `src/services/userService.js`, `src/services/conjuntoService.js` (encapsulan Axios + REST)
- Los componentes solo llaman a funciones de servicio y no conocen qué infraestructura subyace.
- Esto permite reemplazar Firebase por otra solución sin tocar ningún componente de UI.
