function isTransform(name) {
  return name === 'transform' || name === '-webkit-transform' || name === '-moz-transform' || name === '-o-transform' || name === '-ms-transform';
}

module.exports = isTransform;