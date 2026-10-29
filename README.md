# Library.Frontend

Sistema de gestión de biblioteca desarrollado con Angular 19 - Frontend

## 🚀 Características

- **Angular 19** - Framework moderno con Standalone Components
- **Reactive Forms** - Formularios reactivos con validación
- **Lazy Loading** - Carga diferida de módulos para mejor rendimiento
- **Bootstrap 5.3** - Diseño responsive y moderno
- **TypeScript** - Tipado estático para código más seguro
- **Signals** - Sistema reactivo moderno de Angular
- **Proxy Configuration** - Configuración de proxy para desarrollo con HTTPS

## 📋 Requisitos Previos

- **Node.js** 18.x o superior
- **npm** 9.x o superior
- **Backend API** corriendo en `https://localhost:7099`

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/G22-Delis-Dev/Library.Frontend.git
cd Library.Frontend

# Instalar dependencias
npm install
```

## 🏃 Ejecución

### Modo Desarrollo (con proxy)
```bash
npm start -- --port 4201 --proxy-config proxy.conf.json
```

La aplicación estará disponible en: **http://localhost:4201**

### Modo Desarrollo (sin proxy)
```bash
npm start
```

La aplicación estará disponible en: **http://localhost:4200**

> **Nota:** Se recomienda usar el modo con proxy para evitar problemas de CORS y certificados HTTPS.

## 🏗️ Construcción

```bash
# Build de producción
npm run build

# Build de desarrollo con watch
npm run watch
```

Los archivos compilados se almacenarán en el directorio `dist/`.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios y modelos
│   │   ├── authors.service.ts   # Servicio HTTP para autores
│   │   ├── books.service.ts     # Servicio HTTP para libros
│   │   └── models.ts            # Interfaces TypeScript
│   ├── features/                # Módulos de funcionalidades
│   │   ├── authors/             # Gestión de autores
│   │   │   ├── author-form/     # Crear/editar autor
│   │   │   ├── author-list/     # Lista de autores
│   │   │   └── authors.routes.ts
│   │   └── books/               # Gestión de libros
│   │       ├── book-form/       # Crear/editar libro
│   │       ├── book-list/       # Lista de libros
│   │       ├── book-detail/     # Detalle de libro
│   │       └── books.routes.ts
│   ├── shared/                  # Componentes compartidos
│   │   └── navbar/              # Barra de navegación
│   ├── app.config.ts            # Configuración de la app
│   ├── app.routes.ts            # Rutas principales
│   └── app.ts                   # Componente raíz
├── environments/                # Variables de entorno
│   ├── environment.ts           # Desarrollo
│   └── environment.prod.ts      # Producción
├── index.html                   # Página HTML principal
├── main.ts                      # Punto de entrada
└── styles.scss                  # Estilos globales
```

## 🌐 Endpoints de la API

La aplicación consume los siguientes endpoints del backend:

### Libros
- `GET /api/books` - Listar todos los libros
- `GET /api/books/{id}` - Obtener un libro por ID
- `GET /api/books/{id}/authors` - Obtener autores de un libro
- `POST /api/books` - Crear un nuevo libro
- `PUT /api/books/{id}` - Actualizar un libro
- `DELETE /api/books/{id}` - Eliminar un libro

### Autores
- `GET /api/authors` - Listar todos los autores (con booksCount)
- `GET /api/authors/{id}` - Obtener un autor por ID
- `POST /api/authors` - Crear un nuevo autor
- `PUT /api/authors/{id}` - Actualizar un autor
- `DELETE /api/authors/{id}` - Eliminar un autor

## ⚙️ Configuración del Proxy

El archivo `proxy.conf.json` redirige las peticiones a tu API backend:

```json
{
  "/api": {
    "target": "https://localhost:7099",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Esto permite:
- ✅ Evitar problemas de CORS
- ✅ Manejar certificados HTTPS locales
- ✅ Simplificar las rutas en los servicios

## 🎨 Tecnologías Utilizadas

- **Angular 19.0.0** - Framework principal
- **TypeScript 5.6.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva
- **Bootstrap 5.3.0** - Framework CSS
- **Angular CLI 19.0.0** - Herramientas de desarrollo

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run watch` - Construye y observa cambios
- `npm test` - Ejecuta las pruebas unitarias

## 🔗 Enlaces

- **Repositorio Frontend**: https://github.com/G22-Delis-Dev/Library.Frontend
- **API Backend**: `https://localhost:7099`
- **Swagger UI**: `https://localhost:7099/swagger`

## 👨‍💻 Desarrollo

El proyecto utiliza:
- **Standalone Components** - Arquitectura moderna sin NgModules
- **Signals** - Para manejo de estado reactivo
- **Lazy Loading** - Para optimización de carga
- **HttpClient** - Para comunicación con la API
- **Reactive Forms** - Para formularios con validación

## 📄 Licencia

Este proyecto es parte de una prueba técnica.
