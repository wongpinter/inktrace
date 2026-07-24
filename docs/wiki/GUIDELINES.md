# Guidelines settings

Line spacing, guideline proportions, colors, margins, and baseline emphasis.

---

## Line Spacing Preset

Baseline-to-baseline distance. The vertical space from one baseline to the next.

| Preset | Spacing (mm) | Grade | Matches notebook paper |
|--------|-------------|-------|----------------------|
| `kindergarten` | 19 mm | K | Largest standard spacing |
| `grade1-3` | 12.7 mm (½") | 1–3 | Standard early elementary |
| `grade4-6` | 8.7 mm (11/32") | 4–6 | Wide ruled notebook |
| `wide-ruled` | 8.7 mm | 4+ | Standard wide ruled |
| `narrow-ruled` | 6.4 mm (¼") | 7+ | College ruled |
| `custom` | 6–25 mm | Any | Full control |

**Cases:**
- **Kindergarten (19mm)**: Big spacing for big letters. Beginning writers with limited fine motor control need this room.
- **Grades 1-3 (12.7mm)**: Default for most classroom worksheets. Matches standard handwriting paper for this age group.
- **Grades 4-6 (8.7mm)**: Students writing smaller now. Wide ruled matches their notebook paper so worksheets feel familiar.
- **Narrow Ruled (6.4mm)**: Middle and high school students. College-ruled paper standard.
- **Custom (15mm)**: Students who need an intermediate step between kindergarten and grade1-3 spacing.

**Recommendation:** Match the student's grade level. The presets are based on Zaner-Bloser and D'Nealian curriculum standards.

---

## Guideline Style

The line structure for each row of writing.

### Standard (3 lines)

```
──────────  Headline
                    (space)
──────────  Baseline
──────────  Descender line
```

- Simple 3-line system.
- No midline distinction.
- Best for older students or quick worksheets.

### Elementary (4 lines)

```
──────────  Headline (top)
─ ─ ─ ─ ─  Midline
──────────  Baseline
──────────  Descender line
```

- Educational 3:3:2 ratio (ascender:x-height:descender).
- Corect proportions for most handwriting instruction.
- Uses solid midline.

### Dotted Midline (4 lines)

```
──────────  Headline
· · · · ·  Midline (dotted)
──────────  Baseline
──────────  Descender line
```

- Same 3:3:2 ratio as elementary.
- Dotted midline highlights the x-height boundary without being visually dominant.
- The most popular style for K-2 handwriting practice.
- The dotted line trains students to keep lowercase letters within the x-height.

### Two-Line System (2 lines)

```
──────────  Headline
                    (space)
──────────  Baseline
```

- Only headline and baseline.
- Minimal visual noise. Encourages estimation of ascender/descender.
- Transitional step toward unlined paper.
- Best for confident writers in grades 3+.

**Progression:**
Dotted Midline (K-2) → Elementary (2-3) → Two-Line (3-4) → No guidelines.

---

## Show Guides

Master toggle for all guideline lines.

- ON: Guidelines drawn according to the chosen style.
- OFF: Completely blank white paper. Also hides guideline appearance settings.

**Cases:**
- ON: Standard practice. Almost all worksheet use cases.
- OFF: Test paper, final assessment, or students who have graduated from guidelines.

---

## Extend to Margins

Controls the page margin size.

| Value | Margin (each side) | Writing area |
|-------|-------------------|-------------|
| ON | 20px | Maximum use of the paper |
| OFF | 50px | Standard margins for notes |

**Cases:**
- ON: When you want maximum writing space. 20px margin leaves room for binding or hole punches.
- OFF: Standard margins. Leaves space for teacher corrections, dates, or decorations.

---

## Show Margin Lines

Dashed vertical lines for the left and right writing boundary.

**Cases:**
- ON: Early elementary (K-2) where students need to keep writing within the vertical bounds.
- OFF: Students who already respect the page margins.

---

## Guideline Color

| Preset | Headline | Midline | Baseline | Descender |
|--------|----------|---------|----------|-----------|
| Default | Gray | Light gray | Gray | Gray |
| Rainbow | Red | Orange | Green | Blue |
| Pastel | Pink | Plum | Powder blue | Pale green |
| Monochrome | Black | Dark gray | Black | Black |
| Custom | User pick | User pick | User pick | User pick |

**Cases:**
- **Default**: Standard, professional. Works for all ages and contexts.
- **Rainbow**: Fun and engaging for young children. Each line has a distinct colour, helping them describe "put the letter on the green line" or "stop at the orange line."
- **Pastel**: Softer version of rainbow. Less visually overwhelming.
- **Monochrome**: Clear black lines for high-contrast printing. Good for photocopying.
- **Custom**: Match school colours, or set specific colours for students with visual impairments.

**Recommendation:** Default for most. Rainbow for K-1 where color cues help spatial reasoning.

---

## Guideline Thickness

Range: 0.1–3 px.

- 0.5 px: Fine lines. Minimal ink, subtle guidance.
- 1.0 px: Standard thickness. Clear without dominating.
- 2.0 px: Thick lines. More visible, good for low-vision students or when printing on colored paper.
- 3.0 px: Heavy lines. Very prominent.

**Recommendation:** 1.0 px for standard printing. Thicker on colored paper or for students with visual needs.

---

## Guideline Opacity

Range: 0% (invisible) to 100% (fully opaque).

| Opacity | Effect |
|---------|--------|
| 20% | Very faint — guidance without distraction |
| 50% | Moderate — guides are visible but secondary |
| 80–100% | Full visibility — guidelines dominate |

**Cases:**
- **100%**: Standard clarity. Guidelines are clear reference points.
- **50%**: For transitional students who should slowly reduce reliance on guides.
- **20%**: Near-invisible safety net for students almost ready for unlined paper.

---

## Dashed Guidelines

Changes all guideline lines from solid to dashed (5px dash, 5px gap).

- OFF: All guidelines solid.
- ON: Every guideline line becomes dashed.

**Case:** Dashed guidelines reduce visual weight. Use as a transitional step toward unlined paper. Students can still see structure but must work harder to follow it.

---

## Emphasize Baseline

When ON, the baseline is drawn thicker than other lines (thickness = `baselineThickness`).

- Baseline is the most important line: letters sit on it.
- Emphasising it helps students keep their writing aligned.

**Cases:**
- ON: K-2, or any student who struggles with letter placement (floating letters above the baseline or dipping below it).
- OFF: Students who consistently sit their letters on the baseline.

---

## Baseline Thickness

Range: 0.1–5 px. Only applies when `emphasizeBaseline` is ON.

| Value | Effect |
|-------|--------|
| 1.5 px | Slightly thicker than guideline (subtle emphasis) |
| 2.5 px | Clearly thicker (good for K-1) |
| 4+ px | Very heavy baseline (strong visual anchor) |

**Case:** Set to 2.5 px for a kindergarten class where baseline awareness is still developing. The thick line becomes a clear visual anchor.
