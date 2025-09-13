// Example module for the npm packaging GitHub Action
module.exports = {
  /**
   * Simple example function
   * @param {string} name - Name to greet
   * @returns {string} Greeting message
   */
  greet: function(name) {
    return `Hello, ${name}! This package was built using the npm packaging GitHub Action.`;
  },

  /**
   * Get package information
   * @returns {object} Package metadata
   */
  getPackageInfo: function() {
    const pkg = require('./package.json');
    return {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description
    };
  }
};