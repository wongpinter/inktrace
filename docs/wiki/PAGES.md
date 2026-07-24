# Pages settings

Only visible in multi-page mode. Manage individual pages with different content.

## Page operations

| Action | Effect |
|--------|--------|
| Add page | Creates a blank page at the end |
| Duplicate page | Clones the page immediately after the current one |
| Delete page | Removes the page (minimum 1 page) |
| Move up/down | Reorders the page in the list |
| Update content per page | Each page can have its own type and text |

## Per-page content settings

| Setting | Type | What changes |
|---------|------|-------------|
| Worksheet Type | `text` `letters` `alphabet` `numbers` | What kind of content appears on that specific page |
| Text Content | free text | Shown when type is `text` |
| Letters to Practice | free text | Shown when type is `letters` |
| Empty Paper | boolean | Removes all text, shows only guidelines |
| Repeat Text | boolean | Repeats text to fill the page |

**Global settings still apply to all pages:**
- Font, size, trace style (Text group)
- Line spacing, guidelines (Guidelines group)
- Paper size, print quality (Document group)

**Real cases:**

**Case 1: Letter progression (3 pages)**
- Page 1: Type=letters, text=`Aa Bb Cc Dd`, repeatText=true
- Page 2: Type=text, text=`cat bat rat sat mat`, repeatText=false
- Page 3: Type=text, text=`I see a big fat cat sitting on a mat.`, repeatText=false

**Case 2: Name + sentence practice (2 pages)**
- Page 1: Type=text, text=`Liam Liam Liam Liam Liam Liam Liam`, repeatText=true
- Page 2: Type=text, text=`My name is Liam. I like to run in the park.`, repeatText=false

**Case 3: Mixed skill drill (5 pages)**
- Page 1: Type=alphabet, case=uppercase
- Page 2: Type=alphabet, case=lowercase
- Page 3: Type=letters, text=`Aa Bb Cc Dd Ee`
- Page 4: Type=numbers, includeNumbers=true
- Page 5: Type=text, text=`the and a to is in it of that for`, repeatText=true
