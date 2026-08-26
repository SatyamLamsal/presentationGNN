# Defense Presentation — Hybrid GCN–GAT (ASAG)

**Project:** False Information Detection on Social Media Using a Hybrid Graph
Convolutional–Attention Network
**Authors:** Satyam Lamsal (PUL080BCT078) · Saroj Rawal (PUL080BCT076)
**Supervisor:** Mrs. Anku Jaiswal · Department of Electronics & Computer Engineering, Pulchowk Campus

A self-contained, offline HTML/CSS/JS slide deck — no build step, no server. Open
`index.html` in any modern browser and present.

## 📁 Project structure
```
presentation-deck/
├── index.html          ← the deck (21 slides)
├── css/style.css        ← design system, diagrams, animations, print styles
├── js/script.js          ← navigation, speaker notes, overview grid
├── assets/
│   ├── tu_logo.png       ← TU crest (footer + closing slide) — replace if you like
│   └── coverPage.png     ← ⚠️ PLACEHOLDER — replace with YOUR finished cover slide
└── README.md
```

## 🖼️ Add your own cover slide
Slide 1 is **hardcoded** to display `assets/coverPage.png` full-bleed, exactly as
designed — no HTML/CSS overlay, no text added on top. To use yours:

1. Save your finished cover design as **`assets/coverPage.png`**.
2. Recommended size: **1600×900 (16:9)** so it fills the frame with zero cropping.
3. Refresh the browser — done, no code changes needed.

## ▶️ How to present
Open `index.html` directly (double-click, or drag into a browser tab).

| Key | Action |
|---|---|
| **→ / Space / PageDown** | Next slide |
| **← / PageUp** | Previous slide |
| **F** | Toggle fullscreen |
| **N** | Toggle speaker-notes drawer (cues for what to say) |
| **O** | Toggle slide overview (click any tile to jump) |
| **Home / End** | Jump to first / last slide |
| Click | Right 65% of screen = next, left 35% = previous |

Deep-link to any slide for rehearsal: `index.html#9`.

## 🗂️ Slide structure (21 slides)
1. Cover 2. Presentation Outline 3. **Divider — Motivation** 4. Objectives
5. The Core Challenge 6. Twitter15 Dataset 7. GCN vs GAT 8. **Divider — Proposed Method**
9. **ASAG — Adaptive Fusion** 10. How the Gate Learns 11. Overall Architecture
12. Features & Constraints 13. Training Setup & Parameters 14. Evaluation Metrics
15. **Divider — Results** 16. Results 17. Comparative Analysis 18. Conclusion
19. Future Work 20. References 21. Thank You

## 🎨 Design language
Redesigned around the reference concepts you provided:
- **Numbered badges** (01, 02, …) for outlines and step lists.
- **Section-divider slides** — big number, vertical rule, title/description on the
  left; a decorative **network-graph** motif on the right (fitting, since the whole
  project is about graph neural networks).
- **Bordered circular icons** (not filled squares) for card headers.
- **Overall Architecture** — a real 5-column pipeline diagram (Input → Encoders →
  Graph Backbones → Adaptive Fusion → Prediction) with the ASAG box highlighted.
- **ASAG gate-fusion visual** — GCN output dots and GAT output dots flowing into a
  gate box, producing a fused dot row, directly illustrating the equation.
- **Real SVG bar charts** with gridlines, axis labels, and value callouts (not CSS
  divs) for the Results and Comparison slides.
- **Pull-quote card** on the Conclusion slide, paired with icon+text takeaway cards.
- Crisp **inline SVG icons** throughout — no emoji, renders identically everywhere.
- Small entrance animations (fade-up, growing bars, filling gate bar, animated
  pipeline arrows, drifting network nodes) that replay on every visit to a slide.
  Respects `prefers-reduced-motion`.

## 🖨️ Printing / PDF export
Press **Ctrl/Cmd + P** — a dedicated print stylesheet lays out one slide per page.

## ✏️ Editing content
- All slide text lives in `index.html` as `<section class="slide" id="...">` blocks,
  in presentation order.
- Speaker notes + overview titles are in the `META` array at the top of
  `js/script.js` — keep it in the same order as the slides in `index.html`.
- The two SVG bar charts (Results, Comparative Analysis) and four network-graph
  decorations are hand-authored inline SVG inside `index.html`; if you re-run
  experiments, update the `<rect class="barfill">` height/x/width values and the
  value `<text>` labels to match your new numbers.

## ✅ Verified
- 21 slide sections match 21 speaker-note entries.
- All icon `<use href="#i-...">` references resolve against the icon sprite.
- HTML tags and JS braces/parens are balanced; rendered in a headless browser to
  confirm the cover, outline, dividers, ASAG visual, architecture pipeline, bar
  charts, conclusion quote, notes drawer, and overview grid all display correctly.
