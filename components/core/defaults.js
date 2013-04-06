angular.module('nagCore.defaults', [])
.service('nagDefaults', ['$injector', function($injector) {
  var rootTemplatePath;

  //figure out the default root template path
  try {
    rootTemplatePath = $injector.get('nag.rootTemplatePath');
  }
  catch(exception) {
    rootTemplatePath = './components/nucleus-angular/components/';
  }

  this.getRootTemplatePath = function() {
    return rootTemplatePath;
  }

	var defaults = {
		grid: {
      rootTemplatePath: rootTemplatePath,
			caption: null,
			columnModel: [],
			currentPage: 1,
			data: [],
			displaySettings: false,
			filters: null, //todo: implement
			generateDataUrl: function(){},
			itemsPerPageOptions: [10, 20, 30, 40, 50],
			itemsPerPage: 10,
			maxColumnWidth: 0,
			minColumnWidth: 50,
			remoteDataMethod: 'JSONP',
			reorderable: false,//todo: implement
			rowMultiSelect: true,
			rowSelectable: false,
			rowSelectableCheckbox: true,
			rowSelectionMode: 'row',
			headerTemplateUrl: 'grid/header.html',
			headerTemplate: null,
			footerTemplateUrl: 'grid/footer.html',
			footerTemplate: null,
			settingsTemplateUrl: 'grid/settings.html',
			settingsTemplate: null,
			loadingTemplateUrl: 'grid/loading.html',
			loadingTemplate: null,
			dataTemplateUrl: 'grid/data.html',
			dataTemplate: null,
			actionsTemplateUrl: 'grid/actions.html',
			actionsTemplate: null,
			rowShiftMultiSelect: false,
			selected: [],
			sort: {},
			sortDirection: 'asc',
			sortMulti: true,
			sortProperty: null,
			totalRecords: 0,
			templateUrl: 'grid/grid.html',
			template: null
		},
		gridColumnModel: {
      rootTemplatePath: rootTemplatePath,
			title: null,
			property: null,
			headerTemplateUrl: 'grid/header-data-cell.html',
			headerTemplate: null,
			templateUrl: 'grid/data-cell.html',
			template: null,
			display: true,
			sortable: false,
			resizable: true,
			filterable: false, //todo - implement
			width: 0,
			minWidth: 0,
			maxWidth: 0,
			cssClass: '',
			cssHeaderClass: ''
		},
		tree: {
      rootTemplatePath: rootTemplatePath,
			templateUrl: 'tree/tree.html',
			data: []
		},
		tooltip: {
      rootTemplatePath: rootTemplatePath,
			verticalPosition: 'bottom', //top, middle, bottom
			horizontalPosition: 'right', //left, middle, right
			sticky: false
		},
		extendText: {
      rootTemplatePath: rootTemplatePath,
			hiddenInputName: null,
			visibleInputName: null,
			selectOnFocus: false, //whether or not to select the existing text in the input when focusing
			preventSubmitOnEnter: true,
			data: [],
			ngModel: null,
      autoFocus: false,
			templateUrl: 'extend-text/extend-text.html',
			template: null
		},
		extendTextTagOptions: {
      rootTemplatePath: rootTemplatePath,
			enabled: false,
			allowDuplicates: false,
			selectedTagIndex: null,
			doubleClickEdit: false
		},
		extendTextAutoCompleteOptions: {
      rootTemplatePath: rootTemplatePath,
			enabled: false,
			display: false,
			url: null,
			variable: 'input',
			variableCache: null, //store the last value that was used to retrieve data in order to prevent querying data when a non-changing key is pressed
			loadCharacterCount: 3, //the number of character that must be entered before data is retrieve from a remote source
			searchDelay: 350, //the number of milliseconds to delay retrieving remote data from the last key press
			cache: false, //todo whether or not to cache the data from the remote server, useful for smaller datasets
			cachedData: [], //todo
			options: [],
			useFilter: null, //todo
			selectedOptionIndex: 0,
			generateDataUrl: function() {
				var url = this.options.autoCompleteOptions.url;
				var variableValue = this.getTextAreaValue();
				this.options.autoCompleteOptions.variableCache = this.getTextAreaValue();
        url += (url.indexOf('?') === -1 ? '?' : '&');
				url += this.options.autoCompleteOptions.variable + '=' + this.options.autoCompleteOptions.formatVariable(variableValue);

				return url + '&callback=JSON_CALLBACK';
			},
			remoteDataMethod: 'JSONP',
			loadingData: false,

			//callbacks
			dataParser: function(data) {
				var parsedData, x;
				parsedData = [];

				for(x = 0; x < data.length; x += 1) {
					parsedData.push({
						display: data[x].username,
						value: data[x].id
					});
				}

				return parsedData;
			},
			formatVariable: function(variable) {
				return variable;
			},
			filter: function(){} //todo
		},
    tabs: {
      defaultTab: 0
    }
	};

  //apply override defaults
  try {
    var defaultOverrides, overrideKeys, x;
    defaultOverrides = $injector.get('nag.defaults');
    overrideKeys = Object.keys(defaultOverrides);

    for(x = 0; x < overrideKeys.length; x += 1) {
      defaults[overrideKeys[x]] = angular.extend(defaults[overrideKeys[x]], defaultOverrides[overrideKeys[x]]);
    }
  }
  catch(exception) {}

	this.getGridOptions = function(options) {
		var newOptions = angular.extend(defaults.grid, options);

		if(angular.isArray(options.columnModel) && options.columnModel.length > 0) {
			options.columnModel = this.getGridColumnOptions(options.columnModel);
		}

		return newOptions;
	};

	this.getGridColumnOptions = function(columnModel) {
		angular.forEach(columnModel, function(value, key) {
			//todo: research: this breaks without the JSON.parse(angular.toJson()), no idea why
			columnModel[key] = angular.extend(JSON.parse(angular.toJson(defaults.gridColumnModel)), columnModel[key]);
		});

		return columnModel;
	};

	this.getTreeOptions = function(options) {
		return angular.extend(defaults.tree, options);
	};

	this.getTooltipOptions = function(options) {
		return angular.extend(defaults.tooltip, options);
	};

	this.getExtendTextOptions = function(options) {
		var results = angular.extend(defaults.extendText, options);

		if(results.tagOptions) {
			results.tagOptions = angular.extend(defaults.extendTextTagOptions, results.tagOptions);
		} else {
			results.tagOptions = defaults.extendTextTagOptions
		}

		if(results.autoCompleteOptions) {
			results.autoCompleteOptions = angular.extend(defaults.extendTextAutoCompleteOptions, results.autoCompleteOptions);
		} else {
			results.autoCompleteOptions = defaults.extendTextAutoCompleteOptions
		}

		return results;
	};

	this.getTabsOptions = function(options) {
		return angular.extend(defaults.tabs, options);
	};
}]);
