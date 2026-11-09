# BasketBloom

A full-stack grocery store: product catalogue, cart, checkout, order history, and an
admin panel for managing stock and fulfilling orders. React on the front, Express and
MongoDB behind it, with JWT auth separating shoppers from administrators.

## Architecture

```
project/            React + Vite client (Tailwind, React Router, Axios)
  src/components/     Home, CategoryPage, ProductCard, Cart, Profile
  src/components/auth/  Login, Signup
  src/components/admin/ AdminDashboard
  src/services/api.js   single Axios instance, attaches the JWT

backend/            Express API
  src/models/         User, Product, Order (Mongoose schemas)
  src/routes/         auth, users, products, orders
  src/middleware/     auth (JWT), adminAuth (role gate), errorHandler
  src/scripts/        createAdmin.js — seeds the first admin account
```

The client never talks to MongoDB. Everything goes through the API, and every mutating
route is behind `auth`; the product write routes and order-status route are behind
`adminAuth` on top of that.

## Data model

| Model | Fields of note |
| --- | --- |
| **User** | `username`, `email` (unique), hashed `password`, `phone`, `address`, `userType` — `user` or `admin` |
| **Product** | `name`, `description`, `price`, `category` (enumerated), `image`, `stock` |
| **Order** | `user` ref, `items[]` of `{ product, quantity, price }`, `total`, `paymentMethod`, a full delivery `address`, and a `status` enum |

## API

| Method | Route | Who |
| --- | --- | --- |
| `POST` | `/api/auth/register` | public |
| `POST` | `/api/auth/login` | public |
| `GET` | `/api/products`, `/api/products/:id` | public |
| `POST` `PUT` `DELETE` | `/api/products`, `/api/products/:id` | admin |
| `GET` | `/api/orders/my-orders` | signed-in user |
| `POST` | `/api/orders` | signed-in user |
| `GET` | `/api/orders` | admin |
| `PUT` | `/api/orders/:id/status` | admin |
| `GET` `PUT` | `/api/users/profile` | signed-in user |

## Running it

You need Node 18+ and a MongoDB instance (local or Atlas).

**Backend**

```bash
cd backend
npm install
cp .env.example .env     # then fill in MONGODB_URI and JWT_SECRET
npm run create-admin     # seeds the first admin account
npm run dev              # http://localhost:5000
```

**Frontend**

```bash
cd project
npm install
npm run dev              # http://localhost:5173
```

`npm run create-admin` seeds a development administrator. Change its password before
putting this anywhere public — it is a convenience for local work, not a real account.

## Known rough edges

- `routes/orders.js` and `routes/products.js` are superseded by `orderRoutes.js` and
  `productRoutes.js`; only the latter pair is mounted in `server.js`. The older files
  are dead code and should be deleted.
- `AdminDashboard.jsx` exists both in `components/` and `components/admin/`, and
  `Auth.jsx` overlaps with `auth/Login.jsx` and `auth/Signup.jsx`.
- `backend` depends on both `bcrypt` and `bcryptjs`; one of them can go.

## Credits

The application code originated as a group project and was authored collaboratively;
this repository is a cleaned-up copy. It is published for portfolio purposes rather
than as a maintained product.
