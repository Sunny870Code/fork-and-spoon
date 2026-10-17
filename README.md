# 🍲 Fork & Spoon

A modern, full-stack recipe-sharing and culinary community web application designed for home creators, artisan chefs, and food enthusiasts. Built with a sleek minimalist earthy aesthetic and a robust, secure backend architecture.

---

## 🚀 Live Demo & Screenshots
* **Live App URL:** https://fork-and-spoon-frontend.vercel.app/
* **Backend API URL:** https://fork-and-spoon.onrender.com

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js** (Component-driven UI & State Management)
* **Tailwind CSS** (Minimalist earthy styling & responsive design)
* **React Router** (Client-side page routing)
* **Axios** (HTTP client for API communication)

### **Backend & Database**
* **Node.js & Express.js** (RESTful API architecture)
* **MongoDB & Mongoose** (NoSQL database and schema modeling)

### **Security & Authentication**
* **JWT (JSON Web Tokens)** & **bcrypt** (Secure session and password management)
* **Google Identity Services (GSI)** (Google OAuth 2.0 / GAuth 2.0 integration)
* **Nodemailer** (Automated email delivery and OTP verification workflow)

---

## ✨ Key Features

* **Generalized Auth Engine:** Secure registration and sign-in featuring email/password flows, password hashing, Nodemailer OTP validation, token blacklisting, and Google OAuth 2.0.
* **Role-Based Access Control (RBAC):** Strict backend middleware and frontend route guarding that differentiate permissions between standard `users` and verified `creators/admins`.
* **Dynamic Media Integration:** Interactive recipe cards featuring automated regex-based YouTube video tutorial embedding alongside standard image uploads.
* **Responsive Creator Dashboard:** Dedicated publishing portals enabling verified creators to manage their recipes seamlessly.
* **Minimalist UI/UX:** Clean, distraction-free layouts built with Tailwind CSS, featuring collapsible instruction accordions and rich parchment color styling (`#faf9f6`, `#506650`, `#171914`).

---

## 📂 Project Architecture

```text
Generalised Auth System/
├── Backend/
│   ├── controllers/      # Route controllers (Auth, Recipes)
│   ├── models/           # Mongoose schemas (User, Recipe)
│   ├── routes/           # Express API endpoints
│   ├── middleware/       # RBAC, JWT verification, error handling
│   └── server.js         # Entry point for Express server
└── GAuth/
    └── frontend/
        └── Auth frontend/
            ├── src/
            │   ├── component/ # Reusable UI pieces (Navbar, RecipeCard, OTP)
            │   ├── pages/     # Views (Home, RecipeList, Register, SignIn, About)
            │   ├── services/  # API call handlers & Auth context
            │   └── App.jsx    # Root router setup
            └── package.json
1. Clone the Repository
Bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/your-repo-name.git](https://github.com/YOUR_GITHUB_USERNAME/your-repo-name.git)
cd "Generalised Auth System"
2. Setup the Backend
Bash
cd Backend
npm install
Create a .env file inside the Backend directory and add your configurations:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
GOOGLE_CLIENT_ID=your_google_client_id
Start the server:

Bash
npm run dev
3. Setup the Frontend
Bash
cd ../GAuth/frontend/Auth frontend
npm install
Create a .env file inside the frontend directory:

Code snippet
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
Start the frontend development server:

Bash
npm run dev
👤 Author
Kunal

GitHub Profile


---

### What to do next:
1. Replace `YOUR_GITHUB_USERNAME` and `your-repo-name` with your actual details.
2. Save the file.
3. Now run your git commands to stage, commit, and push:
   ```bash
   git add .
   git commit -m "docs: add professional README.md for fork and spoon project"
   git push origin main

