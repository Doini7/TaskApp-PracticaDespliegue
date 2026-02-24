# TaskApp — Práctica Docker & CI/CD

Aplicación web sencilla de gestión de tareas construida con **JavaScript vanilla** y **Vite**, diseñada como práctica para aprender desarrollo con contenedores y despliegue continuo.

## Estructura del proyecto

```
taskapp/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.js
│   ├── tasks.js
│   ├── tasks.test.js
│   └── style.css
├── nginx.conf
├── vite.config.js
├── package.json
└── README.md
```

## Desarrollo local (sin Docker)

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:3000)
npm run dev

# Ejecutar tests
npm run test

# Build de producción
npm run build
```

## Tests

Los tests están en `src/tasks.test.js` y cubren las funciones puras del módulo `tasks.js`:

- `createTask` — creación y validación
- `addTask` — inmutabilidad de la lista
- `toggleTask` — cambio de estado
- `removeTask` — eliminación
- `getStats` — cálculo de estadísticas

```bash
# Ejecutar una vez
npm run test

# Modo watch (re-ejecuta al guardar)
npm run test:watch
```