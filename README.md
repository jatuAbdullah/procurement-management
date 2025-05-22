Here's your updated `README.md` with consistent formatting, clarity, and a polished presentation:

---

# 📦 Procurement Management System

A **backend service** designed to manage and streamline procurement workflows across multiple user roles—from order creation to inspection and final verification.

---

## 👥 User Roles

* **Admin**: Manages all users, checklists, and oversees procurement operations.
* **Procurement Manager**: Creates orders, attaches checklists, verifies inspections.
* **Inspection Manager**: Conducts inspections, fills checklists, uploads images.
* **Client** *(offline)*: Submits requirements and views order status.

---

## 🔁 Workflow

1. **Client** submits order requirements *(offline)*.
2. **Procurement Manager**:

   * Creates the order
   * Attaches a checklist (new or existing)
3. **Inspection Manager**:

   * Fills checklist
   * Uploads relevant inspection images
4. **Procurement Manager**:

   * Verifies submitted checklist
   * Confirms the order
5. **Admin**:

   * Monitors all activity
   * Manages system users and configurations

---

## ✅ Key Features

* 🔐 **JWT Authentication** and **role-based access control**
* 👤 **User & role management** (Admin-controlled)
* 📋 **Dynamic checklists** with:

  * Boolean fields
  * Single & multiple choice questions
  * Text input
  * Image uploads via Multer
* 📷 **Image upload support** for inspections
* 🔄 **Checklist versioning** to retain historical data integrity
* 📦 **Order status updates** and tracking

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT, bcrypt
* **File Upload**: Multer
* **Environment Config**: dotenv

---

## 📁 Folder Structure

```
procurement-management/
├── controllers/        # API logic
├── models/             # Mongoose schemas
├── routes/             # REST API endpoints
├── middlewares/        # Auth, error handling, role guards
├── uploads/            # Inspection image uploads
└── server.js           # Application entry point
```

---

## 📌 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` — Admin creates new users
* `POST /api/auth/login` — All roles login

### 👥 Users

* `GET /api/users` — List all users
* `GET /api/users/:id` — Get user by ID

### 📦 Orders

* `POST /api/orders` — Create a new order
* `GET /api/orders` — List all orders
* `GET /api/orders/:id` — Get order by ID
* `PUT /api/orders/:id/status` — Update order status

### 📋 Checklists

* `POST /api/checklists` — Create a new checklist
* `GET /api/checklists` — Get all checklists

### ✅ Answers

* `POST /api/answers/submit` — Submit filled checklist + image(s)
* `GET /api/answers/:orderId` — Retrieve submitted answers for an order

---

## 🚀 Getting Started

### 🔧 Install Dependencies

```bash
npm install
```

### 🟢 Run the Server

```bash
npm run dev  # for development with nodemon
# or
node server.js
```

### ⚙️ Environment Variables (`.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/procurement_db
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

Let me know if you'd like to include:

* Sample `.env` file
* Postman collection
* Frontend integration info
* Deployment guide (e.g., NGINX + PM2 + HTTPS)
