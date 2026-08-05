<div align="center">

# 🌐 World Health Organization (WHO) Global Surveillance & Health Hub

<p align="center">
  <b>A state-of-the-art, full-stack healthcare analytics, disease surveillance, and community action platform.</b>
</p>

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.16.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_7.0.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/gaminization/healthcare-frontend-demo)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

---

</div>

## 📌 Executive Overview

The **WHO Global Surveillance & Health Hub** provides real-time disease tracking, interactive health diagnostics, global outreach project management, and volunteer deployment. Built with a modern React frontend and a resilient Express/Node.js backend, the platform features seamless offline in-memory fallback stores, JWT authentication, and responsive multi-language localization.

---

## 🎨 Key Features & Modules

### 🗺️ 1. Interactive World Health Surveillance Map
- **Live Regional Indicators**: Interactive vector map rendering disease surveillance data (COVID-19, Oncology, Immune metrics) across 6 major global regions.
- **Dynamic Popup Diagnostics**: Instant regional case breakdowns with animated pulse indicators.
- **High-Resolution Vector Graphics**: Powered by local SVG landmass rendering for offline and online reliability.

### 🩺 2. Diagnostic Health Predictor Quiz
- **Static Grid Layout**: 100% fixed card bounds (`860px x 440px`) eliminating layout shifting.
- **Topic-Specific Visuals**: Topic-matched photography (Exercise, Nutrition, Sleep, Mental Health).
- **Automated Score Logging**: Instant calculation of radar metric breakdowns and automatic score saving to user profile history.

### 📋 3. Global Healthcare Programs & Projects
- **Interactive Search & Category Filters**: Filter global initiatives by domain (`Vaccination`, `Disease Control`, `Infrastructure`, `Research`).
- **Progress & Metrics Tracking**: Real-time budget progress bars, volunteer counts, and program detail modal popups.

### 🤝 4. WHO Volunteer Corps Portal
- **Campaign Recruitment**: Frontline medical, public health, and engineering volunteer campaigns.
- **Interactive Application Modal**: Streamlined application form.
- **Real-Time Profile Integration**: Submitted applications automatically update the user's Profile volunteering log and total hours counter.

### 📰 5. WHO News & Press Center
- **Categorized Releases**: Press briefings and policy updates with read-time indicators.
- **Article Reader Modal**: Popup reader for full press releases.

### 🔒 6. Auth & Profile Dashboard
- **JWT Security**: Token-based authentication with bcrypt password hashing.
- **Resilient Fallback**: Automatic in-memory data store fallback if database connection is unavailable.
- **Protected Profile Route**: User profile displaying score history line charts, volunteer logs, and security settings.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | React 18, React Router v6, Chart.js, React-Chartjs-2 |
| **Styling & Theme** | Vanilla CSS3 (Custom Design System, Light/Dark Modes, Glassmorphic UI) |
| **Backend Framework** | Node.js, Express.js |
| **Database & Security** | MongoDB, Mongoose ORM, JWT, BcryptJS |
| **Asset Pipeline** | High-Res WebP/PNG & SVG Vector Graphics |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v16.0.0` or higher (Tested on `v24.16.0`)
- **npm**: `v8.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/gaminization/healthcare-frontend-demo.git
cd healthcare-frontend-demo
```

### 2. Install Dependencies
```bash
# Install root (frontend) dependencies
npm install --legacy-peer-deps

# Install backend dependencies
cd backend && npm install --legacy-peer-deps && cd ..
```

### 3. Start the Application

#### Option A: Run Backend & Frontend Concurrently
```bash
# Terminal 1: Start Express Backend (Port 5000)
cd backend && npm start

# Terminal 2: Start React Frontend (Port 3000)
PORT=3000 BROWSER=none npm start
```

Access the application at **`http://localhost:3000`**.

---

## 📡 API Endpoints Architecture

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/auth/register` | `POST` | Public | Register new user & return JWT token |
| `/api/auth/login` | `POST` | Public | Authenticate credentials & return JWT token |
| `/api/auth/user` | `GET` | Private | Retrieve authenticated user profile |
| `/api/auth/password` | `PUT` | Private | Update current user password |
| `/api/health-scores` | `POST` | Private | Save diagnostic health score assessment |
| `/api/health-scores` | `GET` | Private | Retrieve user's health score history |
| `/api/health-scores/:id` | `DELETE` | Private | Delete specific health score record |
| `/api/volunteering` | `POST` | Private | Submit volunteer campaign application |
| `/api/volunteering` | `GET` | Private | Retrieve user's volunteer activity log |

---

## 📚 Complete Project Documentation

For deeper insight into architecture, data flow, and database models:

- [📐 Architecture Overview](./docs/ARCHITECTURE.md) - Internal system structure, data flow, and fallback mechanisms.

---

<div align="center">
  <sub>Built with ❤️ for Global Health Surveillance & Action.</sub>
</div>
