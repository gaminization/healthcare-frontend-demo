# 🗺️ Project Roadmap & Milestones

This document outlines the strategic product vision and technical roadmap for the **WHO Global Surveillance & Health Hub**.

---

## 📌 Phase 1: Core Foundation & UI Unification (Completed - Q3 2026)
- [x] Full-stack architecture with React 18 frontend and Node/Express backend.
- [x] Static unified header navigation (`Navbar.js`) across all routes.
- [x] Multi-language support (`EN`, `ES`, `FR`).
- [x] Offline in-memory fallback persistence for zero-downtime authentication.
- [x] Static grid layout for Health Predictor quiz with zero layout shift.
- [x] Real-time synchronization of Health Scores and Volunteer Logs to Profile.

---

## 📌 Phase 2: Analytics & Real-Time Telemetry (Target: Q4 2026)
- [ ] **WebSockets Live Feed**: Real-time regional outbreak alerts streamed via Socket.io.
- [ ] **Export PDF Reports**: Downloadable WHO health assessment certificates for users.
- [ ] **Interactive Disease Heatmaps**: Choropleth maps rendered with D3.js / Leaflet.

---

## 📌 Phase 3: Global Expansion & Mobile Apps (Target: Q1 2027)
- [ ] **Progressive Web App (PWA)**: Full offline service worker caching for field workers.
- [ ] **Mobile App**: React Native mobile client for iOS and Android.
- [ ] **Expanded Localization**: Support for Arabic (`AR`), Chinese (`ZH`), and Russian (`RU`).
