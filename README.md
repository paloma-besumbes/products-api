# Products API

REST API for managing products, built with Node.js, Express and PostgreSQL.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- JavaScript (ES6)

---

## Project Structure

```
src/
├── app.js
├── index.js
├── db.js
├── routes/
│   └── products.routes.js
├── controllers/
│   └── products.controller.js
├── repositories/
│   └── products.repository.js
└── middlewares/
    └── validateProduct.js
```

---

## How to Run the Project (Local)

1. Install dependencies:

```bash
npm install
```

2. Make sure PostgreSQL is running locally and create the database:

```sql
CREATE DATABASE products_db;
```

3. Start the server:

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

## Health Check

**GET /health**

Response:

```json
{
  "status": "ok"
}
```

---

## API Endpoints

### GET /products
Supports pagination.

Example:

```
GET /products?page=1&limit=10
```

Response:

```json
{
  "page": 1,
  "limit": 10,
  "total": 25,
  "totalPages": 3,
  "count": 10,
  "data": []
}
```

---

### GET /products/:id

```
GET /products/1
```

---

### POST /products

Request body:

```json
{
  "name": "Keyboard",
  "price": 49.99,
  "quantity": 10
}
```

---

### PUT /products/:id
Replaces the entire product.

---

### PATCH /products/:id
Updates one or more fields of a product.

---

### DELETE /products/:id
Deletes a product by ID.

---

## Design Decisions

- Controllers handle request validation and HTTP responses.
- Repositories are responsible for database access and SQL queries.
- Pagination is implemented using LIMIT and OFFSET.
- Total count is calculated separately to support frontend pagination.

---

## Future Improvements

- Add authentication and authorization.
- Migrate the project to TypeScript.
- Add Docker support.
- Add automated tests.

