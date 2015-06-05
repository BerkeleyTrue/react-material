const transitions = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'transition': 'transitionend'
};

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const canUseWorkers = typeof Worker !== 'undefined';
export const canUseEventListeners =
  canUseDOM && !!(window.addEventListener || window.attachEvent);

export const canUseViewport = canUseDOM && !!window.screen;
export const isTouchDevice = canUseDOM && 'ontouchstart' in window;
export function isTransform(name) {
  return name === 'transform' ||
    name === '-webkit-transform' ||
    name === '-moz-transform' ||
    name === '-o-transform' ||
    name === '-ms-transform';
}

export function noop() { }
export const slice = Array.prototype.slice;

let transitionEnd = null;
if (canUseDOM) {
  const div = document.createElement('div');
  for (let t in transitions) {
    if (div.style[t]) {
      transitionEnd = transitions[t];
    }
  }
}
export { transitionEnd };
