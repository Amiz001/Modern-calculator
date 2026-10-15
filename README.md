# 🧮 Modern Calculator

A sleek, glassmorphic calculator built with **React 19**, **Vite**, and **Tailwind CSS v4**. Engineered with a robust, safe mathematical evaluation engine and full physical keyboard support.

![Modern Calculator UI Preview](./screenshot.png)

---

## ✨ Features

- **🎨 Modern Glassmorphism Design**: Frosted glass card, gradient backdrop, ambient glow effects, and micro-interactions.
- **⚡ Safe Calculation Engine**: Evaluates standard arithmetic expressions with proper operator precedence (`×` and `÷` before `+` and `−`) without using dangerous `eval()`.
- **⌨️ Keyboard Navigation**: Full physical keyboard support for fast typing, including `Enter` for calculation, `Backspace` for deletion, and `Escape` for clearing.
- **📱 Fully Responsive**: Adapts seamlessly to smartphones, tablets, and desktop displays.
- **🛡️ Smart Input Protection**:
  - Automatically handles and replaces consecutive operators.
  - Prevents multiple decimal points in a single number.
  - Protects against division by zero.
  - Fixes floating-point precision quirks (e.g., `0.1 + 0.2 = 0.3`).
- **📜 Calculation History Line**: Displays the previous equation above the active result so you never lose track of your work.
- **♿ Accessible & Semantic**: Built with semantic `<button>` elements, focus rings, and proper ARIA labels.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & Graphics**: SVG

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amiz001/Modern-calculator.git
   cd Modern-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `0` – `9` | Enter numbers |
| `.` | Enter decimal point |
| `+`, `-`, `*`, `/` | Arithmetic operators (`+`, `−`, `×`, `÷`) |
| `%` | Calculate percentage |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character (DEL) |
| `Escape` | Clear display (AC) |

---

## 📂 Project Structure

```
modern-calculator/
├── public/
│   ├── favicon.svg          # Application icon
│   └── screenshot.png       # UI preview screenshot
├── src/
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── AmountDisplay.jsx # Calculation screen & history display
│   │   └── Button.jsx        # Semantic, animated calculator button
│   ├── utils/
│   │   └── calculator.js     # Safe arithmetic parsing & math engine
│   ├── App.jsx              # Main calculator layout & state management
│   ├── App.css              # Custom utility styles
│   ├── index.css            # Tailwind CSS directives
│   └── main.jsx             # React DOM entry point
├── index.html               # Main HTML document with SEO meta tags
├── screenshot.png           # Repository UI preview
├── package.json             # Scripts and dependencies
└── vite.config.js           # Vite configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
