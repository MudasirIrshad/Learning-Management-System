# Learning Management System (LMS)

## Overview
This **Learning Management System (LMS)** is a modern, feature-rich platform designed for online education. Built with **Next.js 14**, it provides a seamless experience for instructors and students, enabling course creation, video hosting, payments, and user authentication.

## Tech Stack
The LMS is powered by cutting-edge technologies to ensure performance, scalability, and security:
- **Next.js 14** – Frontend & Backend
- **TypeScript** – Type Safety
- **ShadCN** – UI Components
- **Tailwind CSS** – Styling
- **Prisma ORM** – Database Management
- **PostgreSQL** – Database
- **MUX Video** – Video Hosting
- **Clerk** – Authentication
- **UploadThing** – File Uploads
- **Stripe** – Payment Integration

## Features
### 🔹 Course Management
- Create, edit, and delete courses
- Organize lessons within courses
- Upload videos via **MUX Video**

### 🔹 User Authentication
- Secure login and registration via **Clerk**
- Role-based access control (Admins, Instructors, Students)

### 🔹 Payment System
- **Stripe** integration for paid courses
- Subscription-based and one-time payments

### 🔹 Video Hosting
- Seamless video streaming via **MUX**
- Secure access to course content

### 🔹 File Uploads
- **UploadThing** integration for secure file uploads
- Support for images, PDFs, and other learning materials

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js 18+**
- **PostgreSQL**
- **pnpm / npm / yarn**

### Clone Repository
```sh
  git clone https://github.com/your-repo/lms.git
  cd lms
```

### Install Dependencies
```sh
  pnpm install  # or npm install / yarn install
```

### Configure Environment Variables
Create a `.env` file based on `.env.example` and update your credentials.
```sh
  cp .env.example .env
```

### Migrate Database
```sh
  npx prisma migrate dev
```

### Run Development Server
```sh
  pnpm dev  # or npm run dev / yarn dev
```
Application will be available at `http://localhost:3000`.

## Deployment
For production, run:
```sh
  pnpm build && pnpm start
```
Ensure your environment variables are correctly set in your hosting platform.

## Contributing
1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License
This project is licensed under the MIT License.

---
🚀 **Enjoy building your LMS!**

