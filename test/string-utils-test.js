var assert = require('chai').assert;

var utils = require('../lib/utils.js');

describe('String utilities', function() {
  describe('#indent', function() {
    it('indents every line of a string', function() {
      var multiline = '0\n1\n  2\n}';
      var expected = '  0\n  1\n    2\n  }';
      assert.equal(utils.indent(multiline, 2), expected);
    });
  });

  describe('#arround', function() {
    it('surrounds a string with brackets', function() {
      assert.equal(utils.arround('foo'), '[foo]');
    });
  });

  describe('#multilineArray', function() {
    it('formats empty array is still only one line', function() {
      assert.equal(utils.multiLineArray([]), '[]');
    });

    it('formats a populated array across multiple lines', function() {
      var cardSection = '[10, 0]';
      var markerSection = 
`[1, "h2", [
  [0, [], 0, "Simple "],
  [0, [1], 1, "h2"],
  [0, [], 0, " example"]
]]`;
      var sections = [cardSection, markerSection];

      var expected = 
`[
  [10, 0],
  [1, "h2", [
    [0, [], 0, "Simple "],
    [0, [1], 1, "h2"],
    [0, [], 0, " example"]
  ]]
]`;
      assert.equal(utils.multiLineArray(sections), expected);
    });
  });
});
