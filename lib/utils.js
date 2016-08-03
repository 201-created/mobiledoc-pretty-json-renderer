function indent(multiline, depth) {
  var indent = [];
  while (depth > 0) {
    indent.push(' ');
    depth--;
  }
  indent = indent.join('');
  return multiline.replace(/^/gm, indent);
}

function around(inner) {
  return '[' + inner + ']';
}

function prettyJSON(obj) {
  return JSON.stringify(obj, null, '  ');
}

function oneline(obj) {
  if (Array.isArray(obj)) {
    return around(obj.map(oneline).join(', '));
  } else {
    return JSON.stringify(obj);
  }
}


function multiLineArray(items) {
  if (items.length) {
    var block = indent(items.join(',\n'), 2);
    return '[\n' + block + '\n]';
  } else {
    return '[]';
  }
}


module.exports = {
  indent: indent,
  around: around,
  prettyJSON: prettyJSON,
  oneline: oneline,
  multiLineArray: multiLineArray
};
