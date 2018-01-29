const Case = require('change-case');

const files = {
  "es6.html": (componentName, prefix) => 
`<div>
  
</div>`,

  "css": (componentName, prefix) => 
`${prefix}${componentName} {

}`,

  "js": (componentName, prefix) =>
`const { BaseComponent } = require('modulor');
// const BaseComponent = require('components/${prefix}base');

require('./${prefix}${componentName}.css');

const template = require('./${prefix}${componentName}.es6.html');

class ${Case.pascalCase(componentName)} extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    this.refs = this.html(template({}));
    this.bindEvents();
  }
  bindEvents() {

  }
}
customElements.define('${prefix}${componentName}', ${Case.pascalCase(componentName)});
`,

  "test.js": (componentName, prefix) =>
`
/* eslint-disable */
require('./${prefix}${componentName}');

describe('${Case.titleCase(componentName)}', () => {
  let $component;
  let $container;

  beforeAll(async () => {
    const promises = Promise.all([
      waitComponentAttached('${prefix}${componentName}'),
    ]);

    // Get Container as per your Test config, for example
    // $container = getContainer('<${prefix}${componentName}></${prefix}${componentName}>');

    await promises;

    // Then query the component, like as follows
    // $component = $container.querySelector('${prefix}${componentName}');
  });

  afterAll(() => {
    // Remove Container as per your Test config, for example
    // removeContainer($container)
  });

  test('it renders', () => {
    expect($component.refs).not.toBe(undefined);
  });
});
`,

  "story.js": (componentName, prefix) =>
`
/* eslint-disable */
import { storiesOf } from 'modulor-storybook';
const { withReadme } = require('ascesis-storybook/addons/readme');
const { withEvents } = require('ascesis-storybook/addons/events');

require('./${prefix}${componentName}');

storiesOf('${Case.titleCase(componentName)}')
  .addDecorator(withEvents([
    {
      type: 'click',
      extract: ['value']
    }
  ]))
  .add('default', () => '<${prefix}${componentName}></${prefix}${componentName}>')
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
