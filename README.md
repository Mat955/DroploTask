# Navigation Management System

A Next.js application for managing navigation menus with drag & drop functionality, nested items support, and form validation.

Link to deployed version: https://droplo-nav.vercel.app/

## Features

- **Navigation List Management**

  - Display navigation items with labels and URLs
  - Drag & drop reordering
  - Edit and delete functionality
  - Nested menu items support

- **Form Management**

  - Create new navigation items
  - Edit existing items
  - Add nested sub-items
  - Form validation for required fields and URL format

- **User Experience**
  - Real-time updates
  - Local storage persistence
  - Responsive design
  - Error handling with toast notifications

## Tech Stack

- **Framework**: Next.js 15.0
- **Styling**: Tailwind CSS
- **Drag & Drop**: dnd-kit
- **Form Management**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks + Local Storage
- **Testing**: Playwright
- **Icons**: Heroicons

## Getting Started

1. Clone the repository
2. Install dependencies:
   bash
   npm install
3. Run the development server:
   bash
   npm run dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Playwright tests
- `npm run test:headed` - Run Playwright tests in headed mode

## Testing

The application includes comprehensive E2E tests using Playwright. Tests cover:

- Navigation item creation
- Nested item management
- Form validation
- Drag and drop functionality
- Item editing and deletion

To run tests:
bash
npm run test

## Project Structure

src/
├── app/ # Next.js app directory
├── components/ # React components
│ └── navigation/ # Navigation-specific components
├── hooks/ # Custom React hooks
├── tests/ # Playwright tests
└── types/ # TypeScript type definitions

## Key Components

1. **NavigationList**: Main component for displaying and managing navigation items
2. **NavigationForm**: Form component for creating/editing items
3. **NavigationItem**: Individual navigation item component
4. **SortableNavigationItem**: Drag & drop wrapper component

## State Management

The application uses React's useState and useEffect hooks for state management, with local storage persistence. The main state hook `useNavigationOperations` handles:

- Navigation items CRUD operations
- Form state management
- Drag & drop reordering
- Error handling
