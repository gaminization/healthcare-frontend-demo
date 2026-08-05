# 📜 Changelog

All notable changes to the **WHO Global Surveillance & Health Hub** will be documented in this file.

---

## [2.1.0] - 2026-08-05

### Added
- **High-Resolution Medical Photography**: Integrated realistic photography assets for Polio, Malaria, Water Sanitation, Vaccine R&D, Exercise, Nutrition, Sleep, and Mental Health.
- **Unified Navigation Header (`Navbar.js`)**: Static global navigation header rendered at root router level across all pages.
- **Interactive Projects Hub**: Keyword search bar, category filtering buttons, funding progress bars, and modal details.
- **Volunteer Campaign Portal**: Campaign cards with open spots, location badges, requirements, and modal registration.
- **Multi-Language Support**: Complete English (`EN`), Spanish (`ES`), and French (`FR`) localization.

### Changed
- **Health Predictor Layout**: Redesigned quiz container into a 100% static CSS Grid (`860px x 440px`), eliminating layout shifting across questions.
- **Profile Synchronization**: Automated instant synchronization of diagnostic health quiz scores and volunteer applications to the user's Profile dashboard.

### Fixed
- **JWT Auth Middleware**: Corrected middleware export from Router object to standard JWT verification function.
- **Resilient Fallback Store**: Added in-memory persistence fallback for Auth, Health Scores, and Volunteering routes when database connections are unreachable.
- **Cleaned Loose Assets**: Removed duplicate root files (`src/Projects.js`, `src/Volunteering.js`, `src/HealthPredictor.js`, etc.) and consolidated images into `src/assets/images/` and `public/images/`.

---

## [1.0.0] - 2025-04-03
- Initial release of healthcare frontend demo platform.
