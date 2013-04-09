angular.module('nag.extendText', [
  'nag.core'
])
.directive('nagExtendText', ['$timeout', '$http', 'nagBeat', '$compile', 'nagHelper', 'nagDefaults', function($timeout, $http, nagBeat, $compile, nagHelper, nagDefaults){
	return {
		restrict: 'A',
		scope: {
			options: '=nagExtendText',
			formData: '='
		},
		compile: function() {
			return {
				pre: function(scope, element, attributes) {
					scope.options = nagDefaults.getExtendTextOptions(scope.options);

					var template = $(nagHelper.getAsyncTemplate(scope.options.templateUrl));
					template.find('input[type="hidden"]').attr('ng-bind', scope.options.ngModel);

          if(scope.options.autoFocus === true) {
					  template.find('textarea').attr('nag-auto-focus', '');
          }

          element.append($compile(template)(scope));
				},
				post: function(scope, element, attributes) {
					var addValue, setValue, updateTextAreaPadding, updateAutoCompletePosition, displayAutoComplete, hideAutoComplete, setElementHeight, getData, originalPadding;

					originalPadding = {
						left: $(element).find('textarea').css('paddingLeft'),
						top: $(element).find('textarea').css('paddingTop')
					};

					addValue = function(display, value) {
						if(scope.options.tagOptions.allowDuplicates === true || ObjectArray.getKeyByPropertyValue(scope.options.data, 'value', value) === -1) {
							scope.options.data.push({
								display: display,
								value: value
							});
						}
					};

					setValue = function(display, value) {
						scope.options.data = [{
							display: display,
							value: value
						}];
					};

					updateTextAreaPadding = function() {
						if($(element).find('.nag-extend-text-tag:last-child').length > 0) {
							var position = $(element).find('.nag-extend-text-tag:last-child').position();
							var tagWidth = $(element).find('.nag-extend-text-tag:last-child').outerWidth(true);
							$(element).find('textarea').css('paddingLeft', position.left + tagWidth + 5);
							$(element).find('textarea').css('paddingTop', position.top);
						} else {
							$(element).find('textarea').css('paddingLeft', originalPadding.left);
							$(element).find('textarea').css('paddingTop', originalPadding.top);
						}
					};

					updateAutoCompletePosition = function() {
						var elementPosition = $(element).find('textarea').position();
						var elementHeight = $(element).find('textarea').outerHeight();
						var elementWidth = $(element).find('textarea').outerWidth();
						var top = parseInt(elementPosition.top + elementHeight);
						var left = parseInt(elementPosition.left);

						$(element).find('.nag-extend-text-options').css({
							'top': top,
							'left': left,
							'width': elementWidth
						});
					};

					displayAutoComplete = function() {
						scope.options.autoCompleteOptions.variableCache = null;
						scope.options.autoCompleteOptions.display = true;
					};

					hideAutoComplete = function() {
						scope.options.autoCompleteOptions.variableCache = null;
						scope.options.autoCompleteOptions.display = false;
					};

					setElementHeight = function() {
						var elementHeight = $(element).find('textarea').outerHeight();

						$(element).css({
							'minHeight': elementHeight
						});
					};

					getData = function() {
						var url = scope.options.autoCompleteOptions.generateDataUrl.apply(scope, []);
						scope.options.autoCompleteOptions.loadingData = true;
						$http({method: scope.options.autoCompleteOptions.remoteDataMethod, url: url}).
						success(function(data, status, headers, config) {
							if(angular.isObject(data)) {
								scope.options.autoCompleteOptions.options = scope.options.autoCompleteOptions.dataParser(data.data.data);
							}

							scope.options.autoCompleteOptions.loadingData = false;
						}).
						error(function(data, status, headers, config) {
							scope.options.autoCompleteOptions.loadingData = false;
							//todo: proper error handling
						});
					};

					scope.newValue = function(display, value) {
						value = value || display;

						if(value === '') {
							return;
						}

						if(scope.options.tagOptions.enabled === true) {
							addValue(display, value);
							$(element).find('textarea').val('');
						} else {
							setValue(display, value);
							$(element).find('textarea').val(display);
						}
					};

					scope.resetValues = function() {
						scope.options.data = [];
					}

					scope.removeValue = function(value, focusTextArea) {
						focusTextArea = focusTextArea || true;
						if(scope.options.tagOptions.enabled === true) {
							if(focusTextArea === true) {
								$(element).find('textarea').focus();
							}

							var removeKey = ObjectArray.getKeyByPropertyValue(scope.options.data, 'value', value);
							scope.options.data.splice(removeKey, 1);
						} else {
							//since there is no tagging, we should only be store one value so just clear it out
							scope.options.data = [];
						}
					};

					scope.getHiddenValue = function() {
						if(scope.options.tagOptions.enabled === true) {
							return angular.toJson(scope.options.data);
						} else {
							return (scope.options.data[0] ? scope.options.data[0].value : '');
						}
					}

					scope.getVisibleValue = function() {
						if(scope.options.tagOptions.enabled === true) {
							return '';
						} else {
							return (scope.options.data[0] ? scope.options.data[0].display : '');
						}
					};

					scope.getTextAreaValue = function() {
						return $(element).find('textarea').val();
					};

          this.getTextAreaValue = scope.getTextAreaValue;

					scope.isSelectedTag = function(key) {
						return key === scope.options.tagOptions.selectedTagIndex;
					};

					scope.resetSelectedTag = function() {
						scope.options.tagOptions.selectedTagIndex = null;
					};

					scope.isSelectedOption = function(key) {
						return key === scope.options.autoCompleteOptions.selectedOptionIndex;
					};

					scope.resetSelectedOption = function() {
						scope.options.autoCompleteOptions.selectedOptionIndex = 0;
					};

					scope.mouseUp = function($event) {
						if(scope.options.selectOnFocus === true) {
							$(element).find('textarea').select();
						}
					}

					//handles preventing default actions for input
					scope.keyDown = function($event) {
						//handle prevent of enter submitted form
						if((scope.options.tagOptions.enabled === true || scope.options.preventSubmitOnEnter === true) && $event.which === 13) {
								$event.preventDefault();
						}

						if(scope.options.autoCompleteOptions.enabled === true) {
							if($event.which === 13 && scope.options.autoCompleteOptions.options.length > 0) { //enter
								$event.preventDefault();
							} else if($event.which == 38) { //up arrow
								$event.preventDefault();
							} else if($event.which == 40) { //down arrow
								$event.preventDefault();
							}
						}
					}

					scope.keyUp = function($event) {
						//handle prevent of enter submitted form
						if((scope.options.tagOptions.enabled === true || scope.options.preventSubmitOnEnter === true) && $event.which === 13) {
								$event.preventDefault();
						}

						//handling tag mode key binging
						if(scope.options.tagOptions.enabled === true) {
							if($event.which === 13 && scope.options.autoCompleteOptions.options.length === 0) { //enter
								$event.preventDefault();
								scope.newValue($(element).find('textarea').val());
							} else if($event.which === 37 && $(element).find('textarea').val() === '') { //left arrow
								if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) {
									scope.options.tagOptions.selectedTagIndex =
									(scope.options.tagOptions.selectedTagIndex - 1 < 0
									? 0
									: scope.options.tagOptions.selectedTagIndex - 1);
								} else {
									scope.options.tagOptions.selectedTagIndex = scope.options.data.length - 1;
								}
							} else if($event.which === 39 && $(element).find('textarea').val() === '') { //right arrow
								if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) {
									scope.options.tagOptions.selectedTagIndex =
									(scope.options.tagOptions.selectedTagIndex + 1 >= scope.options.data.length
									? scope.options.data.length - 1
									: scope.options.tagOptions.selectedTagIndex + 1);
								}
							} else if($event.which === 8) { //backspace
								if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) {
									scope.removeValue(scope.options.data[scope.options.tagOptions.selectedTagIndex].value);
									scope.resetSelectedTag();
								} else if($(element).find('textarea').val() === '') {
									scope.options.tagOptions.selectedTagIndex = scope.options.data.length - 1;
								}
							} else if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) { //if no other matches, make sure that nothing is selected
								scope.resetSelectedTag();
							}
						}

						if(scope.options.autoCompleteOptions.enabled === true) {
							if($event.which === 13 && scope.options.autoCompleteOptions.options.length > 0) { //enter
								$event.preventDefault();
								var newItem = scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex];
								scope.newValue(newItem.display, newItem.value);
								scope.options.autoCompleteOptions.options = [];
								scope.options.autoCompleteOptions.variableCache = null;
							} else if($event.which == 38) { //up arrow
								$event.preventDefault();
								scope.options.autoCompleteOptions.selectedOptionIndex =
								(scope.options.autoCompleteOptions.selectedOptionIndex - 1 < 0
								? scope.options.autoCompleteOptions.options.length - 1
								: scope.options.autoCompleteOptions.selectedOptionIndex - 1);
							} else if($event.which == 40) { //down arrow
								$event.preventDefault();
								scope.options.autoCompleteOptions.selectedOptionIndex =
								(scope.options.autoCompleteOptions.selectedOptionIndex + 1 >= scope.options.autoCompleteOptions.options.length
								? 0
								: scope.options.autoCompleteOptions.selectedOptionIndex + 1);
							} else {
								var textAreaValue = $(element).find('textarea').val();
								var beatName = 'extend-text-' + scope.options.hiddenInputName;

								if(textAreaValue != scope.options.autoCompleteOptions.variableCache) {
									scope.options.autoCompleteOptions.options = [];

									if(textAreaValue.length >= scope.options.autoCompleteOptions.loadCharacterCount) {
										nagBeat.add(beatName, function() {
											getData();
										}, scope.options.autoCompleteOptions.searchDelay, {
											once: true,
                      overwrite: true
										});
									}
								}
							}
						}
					}

					scope.blur = function($event) {
						if(scope.options.tagOptions.enabled === true) {
							$(element).find('textarea').val('');
							scope.options.tagOptions.selectedTagIndex = null;
						}

						if(scope.options.autoCompleteOptions.enabled === true) {
							hideAutoComplete();
							scope.options.autoCompleteOptions.selectedOptionIndex = null;
						}
					}

					scope.focus = function($event) {
						if(scope.options.autoCompleteOptions.enabled === true) {
							displayAutoComplete();
						}
					}

					scope.doubleClick = function($event, value) {
						if(scope.options.tagOptions.doubleClickEdit === true) {
							scope.removeValue(value);
							$(element).find('textarea').val(value);
						}
					}

					scope.$watch('options.data', function(newValue, oldValue) {
						$timeout(function(){
							if(scope.formData) {
								scope.formData[scope.options.ngModel] = scope.getHiddenValue();
							}

							updateTextAreaPadding();
							updateAutoCompletePosition();
							setElementHeight();
						}, 0);
					}, true);

					scope.$watch('options.autoCompleteOptions.options', function(newValue, oldValue) {
						$timeout(function(){
							updateAutoCompletePosition();
						}, 0);
					}, true);

					$(element).addClass('nag-extend-text');
					setElementHeight();
				}
			};
		}
	}
}]);
