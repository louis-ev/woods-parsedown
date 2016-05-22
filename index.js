module.exports = parse;

function parse(text) {
	var pieces = text.split(/\n/),
		results = {},
		lastKey = null;
	for (var i = 0; i < pieces.length; i++) {
		var piece = pieces[i] || '';
		if (piece == '----') {
			// remove last \n since a divider is made of \n---\n
			if( results[lastKey] !== undefined && results[lastKey].substring(results[lastKey].length-1) === '\n')
				results[lastKey] = results[lastKey].slice(0, -1);
			lastKey = null;
			continue;
		}
		var matches = piece.match(/(^[a-zA-Z0-9_]+)\:(?:[\s\n])*(.+|$)$/m);
		if (matches && matches.length == 3) {
			lastKey = matches[1];
			results[lastKey] = matches[2];
		} else {
			if (!lastKey) {
				lastKey = 'content';
				if (!results.content)
					results.content = '';
			}
			results[lastKey] += (results[lastKey].length ? '\n' : '') + piece;
		}
	}
	return results;
}