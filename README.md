🐾 HappyPaws Frontend
Description

HappyPaws is a web-based veterinary management system designed to streamline daily operations such as client registration, pet management, grooming services, and boarding.
This repository contains the frontend application, built with Angular 19 and PrimeNG, following a modular and scalable architecture.

🏗️ Project Architecture

The project follows a modular structure based on features and shared components to ensure maintainability, scalability, and separation of concerns.

src/
├── app/
│   ├── core/                # Authentication, guards, interceptors
│   ├── shared/              # Reusable UI components and utilities
│   ├── features/            # Main business modules
│   │   ├── clients/         # Manage clients (owners)
│   │   ├── pets/            # Pet registration and details
│   │   ├── grooming/        # Grooming service scheduling
│   │   ├── boarding/        # Boarding management
│   │   └── dashboard/       # Admin overview and reports
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
│   ├── images/              # Static assets and logos
│   └── styles/              # Global styles and theme
├── environments/
│   ├── environment.ts       # Development environment
│   └── environment.prod.ts  # Production environment
└── index.html

⚙️ Technologies Used

Angular 19 – Component-based frontend framework

PrimeNG – UI component library

TypeScript – Strongly typed language for better maintainability

RxJS – Reactive programming for handling async data

HTML5 / SCSS – For structure and styling

Node.js & npm – Package management and build environment

🚀 Getting Started
Prerequisites

Ensure you have the following installed:

Node.js
 (v20+ recommended)

Angular CLI

A running backend instance of HappyPaws API (.NET 8)

Installation
# Clone repository
git clone https://github.com/Jefferson455/HappyPawsFE.git

# Navigate to project folder
cd HappyPawsFE

# Install dependencies
npm install

🧩 Development Server

Run the development server:

ng serve


Then open your browser at:
👉 http://localhost:4200/

The app will automatically reload when changes are made to the source files.

🧱 Build for Production

To build the project for production:

ng build --configuration production


The build artifacts will be stored in the dist/ directory.

🔐 Environment Variables

Edit /src/environments/environment.ts and /src/environments/environment.prod.ts to configure API endpoints:

export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};

🧭 Code Guidelines

Follow Angular style guide conventions.

Use feature-based modules for scalability.

Keep components small, reusable, and well-documented.

Implement Reactive Forms for input handling.

Follow clean commit messages and branch naming conventions.

🧪 Testing

To execute unit tests:

ng test


To execute end-to-end tests:

ng e2e

👨‍💻 Contributors

Jefferson Guzmán – Software Engineering Student

Collaborators: Jhonnier Castro

📄 License

This project is part of the Software Architecture and Design Project at Fundación Universitaria Compensar.
For educational and academic purposes only.
## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
