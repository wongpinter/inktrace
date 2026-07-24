# Print Quality Feature

## Overview
High-resolution PDF export with configurable DPI settings for professional printing.

## Print Quality Options

### Standard (300 DPI)
- **Scale Factor**: 3.125x
- **Use Case**: Good quality for most home and office printing
- **File Size**: Moderate
- **Recommended For**: General use, draft prints

### High Quality (600 DPI) ⭐ Recommended
- **Scale Factor**: 6.25x
- **Use Case**: Professional print quality
- **File Size**: Larger
- **Recommended For**: Final prints, classroom materials, professional use

### Ultra High (1200 DPI)
- **Scale Factor**: 12.5x
- **Use Case**: Maximum quality for specialized printing
- **File Size**: Very large
- **Recommended For**: Professional publishing, high-end printing

## Technical Implementation

### Canvas Rendering
```typescript
const PRINT_SCALE = qualitySettings.scale;
canvas.width = size.width * PRINT_SCALE;
canvas.height = size.height * PRINT_SCALE;
ctx.scale(PRINT_SCALE, PRINT_SCALE);
```

### Quality Enhancements
1. **Image Smoothing**: High-quality anti-aliasing
2. **Text Rendering**: Geometric precision
3. **Font Smoothing**: Always enabled
4. **PNG Export**: Maximum quality (1.0)
5. **PDF Compression**: None (NONE) for best quality

### Resolution Comparison
- **Screen Preview**: 96 DPI
- **Standard Print**: 300 DPI (3.125x larger)
- **High Quality**: 600 DPI (6.25x larger)
- **Ultra High**: 1200 DPI (12.5x larger)

## Usage

1. Navigate to "Document Setup" settings
2. Select "Print Quality (PDF Export)"
3. Choose desired quality level
4. Generate PDF

## File Size Impact

Example for A4 page:
- **Standard (300 DPI)**: ~500 KB per page
- **High (600 DPI)**: ~1.5 MB per page
- **Ultra (1200 DPI)**: ~5 MB per page

## Best Practices

### For Home Printing
- Use **Standard (300 DPI)**
- Sufficient for most inkjet/laser printers
- Faster generation and smaller files

### For Classroom Materials
- Use **High Quality (600 DPI)** ⭐
- Professional appearance
- Clear text and guidelines
- Good balance of quality and file size

### For Professional Publishing
- Use **Ultra High (1200 DPI)**
- Maximum detail preservation
- Suitable for commercial printing
- Large file sizes

## Technical Notes

- All quality settings use PNG format for lossless quality
- No JPEG compression artifacts
- Guidelines remain crisp at all resolutions
- Text rendering optimized for print
- Font smoothing ensures clean edges

## Performance Considerations

- Higher DPI = Longer generation time
- Ultra High may take several seconds per page
- Browser memory usage increases with DPI
- Consider using Standard for quick previews

## Compatibility

- Works with all paper sizes
- Compatible with all guideline styles
- Supports all fonts and text settings
- Multi-page mode supported
