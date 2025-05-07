# E-commerce Website Backend

This is the backend API for an e-commerce website built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login)
- Product management (CRUD operations)
- Category management
- Order processing
- Rating system
- Admin dashboard functionality

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eshop
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eshop
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)
- POST /api/products/:id/ratings - Add product rating

### Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get single category
- POST /api/categories - Create category (admin only)
- PUT /api/categories/:id - Update category (admin only)
- DELETE /api/categories/:id - Delete category (admin only)

### Orders
- GET /api/orders - Get all orders (admin) or user's orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create new order
- PATCH /api/orders/:id/status - Update order status (admin only)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "message": "Error message",
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field-name",
      "location": "body"
    }
  ]
}
```

## Development

To run the server in development mode with hot reloading:

```bash
npm run dev
```

## Production

To run the server in production mode:

```bash
npm start
```

## License

This project is licensed under the MIT License. 