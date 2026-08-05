# 🤝 Contributing Guidelines

Thank you for contributing to the **World Health Organization (WHO) Global Surveillance & Health Hub**! 

---

## 1. Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for all contributors. Please treat fellow maintainers and community members with respect and courtesy.

---

## 2. Getting Started

### Step 1: Fork & Clone
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/healthcare-frontend-demo.git
   cd healthcare-frontend-demo
   ```

### Step 2: Branch Naming Conventions
Create a descriptive branch for your work:
- `feature/short-description` (for new features)
- `bugfix/issue-description` (for bug fixes)
- `docs/update-readme` (for documentation)

```bash
git checkout -b feature/add-analytics-dashboard
```

---

## 3. Coding Standards & Guidelines

- **JavaScript/React**: Use modern ES6+ syntax and functional React components with Hooks.
- **CSS**: Use vanilla CSS with CSS variables (`:root`, `.dark-mode`) defined in `src/App.css` and component-specific CSS files.
- **State Management**: Use React Context API (`AuthContext`, `HealthScoreContext`, `VolunteeringContext`).
- **No Direct DOM Mutations**: Always update state immutably.

---

## 4. Submitting Pull Requests

1. Ensure all tests pass:
   ```bash
   npm test
   ```
2. Commit your changes with descriptive messages:
   ```bash
   git commit -m "Add interactive search bar to Projects component"
   ```
3. Push to your fork and submit a Pull Request to the `main` branch.
4. Describe the changes, motivation, and test results in your PR description.
