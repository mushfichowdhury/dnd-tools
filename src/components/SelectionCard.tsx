"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Source, SubclassFeature } from "@/types";
import { Tier } from "@/data/rankings";
import SourceBadge from "./SourceBadge";
import TierBadge from "./TierBadge";

interface SelectionCardProps {
  title: string;
  synopsis: string;
  hint: string;
  source: Source;
  selected: boolean;
  onClick: () => void;
  tags?: string[];
  extraNote?: string;
  tier?: Tier;
  features?: SubclassFeature[];
}

export default function SelectionCard({
  title,
  synopsis,
  hint,
  source,
  selected,
  onClick,
  tags,
  extraNote,
  tier,
  features,
}: SelectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`w-full cursor-pointer rounded-lg border p-4 text-left transition-colors ${
        selected
          ? "ring-2 ring-amber-500 bg-gray-800 border-amber-500"
          : "border-gray-700 bg-gray-900 hover:border-amber-500/50"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-lg font-semibold text-amber-400">{title}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {tier && <TierBadge tier={tier} />}
          <SourceBadge source={source} />
        </div>
      </div>
      <p className="mb-2 text-sm leading-relaxed text-gray-300">{synopsis}</p>
      <p className="mb-3 flex items-start gap-1.5 text-sm italic text-gray-400">
        <svg width="16" height="16" viewBox="0 0 16 16" className="mt-0.5 shrink-0 text-amber-500/60" fill="currentColor">
          <path d="M8 1a5 5 0 0 0-2 9.584V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.416A5 5 0 0 0 8 1zm0 2a3 3 0 0 1 1.5 5.598V11h-3V8.598A3 3 0 0 1 8 3zM6 14h4v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1z" />
        </svg>
        {hint}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center justify-center rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {extraNote && (
        <p className="mt-2 rounded bg-amber-500/10 px-2 py-1.5 text-xs text-amber-300">
          5.5e: {extraNote}
        </p>
      )}
      {features && features.length > 0 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((v) => !v);
            }}
            className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-amber-500/70 transition-colors hover:text-amber-400"
          >
            <span>{isExpanded ? "Hide abilities" : "Show abilities by level"}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="M6 8L1 3h10L6 8z" />
            </svg>
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 border-t border-gray-700 pt-3">
                  {features.map((f) => (
                    <div key={f.level}>
                      <div className="flex items-center gap-1.5">
                        <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-bold text-amber-400">
                          Lv {f.level}
                        </span>
                        <span className="truncate text-xs font-semibold text-gray-200">{f.name}</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-400">{f.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}
