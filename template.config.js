const files = {
  "hyper.html": componentName => ``,

  "scss": componentName => `${componentName} {}`,

  "js": componentName =>
`const BaseComponent = require('components/ibe-base');
const hyperHTML = require('hyperhtml');

const template = require('./ibe-${componentName}.hyper.html');
const styles = require('./${componentName}.scss');

class ${ucFirst(componentName)} extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
}
customElements.define('ibe-${componentName}', ${ucFirst(componentName)});
`,

  "test.js": componentName =>
`require('document-register-element');
const { createDelegate } = require('ascesis/delegate');
const { fireEvent } = require('ascesis');
require('./ibe-${componentName}');

//mock console.error
console.error = jest.fn();
`,

  "story.js": componentName =>
`const { withReadme } = require('ascesis-storybook/addons/readme');
const { withEvents } = require('ascesis-storybook/addons/events');

require('./ibe-${componentName}');
`
};

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function templatesConfig() {

  return {
    "prefix": "ibe-",
    "extensions": Object.keys(files),
    files
  }
}

module.exports = templatesConfig();
