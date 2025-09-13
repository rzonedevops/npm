# NPM Package GitHub Action

A comprehensive GitHub Action workflow for automatically packaging Node.js projects for npm distribution.

## 🚀 Features

- **Automatic Packaging**: Creates npm packages on push, PR, or release events
- **Quality Assurance**: Runs linting and tests before packaging  
- **Build Integration**: Automatically runs build scripts if available
- **Artifact Storage**: Uploads packaged files as GitHub artifacts
- **Auto Publishing**: Publishes to npm registry on releases or manual trigger
- **Package Validation**: Verifies package integrity after creation
- **Highly Configurable**: Supports various npm project structures

## 📖 Quick Start

### Copy the workflow to your repository:

```bash
# Create the workflows directory
mkdir -p .github/workflows

# Download the workflow file
curl -o .github/workflows/npm-package.yml \
  https://raw.githubusercontent.com/rzonedevops/npm/main/.github/workflows/npm-package.yml
```

### Requirements:
- ✅ Valid `package.json` file in repository root
- ✅ Node.js project structure
- ✅ (Optional) npm scripts for `lint`, `test`, and `build`

## 📚 Documentation

For complete usage instructions, configuration options, and examples, see:

**👉 [GITHUB_ACTION_README.md](./GITHUB_ACTION_README.md)**

## 🔧 What's Included

- **GitHub Action Workflow**: `.github/workflows/npm-package.yml`
- **Documentation**: Complete setup and usage guide
- **Example Project**: Sample package.json and module for testing
- **Best Practices**: Security and configuration recommendations

## 🌟 Workflow Triggers

- Push to `main`/`master` branch
- Pull requests to `main`/`master` branch  
- Release publication (auto-publishes to npm)
- Manual workflow dispatch with publishing options

## 🔐 Publishing Setup

To enable automatic npm publishing:

1. Generate an npm token at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Add it as `NPM_TOKEN` secret in your repository settings
3. Packages will auto-publish on releases or manual triggers

## 🛠 Example Output

The workflow will:
1. ✅ Validate package.json exists
2. 📦 Install dependencies (`npm ci` or `npm install`)
3. 🔍 Run linting (if `lint` script exists)
4. 🧪 Run tests (if `test` script exists)  
5. 🏗️ Run build (if `build` script exists)
6. 📋 Create npm package with `npm pack`
7. ⬆️ Upload package as GitHub artifact
8. 🚀 Optionally publish to npm registry
9. ✅ Validate package installation

## 🤝 Contributing

This workflow can be used as-is or customized for your specific needs. Feel free to:

- Fork and modify for your use case
- Submit issues for bugs or feature requests
- Contribute improvements via pull requests

## 📄 License

MIT License - Feel free to use and modify as needed.
