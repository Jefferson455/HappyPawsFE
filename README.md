# HappyPawsFE – Frontend (Angular 19)

HappyPawsFE es el frontend del sistema veterinario HappyPaws. Construido con Angular 19 y basado en una arquitectura modular con servicios HTTP para consumir la API en .NET 8.

🎨 Tecnologías

Angular 19

TypeScript

PrimeNG

HTML/CSS

Angular Router

📌 Características

Interfaz responsiva tipo SPA

Módulo de clientes

Módulo de mascotas

Gestión de servicios veterinarios

Consumo directo del backend HappyPawsAPI

▶ Ejecución
npm install
ng serve -o


La aplicación estará disponible en:
http://localhost:4200

🌐 Consumo de API

Configurar la URL del backend en environment.ts:

export const environment = {
  apiUrl: 'http://localhost:5001'
};
