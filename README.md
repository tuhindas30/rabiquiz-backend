# RabiQuiz Backend API Server

## Tech Stack

- Node JS
- Express JS
- Mongoose JS
- TypeScript
- MongoDB

## API Routes

### /api/categories

- GET / to get all categories.
- GET /{categoryId} to get a category with `categoryId`.

### /api/questions

- GET / to get all questions.
- GET /{categoryId} to get all questions of category `categoryId`.
- GET /{categoryId}/{questionId} to get a question with `questionId` from category `categoryId`.

### /api/options

- GET / to get all options.
- GET /{categoryId} to get all options of category `categoryId`.
- GET /{categoryId}/{questionId} to get all options of question `questionId` from category `categoryId`
