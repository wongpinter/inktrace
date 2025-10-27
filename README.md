# InkTrace - Handwriting Worksheet Generator

A modern, free web application for creating custom handwriting practice worksheets with beautiful fonts, customizable guidelines, and professional PDF export.

## 🌟 Features

### Core Functionality
- **Multi-Page Builder**: Create worksheets with different content on each page
- **Customizable Fonts**: 120+ Google Fonts including educational handwriting fonts and Arabic fonts
- **Multiple Worksheet Types**: Text practice, specific letters, full alphabet, or numbers
- **Content Generation**: Smart tools to generate educational content automatically
- **Arabic Language Support**: Complete Arabic alphabet, words, and 22 Arabic fonts
- **PDF Export**: High-quality 300 DPI print-ready PDFs

### Content Generation Tools
- **Sight Words Lists**: Dolch (Pre-Primer through 3rd Grade) and Fry (First 300 words)
- **Word Patterns**: CVC, CVCe, CCVC, CVCC, Digraphs, and Vowel Teams
- **Sentence Templates**: Pre-built templates with random word generation
- **Name Practice**: Dedicated mode for practicing student names
- **Custom Word Lists**: Import/export your own word lists
- **Random Generator**: Create random word sets by difficulty level

### Arabic Language Support
- **Arabic Alphabet**: All 28 letters with optional names (ا ألف, ب باء, etc.)
- **Arabic Words**: 180+ words across 6 categories (Basic, Colors, Numbers, Family, Body, Food)
- **Arabic Sentences**: 8 sentence templates with random word generation
- **Arabic Fonts**: 22 beautiful Arabic fonts from Google Fonts including:
  - Noto Sans Arabic, Noto Kufi Arabic, Noto Naskh Arabic
  - Cairo, Amiri, Tajawal, Almarai, Harmattan
  - Lateef, Scheherazade New, Markazi Text, Lalezar
  - Reem Kufi, Mada, El Messiri, Changa, Aref Ruqaa
  - And more traditional and modern Arabic typefaces

### Customization Options
- **Flexible Guidelines**: Multiple line styles (elementary, standard, dotted, double)
- **Guideline Colors**: Default, rainbow, pastel, or monochrome themes
- **Line Spacing**: Adjustable spacing and thickness
- **Text Trace Styles**: Dotted, dashed, outline, or solid
- **Starting Dots**: Optional dots to guide writing direction
- **Opacity Controls**: Adjust text and guideline visibility

### Page Management
- **Add, Duplicate, Reorder**: Full control over page organization
- **Delete Pages**: Remove unwanted pages easily
- **Footer Options**: Customizable branding and pagination
- **Paper Sizes**: A4, Letter, Legal, and A5 support

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful interface with smooth animations
- **Real-time Preview**: See changes instantly as you customize

## 🚀 Live Demo

Visit the live application: **https:inktrace.wongpinter.com**

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Local Setup

```bash
# Clone the repository
git clone https://github.com/wongpinter/inktrace.git

# Navigate to the project directory
cd inktrace

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port)

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Run linter
npm run lint
```

### Deployment

**Automatic Deployment**: Push to the main branch triggers automatic deployment via GitHub Actions.

**Manual Deployment**: Run `npm run deploy` to build and deploy to GitHub Pages.

## 🏗️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **PDF Generation**: jsPDF
- **Fonts**: Google Fonts API
- **State Management**: React Hooks + Context
- **Routing**: React Router
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## � Project Structure

```
inktrace/
├── src/
│   ├── components/     # React components
│   ├── types/          # TypeScript type definitions
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── pages/          # Page components
├── public/             # Static assets
│   ├── favicon.svg     # SVG favicon
│   └── favicon.ico     # ICO fallback
└── scripts/            # Build and utility scripts
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Fonts not loading
- Check your internet connection (fonts load from Google Fonts CDN)
- Try clearing browser cache
- Ensure no ad blockers are interfering with font requests

### PDF export issues
- For large worksheets, allow extra time for generation
- Ensure pop-ups are not blocked in your browser
- Try reducing the number of pages if export fails

### Development server not starting
- Verify Node.js version: `node --version` (should be 18+)
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check if port 5173 is already in use

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📧 Contact

Created by [@wongpinter](https://github.com/wongpinter)

For bugs and feature requests, please [open an issue](https://github.com/wongpinter/inktrace/issues).

## 🙏 Acknowledgments

- [Google Fonts](https://fonts.google.com/) for the extensive font library
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component system
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation capabilities
- The open-source community for inspiration and support

---

Made with ❤️ for educators, parents, and students
