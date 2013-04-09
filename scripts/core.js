//shortcut modules
angular.module('nag.core', [
  'nag.core.defaults',
  'nag.core.helpers'
]);

angular.module('nag.validate', [
  'nag.validate.email',
  'nag.validate.match',
  'nag.validate.max',
  'nag.validate.min',
  'nag.validate.range',
  'nag.validate.required'
]);

angular.module('nag.grid', [
  'nag.grid.actions',
  'nag.grid.data',
  'nag.grid.dataCell',
  'nag.grid.footer',
  'nag.grid.grid',
  'nag.grid.header',
  'nag.grid.headerDataCell',
  'nag.grid.loading',
  'nag.grid.settings'
]);

angular.module('nag', [
  'nag.attribute',
  'nag.autoFocus',
  'nag.beat',
  'nag.dataValidation',
  'nag.dynamicEvent',
  'nag.ellipse',
  'nag.event',
  'nag.expander',
  'nag.extendText',
  'nag.grid',
  'nag.if',
  'nag.infiniteScroll',
  'nag.modal',
  'nag.notify',
  'nag.prism',
  'nag.siteOverlay',
  'nag.tabs',
  'nag.tooltip',
  'nag.tree',
  'nag.validate'
]);
