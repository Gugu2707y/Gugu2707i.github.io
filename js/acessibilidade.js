(() => {
  "use strict";
  const STEPS = [0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5];
  let stepIndex = 2;
  const originalSizes = new Map();
  const textSelector = 'h1,h2,h3,h4,h5,h6,p,a,button,label,li,dt,dd,th,td,span,strong,em,small,legend,figcaption,summary,blockquote,.eyebrow,.rpg-tab,.rpg-card,.rpg-detail';

  function rememberAndApply(root = document) {
    const nodes = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches?.(textSelector)) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll(textSelector));
    nodes.forEach((el) => {
      if (el.closest('.accessibility-widget')) return;
      if (!originalSizes.has(el)) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (Number.isFinite(size) && size > 0) originalSizes.set(el, size);
      }
      const base = originalSizes.get(el);
      if (base) el.style.fontSize = `${base * STEPS[stepIndex]}px`;
    });
  }

  function resetSizes() {
    document.querySelectorAll(textSelector).forEach((el) => {
      if (!el.closest('.accessibility-widget')) el.style.removeProperty('font-size');
    });
    // Re-capture current stylesheet values after removing inline overrides.
    originalSizes.clear?.();
    document.querySelectorAll(textSelector).forEach((el) => {
      if (el.closest('.accessibility-widget')) return;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (Number.isFinite(size) && size > 0) originalSizes.set(el, size);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.accessibility-widget');
    if (!widget) return;
    widget.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-font-action]');
      if (!button) return;
      const action = button.dataset.fontAction;
      if (action === 'increase') stepIndex = Math.min(STEPS.length - 1, stepIndex + 1);
      else if (action === 'decrease') stepIndex = Math.max(0, stepIndex - 1);
      else if (action === 'reset') {
        stepIndex = 2;
        resetSizes();
        return;
      }
      rememberAndApply();
    });

    rememberAndApply();
    const observer = new MutationObserver((records) => {
      if (stepIndex === 2) return;
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) rememberAndApply(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
