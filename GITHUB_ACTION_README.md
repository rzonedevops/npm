# NPM Package GitHub Action

This repository provides a reusable GitHub Action workflow for packaging Node.js projects for npm distribution. The workflow automatically handles building, testing, packaging, and optionally publishing your npm packages.

## Features

- 🔄 **Automatic Packaging**: Creates npm packages on push, PR, or release
- 🧪 **Quality Assurance**: Runs linting and tests before packaging
- 🏗️ **Build Integration**: Automatically runs build scripts if available
- 📦 **Artifact Upload**: Stores packaged files as GitHub artifacts
- 🚀 **Auto Publishing**: Publishes to npm registry on releases or manual trigger
- ✅ **Package Validation**: Verifies package integrity after creation
- 🔧 **Configurable**: Supports various npm project structures

## Quick Start

### Option 1: Copy the Workflow File

1. Copy the workflow file from this repository:
   ```bash
   curl -o .github/workflows/npm-package.yml https://raw.githubusercontent.com/rzonedevops/npm/main/.github/workflows/npm-package.yml
   ```

2. Commit and push the workflow to your repository

### Option 2: Manual Setup

1. Create the workflow directory in your repository:
   ```bash
   mkdir -p .github/workflows
   ```

2. Copy the content of [`.github/workflows/npm-package.yml`](.github/workflows/npm-package.yml) to your repository

3. Customize the workflow as needed (see [Configuration](#configuration) section)

## Prerequisites

Your repository must have:
- ✅ A valid `package.json` file
- ✅ Node.js project structure
- ✅ (Optional) npm scripts for `lint`, `test`, and `build`

## Workflow Triggers

The workflow runs on:

- **Push** to `main` or `master` branch
- **Pull Requests** to `main` or `master` branch
- **Releases** (automatically publishes if NPM_TOKEN is set)
- **Manual Trigger** via GitHub Actions UI

## Configuration

### Environment Variables

You can customize the workflow by modifying these environment variables in the workflow file:

```yaml
env:
  NODE_VERSION: '18'  # Node.js version to use
  NPM_REGISTRY: 'https://registry.npmjs.org'  # npm registry URL
```

### Secrets

For automatic publishing to npm, add the following secret to your repository:

- `NPM_TOKEN`: Your npm authentication token

#### How to get NPM_TOKEN:

1. Generate a token at [npmjs.com](https://www.npmjs.com/settings/tokens)
2. Choose "Automation" token type for CI/CD
3. Add it as a repository secret in GitHub Settings → Secrets and variables → Actions

### Manual Publishing

You can manually trigger publishing using the GitHub Actions UI:

1. Go to Actions tab in your repository
2. Select "NPM Package" workflow
3. Click "Run workflow"
4. Choose options:
   - **Publish to npm registry**: `true`
   - **NPM tag**: `latest`, `beta`, `alpha`, etc.

## Package Scripts Integration

The workflow automatically detects and runs these npm scripts if they exist:

- `npm run lint` - Code linting
- `npm run test` - Test execution
- `npm run build` - Build process

Example `package.json` scripts:

```json
{
  "scripts": {
    "lint": "eslint src/",
    "test": "jest",
    "build": "tsc",
    "prepublishOnly": "npm run build"
  }
}
```

## Outputs

The workflow provides these outputs that can be used by other jobs:

- `package-name`: The name of the npm package
- `package-version`: The version of the package
- `package-filename`: The filename of the created package

## Artifacts

The workflow automatically uploads the created package as a GitHub artifact:

- **Name**: `npm-package-{package-name}-{version}`
- **Content**: The `.tgz` package file
- **Retention**: 30 days

## Example Usage in Other Workflows

You can reference this workflow's outputs in other jobs:

```yaml
jobs:
  package:
    uses: ./.github/workflows/npm-package.yml
  
  deploy:
    needs: package
    runs-on: ubuntu-latest
    steps:
      - name: Download package
        uses: actions/download-artifact@v4
        with:
          name: npm-package-${{ needs.package.outputs.package-name }}-${{ needs.package.outputs.package-version }}
      
      - name: Deploy package
        run: |
          echo "Deploying ${{ needs.package.outputs.package-name }}@${{ needs.package.outputs.package-version }}"
```

## Troubleshooting

### Common Issues

1. **"package.json not found"**
   - Ensure your repository has a valid `package.json` file in the root

2. **"NPM_TOKEN secret not found"**
   - Add your npm token as a repository secret named `NPM_TOKEN`

3. **Build/Test failures**
   - The workflow will fail if lint or test scripts fail
   - Fix the issues or modify scripts to handle CI environment

4. **Package size warnings**
   - Review your `.npmignore` file to exclude unnecessary files
   - Consider the `files` field in `package.json` for explicit inclusion

### Debug Mode

To enable debug logging, add this environment variable to the workflow:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

## Security Considerations

- 🔐 Never commit npm tokens to your repository
- 🔐 Use repository secrets for sensitive information
- 🔐 Review package contents before publishing
- 🔐 Consider using scoped packages for private modules

## Best Practices

1. **Version Management**: Use semantic versioning for your packages
2. **Testing**: Ensure comprehensive test coverage before packaging
3. **Documentation**: Keep your README and changelog updated
4. **Dependencies**: Regularly update and audit dependencies
5. **Tagging**: Use appropriate npm tags for different release types

## Contributing

To improve this workflow:

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Test with a sample npm project
5. Submit a pull request

## License

This workflow is provided as-is under the MIT license. Feel free to modify and distribute according to your needs.

## Support

For issues with this workflow:
- Check the [troubleshooting](#troubleshooting) section
- Review GitHub Actions logs for specific error messages
- Open an issue in this repository for workflow-related problems

For npm-specific issues, refer to the [npm documentation](https://docs.npmjs.com/).