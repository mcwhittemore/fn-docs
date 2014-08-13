module.exports = function(opts){
	opts = opts || {};
	var start = opts.start || "/*";
	var end = opts.end || "*/";
	var defaultDoc = opts.defaultDoc || null;

	return function(fn){
		if(typeof fn == "function"){
			var lines = fn.toString().split("\n");

			var startLine = null;
			var endLine = null;

			//FINDING START AND END LINES

			var numLines = lines.length;
			for(var i=0; i<numLines; i++){
				var line = lines[i];

				if(startLine == null && line.indexOf(start)!=-1){
					startLine = i;
				}

				if(endLine == null && line.indexOf(end)!=-1){
					endLine = i;
				}

				if(startLine!==null && endLine !== null){
					break;
				}
			}

			if(startLine == null || endLine == null){
				return defaultDoc;
			}
			else if(endLine < startLine){
				throw new Error("End marker can't be before the start marker in the function");
			}
			else{

				//PARSING OUT UN-NEEDED WHITESPACE

				var parts = lines.slice(startLine+1, endLine);

				if(parts.length==0){
					return defaultDoc;
				}
				else{
					var spaces = /[\s]*/;

					var match = parts[0].match(spaces);
					var whitespace = match ? match[0] : "";
					
					for(var i=1; i<parts.length && whitespace.length > 0; i++){
						var match = parts[i].match(spaces);

						if(match){
							var ws = match[0];

							var newSpace = "";
							for(var j=0; j<ws.length && j<whitespace.length; j++){
								if(ws[j] == whitespace[j]){
									newSpace = newSpace + ws[j];
								}
								else{
									break;
								}
							}

							whitespace = newSpace;
						}
						else{
							whitespace = "";
						}
					}

					if(whitespace==""){
						return parts.join("\n");
					}
					else{
						var out = parts[0].replace(whitespace, "");
						for(var i=1; i<parts.length; i++){
							out = out+"\n"+parts[i].replace(whitespace, "");
						}
						return out;
					}
				}

			}

		}
		else{
			throw new Error("Must supply a function");
		}
	}
}