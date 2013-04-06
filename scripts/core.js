//shortcut modules
angular.module('nagCore', [
  'nagCore.defaults',
  'nagCore.helpers'
]);

angular.module('nagValidate', [
  'nagValidate.email',
  'nagValidate.match',
  'nagValidate.max',
  'nagValidate.min',
  'nagValidate.range',
  'nagValidate.required'
]);

angular.module('nagGrid', [
  'nagGrid.actions',
  'nagGrid.data',
  'nagGrid.dataCell',
  'nagGrid.footer',
  'nagGrid.grid',
  'nagGrid.header',
  'nagGrid.headerDataCell',
  'nagGrid.loading',
  'nagGrid.settings'
]);

angular.module('nag', [
  'nagAttribute',
  'nagAutoFocus',
  'nagDynamicEvent',
  'nagEvent',
  'nagExpander',
  'nagExtendText',
  'nagIf',
  'nagInfiniteScroll',
  'nagPrism',
  'nagTabs',
  'nagTooltip',
  'nagTree',
  'nagValidate',
  'nagGrid',
  'nagEllipse',
  'nagBeat',
  'nagDataValidation',
  'nagModal',
  'nagNotify',
  'nagSiteOverlay'
]);
