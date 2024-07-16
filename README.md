# Blog Platform Backend

## Description
This backend application serves as a blogging platform with authentication features. It allows users to create, edit, and delete posts, comment on posts, and manage user accounts.

## Requirements
1. [Node.js](https://nodejs.org/) (version >= 14.0.0)
2. [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation
1. Clone the repo via this url
  ```
    git clone https://github.com/abeer93/blog-platform-backend.git
  ```
2. Enter inside the folder:
  ```
    cd blog-platform-backend
  ```
3. Create a `.env` file by running the following command:
  ```
    cp .env.example .env
  ```
4. generate JWT_SECRET:
  ```
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
5. Install various packages and dependencies:
  ```
    npm install
  ```
  ```
6. Run seeds to generate admin user
  ```
    npm run seed
  ```
7. Run test cases/
    before running next commands please make sure fill all database test variables which begin with DB_TEST_ in .env file.
  ```
    npm test
  ```
8. Run Servers
  ```
    npm start
  ```
9. to display the system UI please head to this front-end project 
  ```
    https://github.com/abeer93/blog-platform-frontend.git
  ```

## Postman Collection
For easier testing and development, you can use the provided Postman collection to interact with the APIs.

- Download the [Postman Collection](blog-platform.postman_collection.json).
- Import the collection into your Postman application.
- The collection includes pre-configured requests for all API endpoints in the project.
- Make sure to update environment variables within Postman (like `blog_base_url`, `token`) according to your local setup.


## Important Environment variables (dev)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `JWT_SECRET` | `string` | `local` | secret key to generate jwt tokens |
| `PORT` |`boolean`| `true` | server port |
| `MONGO_DB_HOST` | `string` | `localhost:27017` | Database host |
| `MONGO_DB_name` | `string` | `blog` | DB name to use |


### Docs & Help
- [Koa.js Documentation](https://koajs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)