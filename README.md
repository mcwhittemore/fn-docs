# fn-docs

Quickly rip docs out of your functions by parsing comments.

## Example

```js
var fnDocs = require("fn-docs");
var parser = fnDocs();
var simpleFn = function(){
	/*
	1
		2
	3
	*/
}
var docs = parser(simpleFn);
console.log(docs);
```

Resulting in

```
1
	2
3
```

## Options

`fn-docs` takes in one optional config object. This config object has three optional attributes, `start`, `end`, `defaultDoc`.

### start

This optional config option defaults to `/*`. The first line this marker is found in (in any way) is marked as the line before the docs start.

```
/* this is not in the docs
but this is
```

```
var abc = 'abc'; /* none of this line is in the docs
but this is
```

### end

This optional config option defaults to `*\`. The first line this marker is found in (in any way) is marked as the line after the docs end.

```
This is in the docs
but this isn't */
```

```
This is in the docs
but this isn't */ var abc = 'abc';
```

### defaultDoc

This optional config option defaults to `null`. It it used when ever start isn't found, end isn't found, or start and end have no space between them. If end is before start an error is thrown.
