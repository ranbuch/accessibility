"use strict";

var _greeter = require("./greeter");

describe('Greeter', function () {
  it('should greet', function () {
    var greeter = new _greeter.Greeter('Juri');
    spyOn(console, 'log');
    greeter.greet();
    expect(console.log).toHaveBeenCalled();
  });
});