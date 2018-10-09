const Case = require('change-case');

const files = {
  "modulor.html": (componentName, prefix) => 
`<div>
  
</div>`,

  "css": (componentName, prefix) => 
`${prefix}${componentName} {

}`,

  "js": (componentName, prefix) =>
`import { BaseComponent } from 'modulor'
// import BaseComponent from 'components/${prefix}base';

import './${prefix}${componentName}.css';

import template from './${prefix}${componentName}.modulor.html';

class ${Case.pascalCase(componentName)} extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    template({}, this);
    this.bindEvents();
  }
  bindEvents() {

  }
}
customElements.define('${prefix}${componentName}', ${Case.pascalCase(componentName)});
`,

  "test.js": (componentName, prefix) =>
`/* eslint-disable */
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
`/* eslint-disable */
import { storiesOf } from 'modulor-storybook';
const { withReadme } = require('modulor-storybook/addons/readme');
const { withEvents } = require('modulor-storybook/addons/events');

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
