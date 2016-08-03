var utils = require('./lib/utils');
var formatters = require('./lib/formatters');

module.exports = function formatMobiledoc(doc) {
  if (doc == null || typeof doc === 'string') {
    return JSON.stringify(doc);
  }
  if (doc.version !== '0.3.0') {
    return JSON.stringify(doc, null, 2);
  }
  var lists = [
    {
      key: 'markups',
      formatter: formatters.markup
    },
    {
      key: 'atoms',
      formatter: formatters.atom
    },
    {
      key: 'cards',
      formatter: formatters.card
    },
    {
      key: 'sections',
      formatter: formatters.section
    }
  ];
  var pairs = [];
  lists.forEach(function(list) {
    var key = list.key;
    if (doc[key]) {
      pairs.push({
        key: key,
        value: utils.multiLineArray(doc[key].map(list.formatter))
      });
    }
  });
  if (doc.version) {
    pairs.unshift({
      key: 'version',
      value: formatters.version(doc.version)
    });
  }
  var block = utils.indent(pairs.map(function(pair) {
    return JSON.stringify(pair.key) + ': ' + pair.value;
  }).join(',\n'), 2);
  return '{\n' + block + '\n}';
}
