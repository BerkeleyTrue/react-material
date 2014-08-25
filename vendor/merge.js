function merge(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

module.exports = merge;