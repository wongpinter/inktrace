# InkTrace Technical Architecture

## Domain terms

### Worksheet renderer
Module that turns worksheet preferences and page content into a rendered worksheet page. It must keep preview and PDF export visually consistent.

### Worksheet page
Single printable page of handwriting practice content, including text, guidelines, header, footer, and page number.

### Guideline layout
Educational handwriting guide geometry: headline, midline, baseline, descender line, line spacing, and 3:3:2 proportions.

### Trace text
Practice text drawn for handwriting guidance, including opacity, trace style, letter spacing, word spacing, character width, starting dots, and vertical alignment.

### Practice content
Generated handwriting practice text, including sight words, word patterns, sentence templates, name practice, custom word lists, and random word sets.

### Worksheet preferences
Saved and active worksheet configuration, including defaults, persistence merge behavior, presets, and user-selected rendering/content options.

### Page set
Module that owns page creation, page count, and effective page preference resolution across single-page and multi-page modes.

### Effective page preferences
Merged preferences for one page: global worksheet settings plus page-local content settings in multi-page mode.
