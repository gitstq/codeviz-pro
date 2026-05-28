# Contributing to CodeViz Pro

First off, thank you for considering contributing to CodeViz Pro! It's people like you that make this tool better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to provide a welcoming and inspiring experience for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests if available
5. Commit your changes using the commit convention below
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/codeviz-pro.git
cd codeviz-pro

# Start a local server
npx serve . -p 3000

# Or use Python
python -m http.server 3000
```

## Commit Convention

We follow the [Angular Commit Convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit). Each commit message consists of a **header**, a **body**, and a **footer**.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Scope

The scope could be anything specifying the place of the commit change, such as:

- `graph`: Graph visualization engine
- `ui`: User interface components
- `import`: Import functionality
- `export`: Export functionality
- `layout`: Layout algorithms
- `docs`: Documentation

### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

### Examples

```
feat(graph): add circular layout algorithm

fix(ui): resolve node selection issue in Safari

docs(readme): update installation instructions

style(css): improve dark theme contrast
```

## Styleguides

### JavaScript Styleguide

- Use ES6+ features
- Use 2 spaces for indentation
- Use single quotes for strings
- End files with a newline
- Use meaningful variable names

### CSS Styleguide

- Use CSS custom properties (variables) for theming
- Use BEM naming convention for classes
- Group related properties together
- Use shorthand properties where possible

### Documentation Styleguide

- Use Markdown for documentation
- Reference functions, classes, and modules in backticks
- Include code examples where helpful

## Additional Notes

### Issue and Pull Request Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

Thank you for contributing! 🎉
