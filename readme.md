# Proyecto de Automatización de Todoism

Este proyecto utiliza Playwright para automatizar pruebas de extremo a extremo para la aplicación Todoism. Las pruebas cubren funcionalidades como el inicio de sesión de usuario, la creación de tareas, la finalización de tareas y la limpieza de la lista de tareas.

## Estructura del Proyecto

```
todoism-automation/
├── data/
│   └── single-task.data.ts
├── pages/
│   ├── home.page.ts
│   ├── login.page.ts
│   └── todo-app.page.ts
├── tests/
│   └── todoism-test-suite-case.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Requisitos Previos

```
Node.js (>= 14.x)
npm (>= 6.x)
```

## Configuración

### 1. Clonar el repositorio:

```
git clone https://github.com/spb-patino/todoism-automation.git
cd todoism-automation
```

### 2. Instalar dependencias:

```
npm install
```

### 3. Instalar navegadores de Playwright:

```
npx playwright install
```

## Ejecutar Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```
npx playwright test
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.