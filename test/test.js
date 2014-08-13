require("should");
var getFnDocs = require("../");

describe("[fn-docs]", function(){

	var simpleFn = function(){
		/*
		1
			2
		3
		*/
	}

	describe("when parseing a function", function(){
		it("should return the docs", function(){
			var parser = getFnDocs();
			var docs = parser(simpleFn);
			docs.should.equal("1\n\t2\n3");
		});
		it("should return the default when no docs are found");
		it("should return the default when there is no space between the start and end");
		it("should error when end is before start");
		it("should return the default when there is a start but no end");
		it("should return the default when there is an end but no start");
	});

	it("should parse a generator");
	it("should not parse a string");
	it("should not parse an int");
	it("should not parse undefined");
	it("should not parse null");
	it("should not parse an object");
	it("should not parse an array");

})