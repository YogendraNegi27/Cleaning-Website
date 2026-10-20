"use client";

// A portfolio / feature index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Feature or project title. Shown beside the front card and in the index. */
  title: string;
  /** Description text for the card. */
  desc?: string;
  /** Icon component or React element. */
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
  /** Optional image URL (omitted for text cards). */
  image?: string;
  /** Where the card links to. Omit for browse-only. */
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "Why Us" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
}

/* Geometry tuned for responsive cards and zero-overlap layout */
const CARD_H = 0.28; // card height relative to stage
const CARD_MAX_W = 0.24; // max card width relative to stage
const CARD_RATIO = 1.38; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.05; // drum radius
const LENS = 2.6; // perspective distance
const RING_R = 0.85; // compact ring radius so cards stay safely in stage center
const BOW = 0.50; // gentle lateral bow so cards never drift towards the right list
const TITLE = 0.10; // center label font size factor
const INDEX = 0.035; // index font size factor
const CULL = 1.6; // cull threshold

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the front. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: ring terms fall away as `m` reaches 1 (drum). */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Why Us",
  action,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // The wheel's position, and where it is heading. Only `active` is state.
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Reduced motion support
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;

    const maxW = isMobile ? 0.70 : isTablet ? 0.30 : CARD_MAX_W;
    const maxH = isMobile ? 0.30 : CARD_H;
    const cardW = Math.min(Math.max(h * maxH * CARD_RATIO, 180), w * maxW);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * (isMobile ? 0.72 : isTablet ? 0.78 : RING_R);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * (isMobile ? 0.25 : BOW),
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
      isMobile,
      isTablet,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);
  const settling = React.useRef(0);

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[26rem] w-full overflow-hidden select-none bg-sky-50/70 text-slate-900",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-sky-600 absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            const Icon = item.icon as any;
            const isActive = i === active;

            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={isActive}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden] text-left"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  {/* Compact, responsive text card */}
                  <span
                    className={cn(
                      "relative block size-full rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-start",
                      isActive
                        ? "bg-slate-900 text-white border-2 border-sky-400 shadow-[0_16px_36px_rgba(15,23,42,0.30)]"
                        : "bg-sky-100/90 text-slate-900 border border-sky-200/90 shadow-[0_6px_20px_rgba(2,132,199,0.10)] hover:bg-sky-100 hover:border-sky-300"
                    )}
                  >
                    {/* Icon Badge */}
                    <div
                      className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg mb-2.5 sm:mb-3 transition-all duration-300 flex-shrink-0 shadow-sm",
                        isActive
                          ? "bg-sky-500 text-white shadow-inner"
                          : "bg-white text-sky-600 border border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white"
                      )}
                    >
                      {typeof Icon === "function" ? (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        Icon || "✨"
                      )}
                    </div>

                    {/* Title */}
                    <h4
                      className={cn(
                        "font-bold text-xs sm:text-sm lg:text-base leading-snug mb-1.5 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-slate-900 group-hover:text-sky-700"
                      )}
                    >
                      {item.title}
                    </h4>

                    {/* Description */}
                    {item.desc && (
                      <p
                        className={cn(
                          "text-[10px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal",
                          isActive ? "text-slate-300" : "text-slate-600"
                        )}
                      >
                        {item.desc}
                      </p>
                    )}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring center title ("Why Us") */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-extrabold text-slate-900 select-none"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>

      {/* Left title: displays active card title as drum rotates (hidden on mobile to prevent clutter) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-3 sm:left-6 lg:left-8 -translate-y-1/2 tracking-tight opacity-0 font-extrabold text-slate-900 select-none max-w-[140px] sm:max-w-[180px] lg:max-w-[220px] leading-tight hidden sm:block"
        style={{ fontSize: metrics.title }}
      >
        {items[active]?.title}
      </div>

      {/* Right side complete card list: compact, zero overlap */}
      <div className="absolute top-1/2 right-2 sm:right-4 lg:right-6 xl:right-8 -translate-y-1/2 z-20 hidden md:block select-none pointer-events-auto">
        <ol className="flex flex-col gap-1.5 text-right">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => to(i + 1)}
                  className={cn(
                    "group flex items-center justify-end gap-2 px-2 py-1 rounded-lg transition-all duration-300 outline-none cursor-pointer max-w-[160px] xl:max-w-[190px]",
                    isActive
                      ? "bg-white/95 shadow-md shadow-sky-950/10 border border-sky-300 scale-[1.02] translate-x-[-2px]"
                      : "text-slate-400 hover:text-slate-700"
                  )}
                >
                  {/* Card Title (hidden on medium tablets to avoid overlap; shown on lg+ screens) */}
                  <span
                    className={cn(
                      "text-[11px] xl:text-xs tracking-tight transition-colors duration-200 truncate hidden lg:inline-block",
                      isActive
                        ? "text-sky-700 font-bold"
                        : "text-slate-400 font-medium group-hover:text-slate-600"
                    )}
                  >
                    {item.title}
                  </span>

                  {/* Number Badge */}
                  <span
                    className={cn(
                      "text-[9px] font-mono px-1 py-0.5 rounded transition-all duration-300",
                      isActive
                        ? "bg-sky-600 text-white font-bold shadow-sm"
                        : "bg-slate-200/80 text-slate-500 group-hover:bg-slate-300"
                    )}
                  >
                    0{i + 1}
                  </span>

                  {/* Dynamic Active Indicator Bar */}
                  <span
                    className={cn(
                      "rounded-full transition-all duration-300",
                      isActive
                        ? "w-1 h-4 bg-sky-600 shadow-sm shadow-sky-500/50"
                        : "w-1 h-1.5 bg-slate-300 group-hover:bg-slate-400"
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile Horizontal Navigation Indicator at Bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex md:hidden items-center gap-1.5 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sky-200/80 shadow-sm select-none">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => to(i + 1)}
              aria-label={item.title}
              className={cn(
                "rounded-full transition-all duration-300 outline-none",
                isActive
                  ? "w-5 h-2 bg-sky-600 shadow-sm shadow-sky-500/50"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              )}
            />
          );
        })}
      </div>
    </section>
  );
}

export default WorksWheel;
