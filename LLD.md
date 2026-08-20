# Low-Level Design (LLD)

## File-by-File Breakdown

### Backend (`/backend`)
- **`src/index.js`**: Application entry point, configures Express server, middleware, and registers route handlers.
- **`src/config/mongo.js`**: MongoDB connection setup and configuration.
- **`src/config/postgres.js`**: PostgreSQL connection pool setup.
- **`src/controllers/recipes.controller.js`**: Contains business logic for calling the LLM API, and CRUD operations for MongoDB recipes.
- **`src/controllers/favorites.controller.js`**: Logic for managing favorite recipes in PostgreSQL.
- **`src/routes/`**: Express routers that map HTTP methods and paths to controller functions.
- **`src/db/init.sql`**: SQL schema definitions for `users`, `categories`, and `favorites` tables.

### Frontend (`/frontend`)
- **`src/main.jsx`**: React application root, sets up React Router and renders the main App component.
- **`src/App.jsx`**: Main layout and routing configuration.
- **`src/pages/HomePage.jsx`**: Allows users to input ingredients, generate recipes, and save them.
- **`src/components/`**: Reusable UI components (buttons, inputs, recipe cards).
- **`src/api/`**: Axios or fetch wrapper functions to communicate with backend APIs.

## Database Schemas

### PostgreSQL
- **`users`**: `id` (PK), `name`, `email`
- **`categories`**: `id` (PK), `name`
- **`favorites`**: `id` (PK), `user_id` (FK), `category_id` (FK), `recipe_id`

### MongoDB
- **`recipes`**: `{ _id, title, region, spiceLevel, ingredients: [], steps: [] }`
