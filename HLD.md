# High-Level Design (HLD)

## 1. System Architecture
Foobu uses a typical 3-tier architecture with a React frontend, an Express Node.js backend, and a dual-database system (MongoDB and PostgreSQL).

## 2. Components
### Frontend (React)
- Single Page Application built with React 18, React Router v6, and Vite.
- Handles user interactions, recipe requests, and rendering of the UI.
- Makes asynchronous REST calls to the backend API.

### Backend (Node.js & Express)
- RESTful API server.
- Handles LLM integration (fetching generated recipes).
- Orchestrates data flow between the frontend and databases.

### Databases
- **MongoDB**: Used as a document store for saving generated recipes due to their variable JSON structure.
- **PostgreSQL**: Relational DB used to manage users, categories, and favorites, with foreign keys linking user actions to specific categories and recipes.

## 3. Data Flow
1. **Recipe Generation**: Frontend -> Backend -> LLM API -> Backend -> Frontend
2. **Save Recipe**: Frontend -> Backend -> MongoDB
3. **Favorite Recipe**: Frontend -> Backend -> PostgreSQL (JOINs across users and categories)
