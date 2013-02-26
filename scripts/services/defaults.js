nucleusAngular.service('nagDefaults', [function() {
	var defaults = {
		grid: {
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
			headerTemplateUrl: './components/nag/views/grid/header.html',
			headerTemplate: null,
			footerTemplateUrl: './components/nag/views/grid/footer.html',
			footerTemplate: null,
			settingsTemplateUrl: './components/nag/views/grid/settings.html',
			settingsTemplate: null,
			loadingTemplateUrl: './components/nag/views/grid/loading.html',
			loadingTemplate: null,
			dataTemplateUrl: './components/nag/views/grid/data.html',
			dataTemplate: null,
			actionsTemplateUrl: './components/nag/views/grid/actions.html',
			actionsTemplate: null,
			rowShiftMultiSelect: false,
			selected: [],
			sort: {},
			sortDirection: 'asc',
			sortMulti: true,
			sortProperty: null,
			totalRecords: 0,
			templateUrl: './components/nag/views/grid/grid.html',
			template: null
		},
		gridColumnModel: {
			title: null,
			property: null,
			headerTemplateUrl: './components/nag/views/grid/header-data-cell.html',
			headerTemplate: null,
			templateUrl: './components/nag/views/grid/data-cell.html',
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
			treeClassName: 'tree1',
			nodeClassName: 'node1',
			templateUrl: './components/nag/views/tree/tree.html',
			data: []
		},
		tooltip: {
			verticalPosition: 'bottom', //top, middle, bottom
			horizontalPosition: 'right', //left, middle, right
			sticky: false
		},
		tabs: {
			defaultTab: 1,
			ajaxBackgroundLoading: false, //todo
			url: null //todo
		},
		extendText: {
			hiddenInputName: null,
			visibleInputName: null,
			selectOnFocus: false, //whether or not to select the existing text in the input when focusing
			preventSubmitOnEnter: true,
			data: [],
			ngModel: null,
			templateUrl: './components/nag/views/extend-text.html',
			template: null
		},
		extendTextTagOptions: {
			enabled: false,
			allowDuplicates: false,
			selectedTagIndex: null,
			doubleClickEdit: false
		},
		extendTextAutoCompleteOptions: {
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
			generateDataUrl: function(element) {
				var url = this.options.autoCompleteOptions.url;
				//todo: refactor this into internal method
				var variableValue = $(element).find('textarea').val();
				this.options.autoCompleteOptions.variableCache = variableValue;
				url += '?' + this.options.autoCompleteOptions.variable + '=' + this.options.autoCompleteOptions.formatVariable(variableValue);

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
		resizable: {},
		expander: {}
	};

	this.overrideDefaults = function(componentName, objectValues) {
		if(angular.isObject(objectValues)) {
			defaults[componentName] = angular.extend(defaults[componentName], objectValues);
		}
	}

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

	this.getTabsOptions = function(options) {
		return angular.extend(defaults.tabs, options);
	};

	this.getExpanderOptions = function(options) {
		return angular.extend(defaults.expander, options);
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

	this.getResizableOptions = function(options) {
		return angular.extend(defaults.resizable, options);
	};
}]);
