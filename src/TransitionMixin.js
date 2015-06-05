import assign from 'object.assign';

export function transitionFrom(opt) {
  return new Promise(resolve => {
    opt.transition = 'all ' + opt.duration + ' linear';
    this.transitionStyle = opt;
    this.forceUpdate();
    this.__oldTransitionStyle = opt;
    resolve();
  });
}

export function transitionTo(opt) {
  const domNode = this.getDOMNode();
  return () => {
    return new Promise(resolve => {
      function transitionEnd(e) {
        if (e.target !== this.getDOMNode()) {
          return;
        }
        domNode.removeEventListener('transitionend', transitionEnd);
        resolve();
      }

      // fugly but for now it works :-P
      opt.transition =
        `all ${ opt.duration } ${ opt.transitionType || 'linear' }`;

      this.transitionStyle = assign(this.__oldTransitionStyle || {}, opt);

      domNode.addEventListener('transitionend', this::transitionEnd);

      requestAnimationFrame(() => {
        this.forceUpdate();
      });

      this.__oldTransitionStyle = opt;
    });
  };
}
