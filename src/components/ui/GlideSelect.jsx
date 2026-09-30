import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons';

import './GlideSelect.css';
import SpecularButton from '../SpecularButton';

const SIZES = {
  sm: { chip: 28, row: 26, font: 12 },
  md: { chip: 32, row: 30, font: 13 },
  lg: { chip: 44, row: 40, font: 14 }
};
// Must match the row-gap of .glide-select__list so the pill lines up with the rows.
const GAP = 2;
const DEFAULT_OPTIONS = ['One', 'Two', 'Three'];

const norm = o => (typeof o === 'string' ? { value: o, label: o } : o);
const textOf = it => (typeof it.label === 'string' ? it.label : it.value);
const typeaheadIndex = (items, from, ch) => {
  const c = ch.toLowerCase();
  const n = items.length;
  for (let k = 1; k <= n; k++) {
    const i = (from + k) % n;
    if (textOf(items[i]).toLowerCase().startsWith(c)) return i;
  }
  return from;
};

export default function GlideSelect({
  options = DEFAULT_OPTIONS,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  showTags = true,
  accentColor = '#f5f5f5',
  surfaceColor = '#27272a',
  highlightColor = '#3f3f46',
  textColor = '#f5f5f5',
  size = 'md',
  radius = 10,
  menuWidth = 176,
  menuMaxHeight = 220,
  align = 'left',
  popDuration = 180,
  glideDuration = 220,
  rememberPosition = true,
  disabled = false,
  ariaLabel = 'Select',
  className = ''
}) {
  const items = options.map(norm);
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = value ?? inner;
  const selected = items.findIndex(it => it.value === current);
  // closed -> entering -> open -> closing -> closed
  const [phase, setPhase] = useState('closed');
  const [active, setActive] = useState(null);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const listRef = useRef(null);
  const id = useId();
  const S = SIZES[size] ?? SIZES.md;
  const step = S.row + GAP;
  const popOut = Math.round((popDuration * 2) / 3);
  const expanded = phase === 'entering' || phase === 'open';

  // The menu is a fixed-height window, so scroll the highlighted row into view
  // inside it (adjusting scrollTop only, so ancestors never scroll).
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || active === null) return;
    const row = list.querySelector(`[data-index="${active}"]`);
    if (!row) return;
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [active, phase, items.length]);

  const open = viaKey => {
    if (disabled) return;
    setActive(selected >= 0 ? selected : viaKey ? 0 : null);
    // Re-opening mid-exit restarts the enter animation instead of unmounting.
    setPhase(p => (p === 'open' || p === 'entering' ? p : 'entering'));
  };
  const close = () => {
    setActive(null);
    setPhase(p => (p === 'closed' || p === 'closing' ? p : 'closing'));
  };
  const settle = e => {
    if (e.target !== menuRef.current) return;
    setPhase(p => (p === 'entering' ? 'open' : p === 'closing' ? 'closed' : p));
  };
  const pick = (i, viaKey) => {
    const it = items[i];
    if (!it) {
      close();
      return;
    }
    if (it.value !== current) {
      if (value === undefined) setInner(it.value);
      onChange?.(it.value, it);
      if (!viaKey && rootRef.current) rootRef.current.dataset.swap = '';
    }
    close();
    triggerRef.current?.focus({ preventScroll: true });
  };

  const onTriggerKey = e => {
    const k = e.key;
    const n = items.length;
    const cur = active ?? Math.max(0, selected);
    if (!expanded) {
      if (k === 'Enter' || k === ' ' || k === 'ArrowDown' || k === 'ArrowUp') {
        e.preventDefault();
        open(true);
      }
      return;
    }
    const go = i => {
      e.preventDefault();
      setActive(Math.min(n - 1, Math.max(0, i)));
    };
    if (k === 'ArrowDown' || k === 'ArrowUp') go(active === null ? cur : cur + (k === 'ArrowDown' ? 1 : -1));
    else if (k === 'Home' || k === 'End') go(k === 'Home' ? 0 : n - 1);
    else if (k === 'Enter' || k === ' ') {
      e.preventDefault();
      pick(cur, true);
    } else if (k === 'Escape' || k === 'Tab') {
      if (k === 'Escape') e.preventDefault();
      close();
    } else if (k.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) go(typeaheadIndex(items, cur, k));
  };

  useEffect(() => {
    if (phase === 'closed' || phase === 'closing') return undefined;
    const onDown = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  useEffect(() => {
    if (disabled && phase !== 'closed') close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);
  // Safety net in case the animation never reports completion.
  useEffect(() => {
    if (phase !== 'entering' && phase !== 'closing') return undefined;
    const t = setTimeout(
      () => setPhase(p => (p === 'entering' ? 'open' : p === 'closing' ? 'closed' : p)),
      (phase === 'entering' ? popDuration : popOut) + 90
    );
    return () => clearTimeout(t);
  }, [phase, popDuration, popOut]);

  const rowOf = e => {
    const row = e.target.closest('[data-index]');
    return row && listRef.current && listRef.current.contains(row) ? Number(row.dataset.index) : null;
  };
  const onListClick = e => {
    const i = rowOf(e);
    if (i !== null) pick(i, false);
  };
  const onListOver = e => {
    if (e.pointerType === 'touch') return;
    const i = rowOf(e);
    if (i !== null && i !== active) setActive(i);
  };

  return (
    <div
      ref={rootRef}
      className={`glide-select${className ? ` ${className}` : ''}`}
      data-size={size}
      data-disabled={disabled ? '' : undefined}
      style={{
        '--gs-accent': accentColor,
        '--gs-surface': surfaceColor,
        '--gs-highlight': highlightColor,
        '--gs-text': textColor,
        '--gs-radius': `${radius}px`,
        '--gs-inner-radius': `${Math.max(3, radius - 4)}px`,
        '--gs-chip': `${S.chip}px`,
        '--gs-row': `${S.row}px`,
        '--gs-font': `${S.font}px`,
        '--gs-menu-w': `${menuWidth}px`,
        '--gs-menu-max-h': `${menuMaxHeight}px`,
        '--gs-pop': `${popDuration}ms`,
        '--gs-pop-out': `${popOut}ms`,
        '--gs-glide': `${glideDuration}ms`,
        '--gs-origin': `top ${align}`
      }}
      onAnimationEnd={e => {
        if (e.animationName === 'gs-swap' && rootRef.current) delete rootRef.current.dataset.swap;
      }}
    >
      <SpecularButton
        buttonRef={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls={`${id}-list`}
        aria-activedescendant={active !== null ? `${id}-${active}` : undefined}
        aria-label={ariaLabel}
        disabled={disabled}
        className="glide-select__trigger"
        size="sm"
        radius={10}
        textColor="var(--text-primary)"
        lineColor="#ffffff"
        baseColor="#34363b"
        onPointerDown={e => {
          if (e.button !== 0 || disabled) return;
          e.currentTarget.focus({ preventScroll: true });
          if (expanded) close();
          else open(false);
        }}
        onKeyDown={onTriggerKey}
      >
        <span className="glide-select__label" key={current} data-empty={selected < 0 ? '' : undefined}>
          {selected >= 0 ? items[selected].label : placeholder}
        </span>
        <span className="glide-select__chevron" aria-hidden="true">
          <HugeiconsIcon icon={ArrowDown01Icon} size={12} strokeWidth={2.5} />
        </span>
      </SpecularButton>
      {phase !== 'closed' ? (
        <div
          ref={menuRef}
          className="glide-select__menu"
          data-state={phase}
          data-side="bottom"
          data-align={align}
          onAnimationEnd={settle}
        >
          <div
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            aria-label={ariaLabel}
            className="glide-select__list"
            data-live={active !== null ? '' : undefined}
            onClick={onListClick}
            onPointerOver={onListOver}
            onPointerLeave={() => {
              if (!rememberPosition) setActive(null);
            }}
          >
            <span
              className="glide-select__pill"
              aria-hidden="true"
              style={{
                transform: `translateY(${active === null ? 0 : active * step}px)`,
                opacity: active === null ? 0 : 1
              }}
            />
            {items.map((it, i) => (
              <div
                key={it.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={i === selected}
                data-index={i}
                className="glide-select__option"
              >
                <span className="glide-select__name">{it.label}</span>
                {showTags && it.tag ? <span className="glide-select__tag">{it.tag}</span> : null}
                <span className="glide-select__check" data-on={i === selected ? '' : undefined} aria-hidden="true">
                  <HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.5} />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
