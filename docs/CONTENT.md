# Content settings

What text appears on the worksheet. Also covers auto-generated content.

---

## Worksheet Type

| Value | Shows | Trace behavior |
|-------|-------|----------------|
| `text` | Custom entered text | Wraps words across lines, repeats if enabled |
| `letters` | Specific letter pairs (e.g. `Aa Bb Cc`) | Each pair on one line if short |
| `alphabet` | Full alphabet in chosen case | Upper, lower, or both separated by space |
| `numbers` | Digits and/or symbols | 0–9 and common symbols |

**Cases:**
- **text**: Writing full words and sentences. Use for sentences like `The quick brown fox jumps over the lazy dog`.
- **letters**: Practicing specific letter formations. `Aa Bb Cc` — ideal for introducing new letters each week.
- **alphabet**: Full alphabet drills. Good for warm-up before writing actual text.
- **numbers**: Number tracing. Combine both digits and symbols for a comprehensive math handwriting sheet.

---

## Text Content

Free text input for type=text. Text wraps at the guideline width.

**Tips:**
- Use repeated words: `the the the the the the` for high-frequency word drill.
- Use short sentences: `I can see the big brown dog.`
- Use word lists: `cat bat rat sat mat hat pat`
- Empty text = a blank line (only guidelines will be drawn if not emptyPaper).

---

## Specific Letters

Free text for type=letters. Spaces separate each letter group.

**Recommendations:**
- One uppercase/lowercase pair per group: `Aa Bb Cc`
- Group similar formation letters: `Aa Cc Ee` (circle letters) or `Ll Tt Ii` (down letters)

---

## Alphabet Case

| Value | Rendered |
|-------|----------|
| `uppercase` | `A B C D ... Z` |
| `lowercase` | `a b c d ... z` |
| `both` | `A B C D ... Z   a b c d ... z` |

**When to use:**
- `uppercase`: Beginning writers who struggle with capitals first. Some curricula teach capitals before lowercase.
- `lowercase`: Most handwriting instruction focuses on lowercase. Use this as default.
- `both`: Side-by-side practice showing the capital/lowercase pair. Good for worksheets that teach letter recognition alongside formation.

---

## Include Numbers / Include Symbols

| Setting | Content |
|---------|---------|
| numbers only | `0 1 2 3 4 5 6 7 8 9` |
| symbols only | `! @ # $ % ^ & * ( ) ...` |
| both | `0 1 2 3 4 5 6 7 8 9   ! @ # $ % ^ & * ...` |

**Case:** A numbers worksheet for early elementary learning to write digits for math class. Start with numbers only, add symbols once digit formation is solid.

---

## Empty Paper

- ON = removes all text, shows only guidelines across the page.
- All text-related settings (font, size, trace style, spacing) are hidden or inactive when on.
- Useful for: free writing, dictation, student-generated content, teacher notes.

---

## Repeat Text

- ON = the same text loops and fills every line set until the page is full.
- OFF = text flows naturally and stops when it reaches the end.

**Case:** Repeat `Aa` 50 times to really drill letter formation. Without repeat, the text naturally ends and leaves blank space.

---

## Practice Content Generation

### Sight Words

Pre-built lists: Dolch (Pre-primer through 3rd grade) and Fry (First 300).

| List | Word count | Grade |
|------|-----------|-------|
| Dolch Pre-Primer | 40 | K |
| Dolch Primer | 52 | K–1 |
| Dolch First | 41 | 1 |
| Dolch Second | 46 | 2 |
| Dolch Third | 41 | 3 |
| Fry First 100 | 100 | K–1 |
| Fry Second 100 | 100 | 1–2 |
| Fry Third 100 | 100 | 2–3 |

**Case:** Generate a worksheet from Dolch Primer words to match the weekly reading list. Auto-fills `text` with the chosen word list.

### Word Patterns

| Pattern | Example words | Grade |
|---------|--------------|-------|
| CVC (consonant-vowel-consonant) | cat, dog, sun, bed, pig | K–1 |
| CVCe (silent e) | cake, bike, home, cute, make | 1 |
| CCVC (blend start) | stop, plan, frog, slip, crab | 1 |
| CVCC (blend end) | band, bent, camp, damp, fast | 1 |
| Digraphs | chip, shop, that, when, phone | 1–2 |
| Vowel Teams | rain, read, boat, feet, moon | 1–2 |

**Case:** Generate a CVC words worksheet for a kindergarten phonics lesson. Practice `cat, bat, rat` by adding them to custom word list.

### Sentence Templates

Template texts like `The {adjective} {noun} {verb} {adverb}.` Click a template to generate 5 unique sentences. Each `{placeholder}` is replaced with a random word from a curated word bank.

**Case:** Generate 5 sentences using adjectives and nouns from the week's vocabulary list.

### Name Practice

Type a name (e.g. `Liam`) and generate 10 repetitions to trace. Also includes a list of common names for quick selection.

**Case:** At the start of term, generate name practice worksheets for each student in class. This is often the most requested worksheet type for kindergarten.

### Custom Word Lists

- Manually type words separated by spaces or commas.
- Import from a `.txt` file.
- Export current list to `.txt`.
- Words appear as tags that can be individually removed.

**Case:** A teacher has a weekly spelling list of 10 words. Paste them, add to the worksheet, and assign as handwriting + spelling homework.

### Random Word Generator

Pick difficulty level (easy/medium/hard) and number of words (5–30). Generator picks random words from the corresponding word pattern levels.

| Level | Length | Patterns |
|-------|--------|----------|
| Easy | 3–4 letters | CVC |
| Medium | 5–6 letters | CVCe, CCVC, CVCC |
| Hard | 7+ letters | Digraphs, Vowel Teams |
