// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import React, { useEffect, useMemo, useState, type CSSProperties } from "react";

type CSSVars = CSSProperties & Record<string, string | number | undefined>;

export interface HoverStackCard {
  id?: number | string;
  quote?: string;
  tag?: string;
  title?: string;
  content?: React.ReactNode;
  bg: string;
  accent?: string;
  borderColor?: string;
  footerLabel?: string;
  footerHref?: string;
}

interface PreparedHoverStackCard extends HoverStackCard {
  _rotation: number;
  _baseX: number;
  _baseZ: number;
}

export interface HoverStackProps {
  cards?: HoverStackCard[];
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  hoverLift?: number;
  pushDistance?: number;
  spread?: number;
  rotation?: number;
  duration?: number;
  accentColor?: string;
  className?: string;
}

const PRESET_ROTATIONS = [-6, 4, -3, 5, -4, 6, 3, -5, 2, -4];

const DEFAULT_CARDS: HoverStackCard[] = [
  { quote: "A must-have for anyone looking to save time and boost productivity.", tag: "Efficiency", bg: "#0d2836", accent: "text-white" },
  { quote: "This tech has completely streamlined my daily tasks.", tag: "Workflow", bg: "#0e3024", accent: "text-white" },
  { quote: "Innovative and powerful, yet so easy to use!", tag: "Simplicity", bg: "#132e40", accent: "text-white" },
  { quote: "It made everything smoother. Highly recommend!", tag: "Reliability", bg: "#18262f", accent: "text-white" },
];

function ArrowUpRight({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Shared card footer: divider + "explore" pill + index number. */
function CardFooter({ index, label, href }: { index: number; label?: string; href?: string }) {
  const inner = (
    <>
      <div className="h-px w-full bg-current/15" style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.12)' }} />
      <div className="flex items-center justify-between gap-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div className="flex items-center gap-2.5" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#03120e] shadow-md transition-transform duration-300 group-hover:scale-110"
            style={{
              display: 'flex',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#57d2f4',
              color: '#04151f',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight className="size-[14px]" style={{ width: '14px', height: '14px' }} />
          </span>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90"
            style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.9)' }}
          >
            {label || 'ALMA'}
          </span>
        </div>
        <span
          className="text-[11px] font-bold uppercase tabular-nums tracking-[0.18em] text-[#7ce577]"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: '#7ce577' }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <div className="relative z-[2] flex flex-col gap-3.5 hover-stack-footer" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {inner}
      </div>
    );
  }

  return (
    <div className="relative z-[2] flex flex-col gap-3.5 hover-stack-footer" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {inner}
    </div>
  );
}

export function HoverStack({
  cards = DEFAULT_CARDS,
  cardWidth = 330,
  cardHeight = 440,
  overlap = 160,
  hoverLift = 32,
  pushDistance = 250,
  spread = 24,
  rotation = 6,
  duration = 0.5,
  accentColor = "rgba(87, 210, 244, 0.4)",
  className = "",
}: HoverStackProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );

  useEffect(() => {
    setHasMounted(true);
    const mqTouch = window.matchMedia("(pointer: coarse)");
    const mqScreen = window.matchMedia("(max-width: 880px)");
    const update = () => setIsTouch(mqTouch.matches || mqScreen.matches);
    update();
    mqTouch.addEventListener("change", update);
    mqScreen.addEventListener("change", update);
    return () => {
      mqTouch.removeEventListener("change", update);
      mqScreen.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
      if (event.matches) setActiveIndex(null);
    };

    setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const preparedCards: PreparedHoverStackCard[] = useMemo(() => {
    const rotationScale = rotation / 7;

    return cards.map((card, index) => {
      const presetRotation =
        PRESET_ROTATIONS[index % PRESET_ROTATIONS.length] +
        (index % 2 === 0 ? 0 : 1);

      const baseX = index * overlap;

      return {
        ...card,
        _rotation: presetRotation * rotationScale,
        _baseX: baseX,
        _baseZ: index + 1,
      };
    });
  }, [cards, overlap, rotation]);

  const getCardStyle = (card: PreparedHoverStackCard, index: number): CSSVars => {
    const isActive = activeIndex === index;
    const hasActive = activeIndex !== null;

    let x = card._baseX;
    let y = 0;
    let rotate = card._rotation;
    let zIndex = card._baseZ;
    let scale = 1;

    if (reduceMotion) {
      if (isActive) zIndex = 999;

      return {
        "--card-width": `${cardWidth}px`,
        "--card-height": `${cardHeight}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`,
        zIndex,
        transition: "none",
        background: card.bg,
        border: card.borderColor ? `1px solid ${card.borderColor}` : '1px solid rgba(255,255,255,0.14)',
      };
    }

    let boxShadow = '0 18px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)';

    if (hasActive) {
      if (index < activeIndex) {
        x -= pushDistance;
        y -= spread * 0.4;
      } else if (index > activeIndex) {
        x += pushDistance;
        y += spread * 0.4;
      }

      if (isActive) {
        x = card._baseX;
        y = -hoverLift;
        rotate = 0;
        zIndex = 999;
        scale = 1.035;
        boxShadow = `0 28px 70px rgba(0,0,0,0.65), 0 0 0 2px ${accentColor}, 0 0 35px rgba(87,210,244,0.22)`;
      }
    }

    const activeMs = Math.max(0, duration) * 1000;
    const transition = isActive
      ? `transform ${activeMs}ms cubic-bezier(0.22, 1.6, 0.32, 1), box-shadow ${activeMs * (900 / 700)}ms cubic-bezier(0.22, 1.6, 0.32, 1)`
      : hasActive
        ? `transform ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : `transform ${activeMs * (480 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${activeMs * (380 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return {
      "--card-width": `${cardWidth}px`,
      "--card-height": `${cardHeight}px`,
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      transition,
      background: card.bg,
      border: card.borderColor ? `1px solid ${card.borderColor}` : '1px solid rgba(255,255,255,0.14)',
      boxShadow,
    };
  };

  const totalWidth =
    preparedCards.length > 0
      ? preparedCards.at(-1)!._baseX + cardWidth
      : cardWidth;

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={`hover-stack-wrapper relative w-full ${className}`} style={{ position: 'relative', width: '100%' }}>
      {isTouch ? (
        <div className="hover-stack-mobile-grid flex flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cards.map((card, index) => (
            <div
              key={card.id ?? index}
              className={`hover-stack-card relative flex w-full flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-xl ${card.accent || "text-white"}`}
              style={{
                background: card.bg,
                border: card.borderColor ? `1px solid ${card.borderColor}` : '1px solid rgba(255,255,255,0.14)',
                minHeight: '340px',
                padding: '28px 24px',
                borderRadius: '24px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              }}
            >
              {card.tag && (
                <div className="hover-stack-tag mb-3">
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#7ce577',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
              )}

              <div className="relative z-[2] flex flex-1 flex-col justify-center my-4">
                {card.title && (
                  <h3
                    style={{
                      fontFamily: 'Tusker, "Arial Narrow", Impact, sans-serif',
                      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                      fontWeight: 500,
                      lineHeight: 1.05,
                      textTransform: 'uppercase',
                      color: '#fff',
                      margin: '0 0 12px',
                    }}
                  >
                    {card.title}
                  </h3>
                )}
                {card.content ? (
                  card.content
                ) : (
                  <p className="m-0 max-w-full text-xl leading-[1.25] tracking-tight">
                    “{card.quote}”
                  </p>
                )}
              </div>

              <CardFooter index={index} label={card.footerLabel} href={card.footerHref} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="hover-stack-desktop-container relative mx-auto"
          style={{
            "--stack-width": `${totalWidth}px`,
            "--stack-height": `${cardHeight + (reduceMotion ? 0 : hoverLift) + 36}px`,
            width: "var(--stack-width)",
            height: "var(--stack-height)",
            position: 'relative',
            margin: '0 auto',
          } as CSSVars}
        >
          {preparedCards.map((card, index) => (
            <div
              key={card.id ?? index}
              className={`hover-stack-card absolute left-0 top-0 flex flex-col justify-between overflow-hidden rounded-3xl p-7 cursor-pointer select-none will-change-transform ${card.accent || "text-white"}`}
              style={{
                width: 'var(--card-width)',
                height: 'var(--card-height)',
                borderRadius: '24px',
                padding: '30px 26px',
                boxSizing: 'border-box',
                ...getCardStyle(card, index),
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {card.tag && (
                <div className="hover-stack-tag mb-2">
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#7ce577',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
              )}

              <div className="relative z-[2] flex flex-1 flex-col justify-center my-3">
                {card.title && (
                  <h3
                    style={{
                      fontFamily: 'Tusker, "Arial Narrow", Impact, sans-serif',
                      fontSize: 'clamp(2rem, 2.6vw, 3rem)',
                      fontWeight: 500,
                      lineHeight: 1.05,
                      textTransform: 'uppercase',
                      color: '#fff',
                      margin: '0 0 14px',
                    }}
                  >
                    {card.title}
                  </h3>
                )}
                {card.content ? (
                  card.content
                ) : (
                  <p className="m-0 max-w-[95%] text-2xl leading-[1.1] tracking-tight">
                    “{card.quote}”
                  </p>
                )}
              </div>

              <CardFooter index={index} label={card.footerLabel} href={card.footerHref} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HoverStack;
