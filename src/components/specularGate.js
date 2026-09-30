/**
 * Proximity gate for SpecularButton's WebGL layer.
 *
 * SpecularButton draws both the specular shine and a static 1px base stroke
 * that hug the button edge. The shine already fades in with pointer proximity,
 * but the base stroke is always drawn — so without this gate a wrapped button
 * would show an extra edge stroke even when the cursor is far away.
 *
 * This mirrors the component's own proximity maths (smoothstep over the same
 * default radius) and only fades the fx layer in as the cursor approaches, so
 * every wrapped button stays pixel-identical to its original design at rest.
 */
const PROXIMITY = 250;

let frame = 0;
let pointer = null;

function applyProximity() {
  frame = 0;
  const event = pointer;
  if (!event) return;

  const buttons = document.querySelectorAll('.specular-button');
  for (const btn of buttons) {
    const fx = btn.querySelector('.specular-button__fx');
    if (!fx) continue;

    const rect = btn.getBoundingClientRect();
    const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const dist = Math.hypot(dx, dy);
    const t = Math.max(0, 1 - dist / PROXIMITY);
    const smooth = t * t * (3 - 2 * t);
    fx.style.opacity = smooth.toFixed(3);
  }
}

function onPointerMove(event) {
  pointer = { clientX: event.clientX, clientY: event.clientY };
  if (!frame) frame = requestAnimationFrame(applyProximity);
}

export function initSpecularGate() {
  if (typeof window === 'undefined' || window.__specularGate) return;
  window.__specularGate = true;
  window.addEventListener('pointermove', onPointerMove, { passive: true });
}
