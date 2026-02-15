# Bharat VISTAAR - Single Page Application

Bharat VISTAAR (Virtual Information System for Technology-led Agricultural Advancement and Rural-development) is a National Digital Public Infrastructure (DPI) for Agriculture. This repository contains the frontend source code for the VISTAAR web platform.

## 🚀 Key Features

- **Unified Dashboard**: Personalized crop health and weather alerts.
- **AI-Driven Advisories**: Advanced machine learning models for agricultural insights.
- **Multilingual Support**: Interface available in 22+ regional Indian languages.
- **Interactive States Section**: Information on how various states and partners integrate with the ecosystem.
- **Responsive Design**: Premium, pixel-perfect UI optimized for all devices.

## 🛠 Tech Stack

- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GoodWorkLabs-Team/Bharat-VISTAAR-Website.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` folder.

## 📂 Project Structure

- `src/components/layout/`: Global layout components (Navbar, Footer, Topbar).
- `src/components/sections/`: Individual page sections (Home, HowItWorks, Impact, States, Backing).
- `src/components/ui/`: Reusable UI components (Modals, Buttons).
- `src/Assets/`: Static SVGs and Images used in components.
- `public/`: Static assets served directly (Favicon, robots.txt).
- `.github/workflows/`: CI/CD deployment configurations.

---
Built with ❤️ for Indian Farmers.
