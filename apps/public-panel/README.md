# Blog Platform - Public Panel

This is the public panel of the Blog Platform micro frontend application. It provides the public-facing interface for users to view blog posts, register, and login.

## Features

- View blog posts with pagination and filtering
- Search functionality
- Category-based filtering
- User registration and login
- Responsive design
- Module Federation integration

## Prerequisites

- Node.js (v14 or later)
- Angular CLI (v19 or later)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Module Federation

This application is configured to work with Module Federation, allowing it to share components and services with other micro frontends in the platform.

### Exposed Modules

- `PublicModule`: Main module containing the public panel routes and components

### Shared Dependencies

The following dependencies are shared across micro frontends:

- Angular Core
- Angular Common
- Angular Router
- Angular Forms
- Angular Platform Browser
- Angular Platform Browser Dynamic
- Angular Animations
- RxJS
- Bootstrap
- Font Awesome
- Chart.js
- ngx-toastr
- PrimeNG
- PrimeIcons

## Development

### Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── blog/
│   │       ├── blog-list/
│   │       └── blog-detail/
│   ├── app.component.ts
│   └── app.routes.ts
├── assets/
├── environments/
└── styles.scss
```

### Adding New Features

1. Create new components in the appropriate directory under `src/app/components/`
2. Update the routing configuration in `app.routes.ts`
3. Add any necessary services or models
4. Update the webpack configuration if exposing new modules

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
