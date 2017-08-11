const files = {
  "hyper.html": (componentName, prefix) => ``,

  "scss": (componentName, prefix) => `${prefix}${componentName} {}`,

  "js": (componentName, prefix) =>
`const BaseComponent = require('components/${prefix}base');
const hyperHTML = require('hyperhtml');

const template = require('./${prefix}${componentName}.hyper.html');
const styles = require('./${prefix}${componentName}.scss');

class ${ucFirst(componentName)} extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
}
customElements.define('${prefix}${componentName}', ${ucFirst(componentName)});
`,

  "test.js": (componentName, prefix) =>
`require('document-register-element');
const { createDelegate } = require('ascesis/delegate');
const { fireEvent } = require('ascesis');
require('./${prefix}${componentName}');

//mock console.error
console.error = jest.fn();
`,

  "story.js": (componentName, prefix) =>
`const { withReadme } = require('ascesis-storybook/addons/readme');
const { withEvents } = require('ascesis-storybook/addons/events');

require('./${prefix}${componentName}');
`
};

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function templatesConfig() {

  return {
    extensions: Object.keys(files),
    files
  }
}

module.exports = templatesConfig();
