nucleusAngular.filter('nagEllipse', function(){
	return function(text, minLength, beginningShow, endingShow){
		minLength = minLength || 17;
    beginningShow = beginningShow || 5;
    endingShow = (endingShow || 8) * -1;
		if(text.length < minLength) {
			return text;
		} else {
			return text.substr(0, beginningShow) + '...' + text.substr(endingShow);
		}

	};
});
