# Product Requirements Document (PRD)

## 1. Product Overview
Foobu is a full-stack web application that allows users to input ingredients they have on hand and generates an authentic Indian recipe using an LLM. 

## 2. Key Features
- **Recipe Generation**: Users can enter a list of ingredients to get a generated recipe including title, region, spice level, ingredients, and steps.
- **Recipe Management**: Users can save generated recipes.
- **Categorization & Favorites**: Saved recipes can be marked as favorites. The app tracks favorite counts by category.

## 3. User Flows
1. User enters ingredients -> Generates recipe -> Saves recipe.
2. User browses saved recipes -> Filters by category.
3. User marks a recipe as a favorite -> Views favorite counts across categories.

## 4. Non-Functional Requirements
- **Performance**: The app should handle API responses quickly.
- **Reliability**: Should handle LLM API failures gracefully.
- **Security**: Environment variables (API keys, DB URIs) must be securely managed and never exposed to the client.
