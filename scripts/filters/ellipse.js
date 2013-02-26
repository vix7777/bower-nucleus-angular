/**
 * todo: add parameter to how many beginning and end characters to display
 */
nucleusAngular.filter('nagEllipse', function(){
	return function(text, minLength){
		minLength = minLength || 0;
		if(text.length < minLength) {
			return text;
		} else {
			return text.substr(0, 5) + '...' + text.substr(-8);
		}

	};
});
