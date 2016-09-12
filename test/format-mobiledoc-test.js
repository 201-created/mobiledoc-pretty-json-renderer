var assert = require('chai').assert;
var formatMobiledoc = require('../index.js');

describe('#formatMobiledoc', function() {
  it('formats null mobiledocs', function() {
    assert.equal(formatMobiledoc(null), 'null');
    assert.equal(formatMobiledoc(''), '""');
  });

  it('falls back to JSON.stringify for unsupported version numbers', function() {
    var expected = 
`{
  "version": "0.2.0",
  "sections": [
    [],
    [
      [
        1,
        "p",
        [
          [
            [],
            0,
            "before"
          ]
        ]
      ],
      [
        10,
        "ember-card"
      ],
      [
        1,
        "p",
        [
          [
            [],
            0,
            "after"
          ]
        ]
      ]
    ]
  ]
}`;
    var doc = JSON.parse(expected);

    assert.equal(formatMobiledoc(doc), expected);
  });

  it('formats a 0.3.0 mobiledoc', function() {
    var expected =
`{
  "version": "0.3.0",
  "markups": [
    ["b"],
    ["i"],
    ["a", ["href", "http://google.com", "target", "_blank"]]
  ],
  "atoms": [
    ["mention", "@bob", {
      "id": 42
    }],
    ["mention", "@tom", {
      "id": 12
    }]
  ],
  "cards": [
    ["image", {
      "src": "http://google.com/logo.png"
    }]
  ],
  "sections": [
    [1, "h2", [
      [0, [], 0, "Simple h2 example"]
    ]],
    [1, "p", [
      [0, [], 0, "Example with no markup"],
      [0, [0, 1], 1, "Bold left open, italic wrapped & closed"],
      [0, [], 1, "Some leftover bold, closes"],
      [0, [], 1, "Example closing i tag (no opened markups, 1 closed markup)"],
      [1, [], 0, 0],
      [1, [0], 1, 1]
    ]],
    [10, 0]
  ]
}`;

    var doc = JSON.parse(expected);

    assert.equal(formatMobiledoc(doc), expected);
  });
});

