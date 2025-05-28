# NestJS Hexagonal Architecture + DDD Template

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Este es un template para microservicios basado en NestJS que implementa la Arquitectura Hexagonal (Ports and Adapters) junto con Domain-Driven Design (DDD). Está diseñado para ser utilizado como base para nuevos microservicios, proporcionando una estructura clara y organizada que facilita la implementación de los principios de Clean Architecture.

## Estructura del Proyecto

El proyecto sigue una estructura organizada según los principios de la Arquitectura Hexagonal y DDD:

```
src/
├── app/                    # Capa de aplicación (Controllers, Routes, Interceptors)
│   ├── controllers/        # Controladores HTTP
│   ├── interceptors/       # Interceptores para las peticiones
│   └── routes/             # Definición de rutas
├── context/                # Contextos acotados (Bounded Contexts)
│   ├── example/            # Ejemplo de contexto acotado
│   │   ├── application/    # Capa de aplicación
│   │   │   ├── ports/      # Puertos (interfaces) para la comunicación con el dominio
│   │   │   └── use-cases/  # Casos de uso de la aplicación
│   │   ├── domain/         # Capa de dominio
│   │   │   ├── class/      # Clases de dominio (entidades, value objects)
│   │   │   ├── errors/     # Errores específicos del dominio
│   │   │   ├── repositories/ # Interfaces de repositorios
│   │   │   └── services/   # Servicios de dominio
│   │   └── infrastructure/ # Capa de infraestructura
│   │       ├── dto/        # Data Transfer Objects
│   │       ├── entities/   # Entidades de ORM
│   │       ├── module/     # Módulos NestJS
│   │       ├── repositories/ # Implementaciones de repositorios
│   │       └── services/   # Implementaciones de servicios
│   └── shared/             # Código compartido entre contextos
│       └── infrastructure/ # Infraestructura compartida
│           ├── config/     # Configuraciones
│           ├── database/   # Configuración de base de datos
│           └── modules/    # Módulos compartidos
└── main.ts                 # Punto de entrada de la aplicación
```

## Cómo usar este template

1. **Clona este repositorio** para iniciar un nuevo microservicio:

- Se comunica con el exterior (bases de datos, APIs, etc.)

## Requisitos

- Node.js 18+
- Docker y Docker Compose (opcional)
- TypeScript

## Instalación

```bash
# Instalar dependencias
$ npm install

# Copiar archivo de ejemplo de entorno
$ cp .env.example .env

# Editar variables de entorno en .env
```

## Ejecución

```bash
# Desarrollo
$ npm run start

# Modo desarrollo con hot reload
$ npm run start:dev

# Producción
$ npm run start:prod
```

## Pruebas

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Docker

```bash
# Construir y ejecutar con Docker Compose
$ docker-compose up --build
```

## Contribución

1. Fork del repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

MIT License - vea [LICENSE](LICENSE) para detalles.
