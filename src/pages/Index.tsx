import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Download, Type, Search, FileText, Settings } from 'lucide-react';
import { jsPDF } from 'jspdf';

const HandwritingWorksheetGenerator = () => {
  // --- STATE ---
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  const [fontSize, setFontSize] = useState(48);
  const [lineCount, setLineCount] = useState(3);
  const [selectedFont, setSelectedFont] = useState('Edu QLD Beginner');
  const [showGuides, setShowGuides] = useState(true);
  const [fontCategory, setFontCategory] = useState('educational');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(new Set());
  
  // New options
  const [paperSize, setPaperSize] = useState('a4');
  const [pageCount, setPageCount] = useState(1);
  const [dottedFont, setDottedFont] = useState(true);
  const [guidelineStyle, setGuidelineStyle] = useState('elementary');
  const [guidelineThickness, setGuidelineThickness] = useState(1);
  const [emptyPaper, setEmptyPaper] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- CONSTANTS ---
  
  // FIXED: Correct dimensions for A4 and A5 at 96 PPI
  const paperSizes = {
    a4: { width: 794, height: 1122, label: 'A4 (210 × 297 mm)' },
    letter: { width: 816, height: 1056, label: 'Letter (8.5 × 11 in)' },
    legal: { width: 816, height: 1344, label: 'Legal (8.5 × 14 in)' },
    a5: { width: 559, height: 794, label: 'A5 (148 × 210 mm)' }
  };

  const guidelineStyles = {
    standard: { label: 'Standard (3 lines)', lines: 3, dottedMiddle: false },
    elementary: { label: 'Elementary (4 lines)', lines: 4, dottedMiddle: false },
    dotted: { label: 'Dotted Middle (3 lines)', lines: 3, dottedMiddle: true },
    double: { label: 'Double Lines (2 lines)', lines: 2, dottedMiddle: false }
  };

  const googleFonts = {
    educational: [
      'Edu QLD Beginner', 'Edu SA Beginner', 'Edu VIC WA NT Beginner',
      'Edu NSW ACT Foundation', 'Edu TAS Beginner', 'Schoolbell',
      'Architects Daughter', 'Patrick Hand', 'Kalam', 'Gochi Hand',
      'Neucha', 'Handlee', 'Pangolin', 'Sriracha', 'Mali'
    ],
    handwriting: [
      'Caveat', 'Dancing Script', 'Pacifico', 'Satisfy', 'Cookie',
      'Great Vibes', 'Allura', 'Kaushan Script', 'Homemade Apple',
      'Permanent Marker', 'Indie Flower', 'Shadows Into Light',
      'Amatic SC', 'Reenie Beanie', 'Gloria Hallelujah', 'Covered By Your Grace',
      'Rock Salt', 'Just Another Hand', 'Dawning of a New Day'
    ],
    cursive: [
      'Tangerine', 'Alex Brush', 'Marck Script', 'Pinyon Script',
      'Mr Dafoe', 'Niconne', 'Sofia', 'Rouge Script', 'Calligraffitti',
      'Bad Script', 'Euphoria Script', 'Yellowtail', 'Sacramento',
      'Ruthie', 'Waiting for the Sunrise', 'Stalemate', 'Petit Formal Script'
    ],
    display: [
      'Lobster', 'Fredoka One', 'Righteous', 'Bangers', 'Chewy',
      'Passion One', 'Bungee', 'Monoton', 'Abril Fatface', 'Ultra',
      'Alfa Slab One', 'Patua One', 'Staatliches', 'Titan One',
      'Fredericka the Great', 'Bungee Shade', 'Creepster'
    ],
    serif: [
      'Merriweather', 'Playfair Display', 'Lora', 'Crimson Text',
      'PT Serif', 'Libre Baskerville', 'Vollkorn', 'Cardo',
      'Arvo', 'Bitter', 'Roboto Slab', 'Zilla Slab', 'Spectral',
      'Alegreya', 'Old Standard TT', 'Cormorant', 'EB Garamond'
    ],
    sansSerif: [
      'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway',
      'Poppins', 'Nunito', 'Ubuntu', 'Mukta', 'Rubik',
      'Work Sans', 'Noto Sans', 'Oxygen', 'Quicksand', 'Barlow',
      'Josefin Sans', 'Comfortaa', 'Varela Round', 'Cabin'
    ],
    monospace: [
      'Roboto Mono', 'Source Code Pro', 'Courier Prime', 'Space Mono',
      'IBM Plex Mono', 'Inconsolata', 'Ubuntu Mono', 'Fira Mono',
      'PT Mono', 'Overpass Mono', 'Anonymous Pro', 'VT323'
    ]
  };

  const categoryLabels = {
    all: 'All Fonts',
    educational: 'Educational',
    handwriting: 'Handwriting',
    cursive: 'Cursive',
    display: 'Display',
    serif: 'Serif',
    sansSerif: 'Sans Serif',
    monospace: 'Monospace'
  };

  // --- FONT LOADING & FILTERING ---

  // PERFORMANCE: useMemo caches the flattened 'all fonts' array
  const allFonts = useMemo(() => Object.values(googleFonts).flat(), []);

  // PERFORMANCE: useMemo prevents recalculating on every render
  const filteredFonts = useMemo(() => {
    const fonts = fontCategory === 'all' ? allFonts : (googleFonts[fontCategory as keyof typeof googleFonts] || []);
    if (!searchQuery) return fonts;
    return fonts.filter(font => 
      font.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [fontCategory, searchQuery, allFonts]);


  const loadFont = (fontName: string) => {
    if (fontsLoaded.has(fontName) || !fontName) return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    link.onload = () => {
      setFontsLoaded(prev => new Set(prev).add(fontName));
    };
    // Add to set immediately to prevent re-fetching
    setFontsLoaded(prev => new Set(prev).add(fontName));
  };

  useEffect(() => {
    loadFont(selectedFont);
  }, [selectedFont]);
  
  // --- DRAWING LOGIC ---

  const drawGuidelines = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, style: string) => {
    const { lines, dottedMiddle } = guidelineStyles[style as keyof typeof guidelineStyles];
    
    const topLineY = y;
    const bottomLineY = y + fontSize;
    const totalHeight = bottomLineY - topLineY;
    
    ctx.lineWidth = guidelineThickness;

    for (let i = 0; i < lines; i++) {
      let currentY;
      
      if (lines === 2) {
        currentY = i === 0 ? topLineY : bottomLineY;
      } else if (lines === 3) {
        if (i === 0) currentY = topLineY;
        else if (i === 1) currentY = topLineY + (totalHeight * 0.65); // baseline
        else currentY = bottomLineY;
      } else if (lines === 4) {
        if (i === 0) currentY = topLineY;
        else if (i === 1) currentY = topLineY + (totalHeight * 0.35); // top-middle
        else if (i === 2) currentY = topLineY + (totalHeight * 0.65); // baseline
        else currentY = bottomLineY;
      }
      
      if (i === 0 || (i === lines - 1 && lines > 1)) {
        ctx.strokeStyle = '#999999';
        ctx.setLineDash([]);
      } else if (dottedMiddle && (i === 1 && lines === 3) || (i === 1 && lines === 4)) {
        ctx.strokeStyle = '#cccccc';
        ctx.setLineDash([3, 3]);
      } else {
        ctx.strokeStyle = '#cccccc';
        ctx.setLineDash([]);
      }
      
      ctx.beginPath();
      ctx.moveTo(x, currentY!);
      ctx.lineTo(x + width, currentY!);
      ctx.stroke();
    }
    
    ctx.setLineDash([]);
  };

  // FIXED: Simplified function lets canvas handle kerning/spacing
  const drawDottedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    
    // Stroke and Fill the whole text, letting canvas handle spacing
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    
    ctx.restore();
  };

  const drawTracingLine = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, lineHeight: number) => {
    // This 'y' calculation is confusing but consistent with the original.
    // It seems 'y' is not the top of the line, but (top + 0.35 * fontSize).
    const guidelineTopY = y - fontSize * 0.35;
    const baselineY = guidelineTopY + (fontSize * 0.65); // 65% down from top
    
    for (let i = 0; i < lineCount; i++) {
      const currentTopY = guidelineTopY + (i * lineHeight);
      const currentBaselineY = baselineY + (i * lineHeight);
      
      if (showGuides) {
        drawGuidelines(ctx, x, currentTopY, ctx.canvas.width - (x * 2), guidelineStyle);
      }
      
      if (i === 0) {
        // First line is for tracing
        ctx.font = `${fontSize}px "${selectedFont}"`;
        if (dottedFont) {
          drawDottedText(ctx, text, x, currentBaselineY);
        } else {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillText(text, x, currentBaselineY);
        }
      }
      // Other lines (i > 0) are left blank for practice
    }
  };

  // REFACTORED: All drawing logic is now in this one function
  const drawPage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const margin = 50;
    const contentWidth = width - (margin * 2);
    const contentHeight = height - margin; // Usable height
    
    // This y-position tracks (topLineY + 0.35 * fontSize)
    let yPosition = margin + fontSize; 

    if (emptyPaper) {
      const lineSetHeight = fontSize * 2; // Height of one full line set
      
      while (yPosition < contentHeight) {
        if (showGuides) {
          drawGuidelines(ctx, margin, yPosition - fontSize * 0.35, contentWidth, guidelineStyle);
        }
        yPosition += lineSetHeight;
      }
    } else {
      const lineHeight = fontSize * 1.8; // Space between practice lines
      const lineSetHeight = (lineHeight * (lineCount - 1)) + (fontSize * 1.5); // Total height of a set
      
      ctx.font = `${fontSize}px "${selectedFont}"`;
      
      const words = text.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        
        if ((metrics.width > contentWidth && currentLine) || i === words.length - 1) {
          let lineToDraw = (metrics.width > contentWidth && currentLine) ? currentLine : testLine;
          
          if (i === words.length - 1 && !(metrics.width > contentWidth && currentLine)) {
            // This is the last word, draw the whole testLine
            lineToDraw = testLine;
          } else if (metrics.width > contentWidth && currentLine) {
            // The new word makes it too long, draw the previous line
            lineToDraw = currentLine;
            // Push the current word to be the start of the next line
            i--; 
          }

          if (yPosition < contentHeight) {
            drawTracingLine(ctx, lineToDraw, margin, yPosition, lineHeight);
            yPosition += lineSetHeight;
            currentLine = '';
          } else {
            // Stop drawing if we run off the page
            break; 
          }
        } else {
          currentLine = testLine;
        }
      }
    }
  };

  // --- ACTIONS ---

  // REFACTORED: Generates a single, multi-page PDF
  const generatePDF = () => {
    const size = paperSizes[paperSize as keyof typeof paperSizes];
    // Use 'p' for portrait, 'px' for units
    const pdf = new jsPDF({
      orientation: size.width > size.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [size.width, size.height]
    });
    
    for (let i = 0; i < pageCount; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = size.width;
      canvas.height = size.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) continue;
      
      // Draw the page content
      drawPage(ctx, size.width, size.height);
      
      // Add the canvas as an image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, size.width, size.height);
      
      // Add a new page unless it's the last one
      if (i < pageCount - 1) {
        pdf.addPage();
      }
    }
    
    pdf.save('handwriting-worksheet.pdf');
  };

  // REFACTORED: Now just calls the main drawPage function
  const preview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = 700;
    // Calculate aspect ratio for preview
    const aspect = paperSizes[paperSize as keyof typeof paperSizes].height / paperSizes[paperSize as keyof typeof paperSizes].width;
    const height = width * aspect;
    
    canvas.width = width;
    canvas.height = height;

    // We must scale the context to draw the preview correctly
    ctx.save();
    const scale = width / paperSizes[paperSize as keyof typeof paperSizes].width;
    ctx.scale(scale, scale);
    
    // Draw the page using the *full* paper size dimensions
    drawPage(ctx, paperSizes[paperSize as keyof typeof paperSizes].width, paperSizes[paperSize as keyof typeof paperSizes].height);
    
    ctx.restore();
  };

  // --- EFFECTS ---
  useEffect(() => {
    if (text || emptyPaper) {
      loadFont(selectedFont);
      // Wait a moment for font to potentially load before previewing
      setTimeout(preview, 100); 
    }
  }, [
    text, fontSize, lineCount, selectedFont, showGuides, 
    dottedFont, guidelineStyle, guidelineThickness, 
    emptyPaper, paperSize, fontsLoaded
  ]);


  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Handwriting Worksheet Generator</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* --- Column 1: Content Settings --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg">Content</h2>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="emptyPaper"
                  checked={emptyPaper}
                  onChange={(e) => setEmptyPaper(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="emptyPaper" className="text-sm font-semibold text-gray-700">
                  Generate Empty Practice Paper
                </label>
              </div>

              {!emptyPaper && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Text to Practice
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text for the worksheet..."
                      className="w-full h-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Font Category
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {Object.keys(categoryLabels).map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setFontCategory(category);
                            setSearchQuery('');
                          }}
                          className={`px-2 py-1 rounded text-xs font-medium transition ${
                            fontCategory === category
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </button>
                      ))}
                    </div>

                    <div className="relative mb-2">
                      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search fonts..."
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                      />
                    </div>

                    <select
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                      size={4}
                    >
                      {filteredFonts.map(font => (
                        <option 
                          key={font} 
                          value={font} 
                          style={{ fontFamily: font, fontSize: '16px', padding: '4px' }}
                          onMouseEnter={() => loadFont(font)}
                        >
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="dotted"
                      checked={dottedFont}
                      onChange={(e) => setDottedFont(e.target.checked)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="dotted" className="text-sm font-semibold text-gray-700">
                      Dotted Font (for tracing)
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* --- Column 2: Page Settings --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                <Settings className="w-5 h-5" />
                <h2 className="text-lg">Page & Line Settings</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paper Size
                </label>
                <select
                  value={paperSize}
                  onChange={(e) => setPaperSize(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                >
                  {Object.entries(paperSizes).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Pages: {pageCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="24"
                  max="72"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Practice Lines: {lineCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={lineCount}
                  onChange={(e) => setLineCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Guideline Style
                </label>
                <select
                  value={guidelineStyle}
                  onChange={(e) => setGuidelineStyle(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                >
                  {Object.entries(guidelineStyles).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Guideline Thickness: {guidelineThickness}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={guidelineThickness}
                  onChange={(e) => setGuidelineThickness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="guides"
                  checked={showGuides}
                  onChange={(e) => setShowGuides(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="guides" className="text-sm font-semibold text-gray-700">
                  Show Guidelines
                </label>
              </div>

              <button
                onClick={generatePDF}
                disabled={!text && !emptyPaper}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download {pageCount} Page{pageCount > 1 ? 's' : ''} as PDF
              </button>
            </div>

            {/* --- Column 3: Preview --- */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-indigo-600">
                Preview
              </label>
              
              {!emptyPaper && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Selected Font:</p>
                  <p 
                    className="text-2xl truncate"
                    style={{ fontFamily: selectedFont }}
                  >
                    {text || selectedFont}
                  </p>
                </div>
              )}
              
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto"
                />
                {!text && !emptyPaper && (
                  <div className="flex items-center justify-center h-64 text-gray-400 text-sm p-4 text-center">
                    Enter text (or select empty paper mode) to see a preview
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Tips:</strong><br/>
                  • The first line is for tracing; {lineCount-1} blank {lineCount-1 > 1 ? 'lines' : 'line'} follow{lineCount-1 > 1 ? '' : 's'}.<br/>
                  • Use 'Dotted Font' for a classic tracing look.<br/>
                  • 'Empty Paper' mode creates blank guided sheets.<br/>
                  • All pages will be combined into a single PDF.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandwritingWorksheetGenerator;
