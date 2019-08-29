import TRANSLATIONTABEL from '../settings/translations.json';

function $T(id) {
	return TRANSLATIONTABEL["en"][id];
}

function $TInject(id, injections) {
	var text = TRANSLATIONTABEL["en"][id];

	injections.forEach(function(injection, index) {
		var replace = "\\$" + (index + 1);
		var regexObj = new RegExp(replace, "g");
		
		text = text.replace(regexObj, injection);
	})

	return text;
}

export {$T, $TInject};
export default $T;
