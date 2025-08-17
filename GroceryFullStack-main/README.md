# BasketBloom - Grocery Store Application

A full-stack grocery store application with user authentication and admin dashboard functionality.

## Features

- **User Authentication**: Signup and login for regular users
- **Admin Dashboard**: Single admin account with product management
- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage orders
- **Responsive Design**: Modern UI with Tailwind CSS

## Admin Credentials

The system uses a single admin account with the following credentials:
- **Email**: admin@basketbloom.com
- **Password**: admin123

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/grocery-store
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. Create the admin user:
   ```bash
   npm run create-admin
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project directory:
   ```bash
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`

## Usage

### Regular Users

1. Visit the application at `http://localhost:5173`
2. Click "Sign Up" to create a new account
3. Fill in your details and create an account
4. Login with your credentials
5. Browse products and add them to cart

### Admin Access

1. Login with admin credentials:
   - Email: admin@basketbloom.com
   - Password: admin123
2. You will be automatically redirected to the admin dashboard
3. Manage products, view orders, and monitor revenue

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Single admin account restriction
- Input validation and sanitization

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

## Project Structure

```
basketbloom/grofsd/f1/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── scripts/
│   │   └── server.js
│   ├── package.json
│   └── .env
└── project/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
    ├── package.json
    └── index.html
```

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running locally or update the MONGODB_URI in the .env file
2. **Port Already in Use**: Change the PORT in the .env file or kill the process using the port
3. **Admin User Already Exists**: The create-admin script will skip if the admin already exists

## Development

To add new features or modify existing ones:

1. Backend changes: Modify files in `backend/src/`
2. Frontend changes: Modify files in `project/src/`
3. Database changes: Update models in `backend/src/models/`

## License

This project is for educational purposes. 