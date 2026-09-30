export const MAX_STAGGER_DELAY = 400;

export default function stagger(index = 0, { base = 0, step = 60, cap = MAX_STAGGER_DELAY } = {}) {
  const delay = base + index * step;
  return Math.min(delay, cap);
}
