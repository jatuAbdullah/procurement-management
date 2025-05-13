# Procurement Management System

## 📦 Overview

The **Procurement Management System** is a backend service designed to streamline and track procurement operations within a supply chain. It manages the lifecycle of an order from checklist creation to inspection, verification, and tracking—supporting multiple user roles.

---

## 👥 User Roles

- **Admin**: Owner of the system, manages all users and oversees operations.
- **Procurement Manager**: Creates orders, builds or assigns checklists, verifies inspections.
- **Inspection Manager**: Fills checklists, uploads inspection images, validates conditions before transport.
- **Client**: Can view order status and suggest requirements for transport (offline).

---

## 🔁 Workflow

1. **Client** submits order requirements (offline).
2. **Procurement Manager** creates the order and attaches a checklist (new or existing).
3. **Inspection Manager** fills the checklist, uploads images, and submits inspection.
4. **Procurement Manager** verifies the checklist and confirms the order.
5. **Admin** can monitor all operations and data.

---

## ✅ Features

- Authentication and role-based access
- Role management (Admin creates all users)
- Dynamic checklist creation with:
  - Boolean questions
  - Single & multiple choice
  - Text answers
  - Image uploads
- Inspection manager can fill and upload answers/images
- Checklist versioning (updates won’t affect old submissions)
- Order status tracking and updates

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JWT
- **File Upload**: Multer
- **Others**: bcrypt, dotenv

---

## 📁 Folder Structure
procurement-management/
├── controllers/ # Route controllers (e.g., auth, user, order, checklist, answer)
├── models/ # Mongoose schemas (e.g., User, Order, Checklist, Answer)
├── routes/ # API endpoints organized by feature
├── middlewares/ # Authentication and role-based access control
├── uploads/ # Uploaded images (handled via multer)
├── .env # Environment variables
├── server.js # Entry point of the application
└── package.json # Project metadata and dependencie


---

## 📌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` — Admin creates new users
- `POST /api/auth/login` — All users login

### 👥 Users
- `GET /api/users` — View all users
- `GET /api/users/:id` — View user by ID

### 📦 Orders
- `POST /api/orders` — Create an order
- `GET /api/orders` — Get all orders
- `GET /api/orders` — Get all orders
- `PUT /api/orders/:id/status` — Update order status

### 📋 Checklists
- `POST /api/checklists` — Create a checklist
- `GET /api/checklists` — List all checklists

### ✅ Answers
- `POST /api/answers/submit` — Submit filled checklist with optional image
- `GET /api/answers/:orderId` — Get filled answers by order

---

## 🚀 Getting Started

### 🔧 Install dependencies

```bash
npm install
