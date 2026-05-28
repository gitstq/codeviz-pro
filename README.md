# 🕸️ CodeViz Pro

**English** | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

> Turn any codebase into an interactive, explorable knowledge graph

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/gitstq/codeviz-pro)](https://github.com/gitstq/codeviz-pro/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/gitstq/codeviz-pro)](https://github.com/gitstq/codeviz-pro/network)

## 🎉 Introduction

**CodeViz Pro** is a powerful, browser-based code visualization tool that transforms any codebase into an interactive knowledge graph. Unlike traditional code analysis tools that require complex setup, CodeViz Pro runs entirely in your browser with zero dependencies.

### 🌟 Key Differentiators

- **Pure Frontend**: No backend required, runs entirely in browser
- **Multiple Layout Algorithms**: Force-directed, hierarchical, circular, and grid layouts
- **Interactive Editing**: Drag nodes, zoom, pan, and explore your code structure
- **GitHub Integration**: Directly analyze public repositories via GitHub API
- **Export Options**: Save your graphs as PNG, SVG, or JSON
- **Multi-language Support**: Full support for English, Simplified Chinese, and Traditional Chinese

## ✨ Core Features

### 🎨 Visual Exploration
- **Interactive Graph**: Click, drag, zoom, and pan through your codebase
- **Smart Layouts**: Choose from 4 different layout algorithms
- **Node Highlighting**: Focus on specific components and their relationships
- **Search & Filter**: Quickly find files, functions, or classes

### 📊 Layout Algorithms
| Layout | Description | Best For |
|--------|-------------|----------|
| **Force** | Physics-based force-directed layout | General exploration |
| **Tree** | Hierarchical tree structure | Understanding inheritance |
| **Circle** | Circular arrangement | Overview of components |
| **Grid** | Grid-based organization | Structured comparison |

### 🔧 Customization
- **Node Sizing**: Adjust node sizes dynamically
- **Link Distance**: Control spacing between nodes
- **Charge Strength**: Modify repulsion/attraction forces
- **Label Toggle**: Show/hide node labels
- **Type Filtering**: Filter by files, functions, classes, or imports

### 📥 Import Options
- **JSON Import**: Load custom graph data
- **GitHub URL**: Analyze public repositories directly
- **Sample Data**: Try built-in examples

### 📤 Export Options
- **PNG Image**: High-resolution raster export
- **SVG Vector**: Scalable vector graphics
- **JSON Data**: Save graph structure for later

## 🚀 Quick Start

### Option 1: Online Demo
Visit [https://gitstq.github.io/codeviz-pro](https://gitstq.github.io/codeviz-pro) to try it instantly.

### Option 2: Local Installation

```bash
# Clone the repository
git clone https://github.com/gitstq/codeviz-pro.git

# Navigate to project
cd codeviz-pro

# Start local server
npx serve . -p 3000

# Or simply open index.html in your browser
```

### Option 3: Docker

```bash
docker run -p 3000:80 gitstq/codeviz-pro
```

## 📖 Usage Guide

### Basic Usage

1. **Import Data**
   - Click "Import" button
   - Choose from JSON, GitHub URL, or Sample data

2. **Explore the Graph**
   - Click nodes to see details
   - Drag to rearrange
   - Scroll to zoom
   - Right-click to pan

3. **Customize View**
   - Use sidebar to change layout
   - Adjust settings for node size and spacing
   - Filter by node types

4. **Export Results**
   - Click "Export" button
   - Choose PNG, SVG, or JSON format

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + O` | Open import dialog |
| `Ctrl/Cmd + S` | Open export dialog |
| `Ctrl/Cmd + F` | Focus search box |
| `Ctrl/Cmd + 0` | Reset view |
| `Esc` | Close dialogs |

### GitHub Repository Analysis

1. Click "Import" → "GitHub URL"
2. Enter repository URL (e.g., `https://github.com/facebook/react`)
3. Click "Analyze"
4. Explore the generated graph

⚠️ **Note**: GitHub API has rate limits. For private repositories, authentication is required.

## 💡 Design Philosophy

### Why CodeViz Pro?

Existing code visualization tools often require:
- Complex installation and configuration
- Backend servers and databases
- Command-line expertise
- IDE plugins

CodeViz Pro eliminates these barriers by providing a **zero-setup, browser-first** solution that anyone can use immediately.

### Technical Choices

- **D3.js**: Industry-standard for data visualization
- **Vanilla JavaScript**: No framework dependencies
- **Pure CSS**: Customizable and lightweight
- **Font Awesome**: Consistent iconography

## 📦 Deployment

### GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Your site will be live at `https://yourusername.github.io/codeviz-pro`

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the [Angular Commit Convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build process or auxiliary tool changes

## 🗺️ Roadmap

- [ ] **v1.1.0**: Support for more programming languages
- [ ] **v1.2.0**: Real-time collaboration
- [ ] **v1.3.0**: AI-powered code analysis
- [ ] **v1.4.0**: Custom themes and styling
- [ ] **v2.0.0**: Plugin system for extensibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Understand-Anything](https://github.com/Lum1104/Understand-Anything)
- Built with [D3.js](https://d3js.org/)
- Icons by [Font Awesome](https://fontawesome.com/)

## 📞 Support

- 🐛 [Report Bug](https://github.com/gitstq/codeviz-pro/issues)
- 💡 [Request Feature](https://github.com/gitstq/codeviz-pro/issues)
- 💬 [Discussions](https://github.com/gitstq/codeviz-pro/discussions)

---

<p align="center">
  Made with ❤️ for the developer community
</p>
