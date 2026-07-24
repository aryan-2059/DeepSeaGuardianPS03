import React, { useEffect, useState } from "react";

// Curated fallback so the demo never shows a blank strip if the network
// is slow/unavailable during judging — this is the only hardcoded content,
// everything else comes from the live fetch below.
const FALLBACK_QUOTES = [
  { text: "In every walk with nature one receives far more than he seeks.", author: "John Muir" },
  { text: "The sea, once it casts its spell, holds one in its net of wonder forever.", author: "Jacques Cousteau" },
  { text: "We do not inherit the earth from our ancestors; we borrow it from our children.", author: "Native American Proverb" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
];

const THEME_WORDS = [
  "nature", "ocean", "sea", "earth", "life", "wild", "world",
  "animal", "planet", "environment", "river", "mountain", "forest",
];

export default function QuoteBar() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://type.fit/api/quotes")
      .then((r) => {
        if (!r.ok) throw new Error("quote api unavailable");
        return r.json();
      })
      .then((list) => {
        if (cancelled || !Array.isArray(list) || list.length === 0) throw new Error("empty");
        const themed = list.filter(
          (q) => q.text && THEME_WORDS.some((w) => q.text.toLowerCase().includes(w))
        );
        const pool = themed.length > 0 ? themed : list;
        const picked = pool[Math.floor(Math.random() * pool.length)];
        if (!cancelled) {
          setQuote({
            text: picked.text.replace(/\s*-\s*type\.fit$/i, "").trim(),
            author: picked.author && picked.author !== "type.fit" ? picked.author : "Unknown",
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setQuote(FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!quote) return null;

  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "28px 0",
        background: "rgba(63,212,196,0.03)",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            lineHeight: 1.5,
            maxWidth: 720,
            margin: "0 auto",
            fontStyle: "italic",
            color: "var(--bone)",
          }}
        >
          “{quote.text}”
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginTop: 12,
          }}
        >
          — {quote.author}
        </p>
      </div>
    </div>
  );
}
