var assert = require('chai').assert;
var formatters = require('../lib/formatters');

describe('Formatters for each mobiledoc key', function() {
  describe('#version', function() {
    it('quotes the version number', function() {
      assert.equal(formatters.version('0.3.0'), '"0.3.0"');
    });
  });

  describe('#atom', function() {
    it('formats atoms with no payload on one line', function() {
      assert.equal(formatters.atom(['mention', '@bob']), '["mention", "@bob"]');
    });

    it('formats atom payloads across multiple lines', function() {
      var expected =
`["mention", "@bob", {
  "id": 42
}]`;
      var atom = JSON.parse(expected);
      assert.equal(formatters.atom(atom), expected);
    });
  });

  describe('card', function() {
    it('formats cards with no payload on one line', function() {
      assert.equal(formatters.card(['codemirror-card']), '["codemirror-card"]');
    });

    it('formats card payload across multiple lines', function() {
      var expected =
`["image", {
  "src": "whatever"
}]`;
      var card = JSON.parse(expected);
      assert.equal(formatters.card(card), expected);
    });
  });

  describe('section', function() {
    it('renders an empty section', function() {
      assert.equal(formatters.section([]), '[]');
    });

    it('formats card sectinos on one line', function() {
      assert.equal(formatters.section([10, 0]), '[10, 0]');
    });

    it('formats markers across multiple lines', function() {
      var expected =
`[1, "h2", [
  [0, [], 0, "Simple "],
  [0, [1], 1, "h2"],
  [0, [], 0, " example"]
]]`;
      var section = JSON.parse(expected);
      assert.equal(formatters.section(section), expected);
    });
  });
});
