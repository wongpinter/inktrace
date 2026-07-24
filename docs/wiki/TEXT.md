# Text settings

Font, trace style, size, spacing, and case — how the practice text looks on the worksheet.

---

## Font Family

100+ Google Fonts organized into categories:

| Category | Example fonts | Best for |
|----------|--------------|----------|
| Educational | Edu QLD Beginner, Edu SA Beginner, Schoolbell | Curriculum-aligned handwriting (Zaner-Bloser, D'Nealian) |
| Handwriting | Caveat, Dancing Script, Pacifico | General handwriting practice |
| Cursive | Tangerine, Alex Brush, Marck Script | Cursive/joined letter practice |
| Display | Lobster, Fredoka One, Bangers | Fun worksheets, headings |
| Serif | Merriweather, Playfair Display, Lora | Formal text practice |
| Sans Serif | Roboto, Open Sans, Lato | Clean, modern readability |
| Monospace | Roboto Mono, Source Code Pro, Courier Prime | Tech-oriented, coding-adjacent practice |

**Cases:**
- **Educational fonts**: Default choice for school worksheets. Teaches correct letter shapes for the local curriculum.
- **Handwriting fonts**: Natural-looking hand-lettered style. Good for older students.
- **Cursive fonts**: Joined-up writing practice. Pair with narrow spacing.
- **Display fonts**: Eye-catching for younger children. Use sparingly — not for standard practice.

**Recommendation**: Start with `Edu QLD Beginner` for general handwriting. Switch to `Dancing Script` for cursive practice.

---

## Font Size

Range: 8–120 px.

| Range | Grade | Lines per typical page |
|-------|-------|----------------------|
| 48–60 px | Kindergarten (ages 4–6) | 3–5 |
| 36–48 px | Grades 1–3 (ages 6–9) | 5–8 |
| 26–36 px | Grades 4–6 (ages 9–12) | 8–12 |
| 14–26 px | Middle school+ | 12–20 |

**Cases:**
- **48px**: Good start for most early elementary worksheets. Kids can see each stroke clearly.
- **60px**: For very young (K) or students with fine motor delays. Fewer words per page, bigger targets.
- **26px**: More mature writers who need less guidance. Fits more practice on one page.
- **18px**: Advanced quick-practice — high volume, minimal guidance.

---

## Text Trace Style

| Style | Render | Difficulty | Best for |
|-------|--------|-----------|----------|
| `dotted` | Fine dots outline each letter | Easiest | Beginners tracing letter shapes |
| `dashed` | Long dashes outline each letter | Easy | Intermediates who have some letter familiarity |
| `outline` | Hollow letter outlines | Medium | Students who trace the inside of the letter |
| `solid` | Fully filled letter at reduced opacity | Medium | Reading-style text, or very light guidance |
| `thin` | Fine dashed outline | Hardest | Pen tracing with minimal visual clutter |

**Cases:**
- **dotted**: Standard tracing for K-2. The dots provide clear guidance for each stroke.
- **thin**: Older students (grade 4+) who need only a hint of guidance before writing independently on blank lines.
- **solid**: More like a "read and copy" style — student reads the word and writes it below.

---

## Text Opacity

Range: 0% (invisible) to 100% (fully visible).

| Opacity | Effect |
|---------|--------|
| 10–20% | Faint guide — student's writing dominates, trace is barely visible |
| 30–40% | Good balance — trace is visible but doesn't compete with student's stroke |
| 50–70% | Prominent guidance — trace is clearly visible alongside student's writing |
| 100% | Fully solid — like reading text. Use with solid trace style for "copy" worksheets |

**Cases:**
- **30%**: Default. Student can see the traces but their own writing sits clearly on top.
- **50%**: For students who need more guidance — they can see each trace clearly before attempting.
- **100% solid**: Use as "copy this" model rather than trace-over.
- **15%**: For students who are nearly ready for blank paper — the trace is almost invisible as a safety net.

---

## Starting Dots

Small red dot at the starting point of each letter.

- ON: Shows starting dots. Essential for early handwriting to teach correct stroke start.
- OFF: No dots. For students who already know where each letter begins.

**Case:** K-1 students learning letter formation need starting dots. By grade 2, many no longer need them. Remove dots gradually as students progress.

---

## Stroke Direction Arrows

Small arrows showing the direction of each stroke.

- Available but currently non-functional in the UI (hidden by default).
- Future feature: directional arrows for each stroke of a letter.

---

## Letter Spacing

Range: -5 (tight) to 20 (loose) pixels.

| Value | Look | Use when |
|-------|------|----------|
| -2 to -1 | Letters closer together | Cursive practice, joined writing |
| 0 | Normal font spacing | Standard practice |
| 1–3 | Slightly spaced | Beginners who cluster letters too tightly |
| 4–8 | Widely spaced | Very early writers or those with motor control challenges |
| 8+ | Very loose | Special needs, visual clarity exercises |

**Cases:**
- **-2**: Cursive practice where letters need to flow into each other. Negative spacing pulls them closer.
- **2**: K-1 students who are just learning individual letter shapes. Extra space prevents letter crowding.
- **0**: Default for most practice.

---

## Word Spacing

Range: 0–20 pixels.

| Value | Effect |
|-------|--------|
| 0 | No extra space beyond font's built-in spacing |
| 5 | Standard extra space between words |
| 10+ | Very distinct word boundaries |

**Cases:**
- **5**: Default. Clear word separation without wasting space.
- **10**: Early readers who still confuse word boundaries. Wider spacing helps distinguish individual words.
- **0**: Fluent writers where tight spacing is fine.

---

## Character Width

| Value | Scale | Effect |
|-------|-------|--------|
| `condensed` | 0.85× | Compresses text horizontally. Fits more text per line. |
| `normal` | 1.0× | Natural font width. |
| `expanded` | 1.15× | Stretches text. Gives more horizontal space per letter. |

**Cases:**
- **expanded**: Early writers who write very wide and need to see the target letter's full shape.
- **normal**: Default for general practice.
- **condensed**: Advanced/fluent handwriting practice. Good for cursive.

---

## Practice Lines

Range: 1–5 lines per set.

Each set has one tracing line, then N-1 blank lines after it:

| Value | Lines | Use |
|-------|-------|-----|
| 1 | 1 trace line | Just trace — ideal for very early learners |
| 2 | 1 trace + 1 blank | Trace once on top, then copy once below |
| 3 | 1 trace + 2 blank | Trace then practice twice |
| 5 | 1 trace + 4 blank | Maximum independent practice — trace then try repeatedly |

**Case:** 3 lines = trace then write twice is the most common classroom pattern. The student traces the dotted word, then writes it from memory twice.

---

## Text Case

| Value | Example |
|-------|---------|
| `none` | Text as entered: `the quick brown fox` |
| `uppercase` | All caps: `THE QUICK BROWN FOX` |
| `lowercase` | All lower: `the quick brown fox` |
| `titlecase` | Each word capitalized: `The Quick Brown Fox` |

**Cases:**
- `lowercase`: 90% of handwriting practice. Most letters students write are lowercase.
- `uppercase`: Drilling capital letters. Use when students are specifically learning capitals.
- `titlecase`: Teaching proper nouns and capitalization rules alongside handwriting.
- `none`: Use when the text already has intended capitalization (e.g. student names).

---

## Vertical Alignment

| Value | Effect |
|-------|--------|
| `baseline` | Text sits on the baseline (recommended) |
| `center` | Text centred vertically in the guideline space |
| `top` | Text positioned near the headline |

**Cases:**
- **baseline**: Standard. Letters sit where they belong on the guideline.
- **center**: Useful for very young students who haven't internalized baseline placement.
- **top**: Rarely used. Can help students who consistently write below the line.
