# Swahili4Dyslexia

An web-based system designed to help people with dyslexia learn Swahili. The application features dyslexia-friendly UI elements and accessibility options to make learning more comfortable and effective.

## Features

- Dyslexia-friendly font support (OpenDyslexic)
- Adjustable text sizes (Small, Medium, Large)
- Text-to-speech functionality
- Progress tracking
- Accessibility settings including:
  - High contrast mode
  - Word spacing adjustments
  - Reading line guides
  - Word-by-word audio feedback

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Swahili4Dyslexia.git
```

2. Navigate to the project directory:
```bash
cd Swahili4Dyslexia
```

3. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

To create a production build:
```bash
npm run build
```

This will create a `build` folder with the optimized production files.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── StartLearning.jsx
│   │   ├── Progress.jsx
│   │   └── Settings.jsx
│   ├── styles/
│   │   ├── Home.css
│   │   ├── Progress.css
│   │   ├── Settings.css
│   │   └── Navigation.css
│   └── context/
│       └── FontSizeContext.jsx
└── package.json
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenDyslexic font for improved readability
- React for building the user interface
- React Router for navigation
- Various open-source libraries and resources
