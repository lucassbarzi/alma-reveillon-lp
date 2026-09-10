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
  layout?: "grid" | "stack";
}

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

/** Shared card footer: divider + explore pill + index number. */
function CardFooter({ index, label, isHovered }: { index: number; label?: string; isHovered?: boolean }) {
  return (
    <div className="hover-stack-footer-wrap">
      <div className="hover-stack-action-pill">
        <span
          className="hover-stack-action-circle"
          style={{
            transform: isHovered ? "scale(1.1) rotate(45deg)" : "scale(1) rotate(0deg)",
            background: isHovered ? "#7ce577" : "#57d2f4",
          }}
        >
          <ArrowUpRight style={{ width: "13px", height: "13px" }} />
        </span>
        <span className="hover-stack-action-label">
          {label || "ALMA"}
        </span>
      </div>
      <span className="hover-stack-index-num">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function HoverStack({
  cards = DEFAULT_CARDS,
  className = "",
}: HoverStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`hover-stack-wrapper ${className}`} style={{ position: "relative", width: "100%" }}>
      <div className="hover-stack-grid">
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && !isHovered;

          return (
            <div
              key={card.id ?? index}
              className="hover-stack-card-interactive"
              style={{
                background: card.bg,
                border: isHovered
                  ? `1px solid ${card.borderColor || "rgba(87,210,244,0.7)"}`
                  : "1px solid rgba(255,255,255,0.12)",
                boxShadow: isHovered
                  ? `0 24px 50px rgba(0,0,0,0.65), 0 0 0 1.5px ${card.borderColor || "rgba(87,210,244,0.5)"}, 0 0 28px rgba(87,210,244,0.2)`
                  : "0 10px 30px rgba(0,0,0,0.35)",
                opacity: isOtherHovered ? 0.84 : 1,
                transform: isHovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>
                {card.tag && (
                  <div className="hover-stack-header">
                    <span className="hover-stack-tag-badge">{card.tag}</span>
                  </div>
                )}
                {card.title && <h3 className="hover-stack-title">{card.title}</h3>}
              </div>

              <div className="hover-stack-body">
                {card.content ? card.content : <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.4 }}>“{card.quote}”</p>}
              </div>

              <CardFooter index={index} label={card.footerLabel} isHovered={isHovered} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HoverStack;
