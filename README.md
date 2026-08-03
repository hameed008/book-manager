# BookManager 📚  

Live Link - https://bookmanager.hameedkhan.pro/

##### Test Login Credential:
- Email - test123@gmail.com
- Pass -  Test@1234 

A full-stack web application designed to help users organize their personal library, track reading habits, and manage their collection with a clean, distraction-free interface. Built with modern web technologies focusing on performance, security, and a premium user experience.

## ✨ Core Features

* **Advanced Authentication:** 
  * Secure Email/Password registration.
  * Two-Step OTP Verification via email (Resend API).
  * **Stateful session management using secure, HTTP-only signed cookies.**
* **Library Management:** Complete CRUD functionality to add, edit, delete, and categorize books.
* **Reading Tracking:** Organize books into intuitive statuses: *Want to Read*, *Reading*, and *Completed*.
* **Custom Organization:** Tagging system for precise search and filtering capabilities.
* **Dashboard Analytics:** Real-time metrics displaying total books and reading progress.
* **Responsive UI/UX:** Built with a modern glassmorphism aesthetic, smooth transitions, dynamic gradients, and custom empty states.

## 🛠 Tech Stack

**Frontend (`/client`)**
* **Framework:** Next.js (App Router)
* **Library:** React, TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **API Client:** Axios (configured with `withCredentials: true`)

**Backend (`/server`)**
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Authentication & Security:** Stateful sessions, Signed Cookies (`cookie-parser`), Google Auth Library, bcrypt
* **Email Service:** Resend

---

## 📂 Project Structure

This repository is a monorepo containing both the frontend client and the backend API.

### `/server` (Backend Architecture)
Follows a modular MVC-style architecture for clean separation of concerns.

```text
server/
├── config/         # Database connections and third-party integrations (db.js)
├── controllers/    # Business logic for route endpoints (authController, bookController)
├── middleware/     # Custom Express middlewares (auth protection, error handling)
├── models/         # Mongoose schemas and database models (User, Book, OTP)
├── routes/         # Express route definitions pointing to controllers
├── services/       # Reusable modular functions (e.g., sendOtpService.js)
├── app.js          # Express app setup, cookie parsing, and CORS configuration
└── .env            # Server environment variables

```

### `/client` (Frontend Architecture)

Built using the Next.js App Router paradigm with a highly organized component-driven structure.

```text
client/
├── app/            # Next.js App Router pages (/, /dashboard, /login, /signup)
├── components/     # Modular React components
│   ├── auth/       # Authentication-related forms and components
│   ├── books/      # Book-specific UI (Forms, Cards, Lists)
│   ├── dashboard/  # Dashboard-specific metrics and views
│   ├── layout/     # Structural components (Navbar, Footer, Hero)
│   └── ui/         # Reusable base elements (Buttons, Inputs, Spinners)
├── hooks/          # Custom React hooks (useBooks, useAuth)
├── lib/            # Utilities and configurations (Axios apiClient setup)
├── public/         # Static assets like images and icons
├── types/          # TypeScript definitions and interfaces
├── middleware.ts   # Next.js Edge middleware for route protection
└── .env.local      # Client environment variables

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed and a [MongoDB](https://www.mongodb.com/) URI ready.

### 1. Clone the repository

```bash
git clone https://github.com/hmaeed008/book-manager.git
cd your-repo-name

```
### 2. Backend Setup

Open a terminal and navigate to the server directory:

```bash
cd server
npm install

```

Create a `.env` file in the `/server` directory:

```env
PORT=8000
DB_USERNAME=your_mongo_user
DB_PASSWORD=your_mongo_password
DB_NAME=bookmanager
SESSION_SECRET=your_secure_session_secret
RESEND_API_KEY=your_resend_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

```

Start the development server:

```bash
npm run dev

```

### 3. Frontend Setup

Open a **new** terminal window and navigate to the client directory:

```bash
cd client
npm install

```

Create a `.env.local` file in the `/client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the Next.js development server:

```bash
npm run dev

```

### 4. View the App

Open [http://localhost:3000](http://localhost:3000) in your browser. The frontend will securely communicate with your local backend running on port 8000 using signed cookies.

---
