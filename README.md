<h1 align="center">
  <br>
  <a href="https://github.com/omarx802/MiniERP"><img src="https://img.shields.io/badge/MiniERP-Full%20Stack%20ERP-blue"></a>
  <br>
  MiniERP
  <br>
</h1>

<h4 align="center">A Minimalist ERP System built with modern technologies.</h4>

<p align="center">
  <a href="https://fastapi.tiangolo.com/">
    <img src="https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white" alt="FastAPI">
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Next.js">
  </a>
  <a href="https://www.mysql.com/">
    <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" alt="React">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://shadcn.dev/">
    <img src="https://img.shields.io/badge/ShadCN-5B21B6?logo=tailwindcss&logoColor=white" alt="ShadCN">
  </a>
</p>

<p align="center">
  <a href="#overview">Overview</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#technologies">Technologies</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#license">License</a>
</p>

---

## Overview

**MiniERP** is a lightweight Enterprise Resource Planning (ERP) system designed for small to medium-sized businesses. With a focus on simplicity and extensibility, MiniERP offers a streamlined user interface and robust backend to handle core business functionalities.

---

## Installation

Follow these steps to install and run the project locally:

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```ini
   URL_DATABASE="your_url_database"
   GROQ_API_KEY="your_Groq_api_key_here"
   ```
5. Run the FastAPI server:
   ```bash
   uvicorn app:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the Application

- Backend API: `http://localhost:8000`
- Frontend: `http://localhost:3000`

---

## Technologies

MiniERP leverages the following technologies:

- **FastAPI**: For building the backend API.
- **SQLAlchemy**: For database management with MySQL.
- **Next.js**: For building the frontend application.
- **React**: For dynamic user interfaces.
- **TypeScript**: For type-safe frontend development.
- **ShadCN**: For beautiful and accessible UI components.

---

## Features

- **Authentication**: Token-based authentication system.
- **Dynamic Forms**: Streamlined data entry.
- **Responsive UI**: Optimized for desktop and mobile.
- **Customizable Modules**: Easily extend core functionality.
- **Database Integration**: MySQL for robust and scalable data management.

---

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute, report issues, or suggest new features through the [issues section](https://github.com/omarx802/MiniERP/issues) of this repository.


