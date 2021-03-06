export function fromPosition(event) {
  const { target } = event;
  const { top, left } = window.getComputedStyle(target);

  target.setAttribute('data-top', parseFloat(top));
  target.setAttribute('data-left', parseFloat(left));
}

export function moveTarget(target, dx, dy) {
  let top = (parseFloat(target.getAttribute('data-top')) || 0);
  let left = (parseFloat(target.getAttribute('data-left')) || 0);

  left += dx;
  top += dy;

  target.style.left = left + 'px';
  target.style.top = top + 'px';

  target.setAttribute('data-left', left);
  target.setAttribute('data-top', top);
}

export function toPercent(event) {
  const { target, parentRect, rect } = event;
  const left = (parseFloat(target.getAttribute('data-left')) || 0);
  
  const leftPercent = (left/parentRect.width) * 100;
  const widthPercent = (rect.width/parentRect.width) * 100;

  target.style.left = leftPercent + '%';
  target.style.width = widthPercent + '%';
}