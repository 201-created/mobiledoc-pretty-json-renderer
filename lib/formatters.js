var utils = require('./utils');
var stringify = JSON.stringify;

function version(version) {
  return stringify(version);
}

function atom(atom) {
  atom = atom.slice();
  var name = atom[0],
      textContent = atom[1],
      atomPayload = atom[2];
  atom[0] = stringify(name);
  atom[1] = stringify(textContent);
  if (atomPayload) {
    atom[2] = utils.prettyJSON(atomPayload);
  }
  return utils.around(atom.join(', '));
}

function card(card) {
  card = card.slice();
  var name = card[0],
      payload = card[1];
  card[0] = stringify(name);
  if (payload) {
    card[1] = utils.prettyJSON(payload);
  }
  return utils.around(card.join(', '));
}

function section(section) {
  section = section.slice();
  var type = section[0],
      tagOrCardIndex = section[1],
      markers = section[2];
  if (type != null) {
    section[0] = stringify(type);
  }
  if (tagOrCardIndex != null) {
    section[1] = stringify(tagOrCardIndex);
  }
  if (markers) {
    section[2] = utils.multiLineArray(markers.map(utils.oneline));
  }
  return utils.around(section.join(', '));
}

module.exports = {
  version: version,
  markup: utils.oneline,
  atom: atom,
  card: card,
  section: section
};
