function merge(a, b) {
  var newA = {};
  for (var key in a) {
    newA[key] = a[key]
  }

  for (var key in b) {
    newA[key] = b[key];
  }
  return newA;
}

module.exports = merge;
