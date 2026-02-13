# Araseo Renderer

Interactive visualization renderer for Araseo project - converts JSON into flowcharts and UI mockups.

## Features

### 🎨 Dual Rendering Modes

- **Flowchart Renderer**: Interactive flowcharts using React Flow
  - Custom node shapes (oval, rectangle, diamond)
  - Smooth animations and transitions
  - Zoom, pan, and minimap controls

- **UI Mockup Renderer**: Wireframe-style UI mockups using Rough.js
  - Sketch-style hand-drawn aesthetic
  - Common UI components (buttons, inputs, forms)
  - Responsive canvas sizing

### ⚡ Auto-Reload

When JSON files in `public/examples/` are modified, the browser automatically reloads to show updated visualizations - no manual refresh needed.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
Araseo-renderer/
├── src/
│   ├── components/
│   │   ├── FlowchartRenderer.jsx    # React Flow integration
│   │   ├── UIMockupRenderer.jsx     # Rough.js integration
│   │   ├── nodes/                   # Custom flowchart nodes
│   │   │   ├── OvalNode.jsx
│   │   │   ├── RectangleNode.jsx
│   │   │   └── DiamondNode.jsx
│   │   └── mockup/
│   │       └── WireframeCanvas.jsx  # Canvas-based mockup renderer
│   ├── adapters/
│   │   └── jgfToReactFlow.js        # JGF to React Flow converter
│   ├── store/
│   │   └── atoms.js                 # Jotai state management
│   └── App.jsx                      # Main app with renderer routing
├── public/
│   └── examples/                    # JSON test files
│       ├── demo-login-flow.json
│       └── ui-login-page.json
└── plugins/
    └── json-hmr.js                  # Vite plugin for JSON auto-reload
```

## Usage

### Flowchart JSON Format

Based on [JSON Graph Format (JGF)](https://jsongraphformat.info/):

```json
{
  "graph": {
    "type": "flowchart",
    "label": "로그인 플로우",
    "nodes": {
      "start": {
        "label": "시작",
        "metadata": {
          "shape": "oval",
          "color": "#4CAF50"
        }
      },
      "process": {
        "label": "처리",
        "metadata": {
          "shape": "rectangle",
          "color": "#2196F3"
        }
      }
    },
    "edges": [
      {
        "source": "start",
        "target": "process",
        "metadata": { "style": "solid" }
      }
    ]
  }
}
```

### UI Mockup JSON Format

Based on WireMD patterns:

```json
{
  "mockup": {
    "title": "로그인 페이지",
    "metadata": {
      "device": "desktop"
    },
    "layout": {
      "sections": [
        {
          "type": "header",
          "components": [
            { "type": "navbar" }
          ]
        },
        {
          "type": "main",
          "components": [
            { "type": "heading", "text": "로그인" },
            { "type": "input", "placeholder": "이메일" },
            { "type": "button", "label": "로그인" }
          ]
        }
      ]
    }
  }
}
```

## Auto-Reload Functionality

The renderer includes a custom Vite plugin that watches `public/examples/*.json` files:

1. Edit any JSON file in `public/examples/`
2. Save the file
3. Browser automatically reloads
4. Updated visualization appears instantly

No manual refresh needed!

## Technology Stack

- **React 18** - UI framework
- **Vite 7** - Build tool with instant HMR
- **React Flow (@xyflow/react)** - Flowchart rendering
- **Rough.js** - Hand-drawn wireframe style
- **Jotai** - Lightweight state management
- **Chokidar** - File system watching

## Deployment

### Netlify (Recommended)

```bash
# Build
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Vercel

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod
```

## Development

### Adding New Node Types

1. Create node component in `src/components/nodes/`
2. Export from `src/components/nodes/index.js`
3. Register in `FlowchartRenderer.jsx` nodeTypes
4. Update `jgfToReactFlow.js` shape mapping

### Adding New UI Components

1. Add rendering logic in `WireframeCanvas.jsx` renderComponents()
2. Define component schema in UI mockup JSON

## Testing

```bash
# Run dev server and test manually
npm run dev

# Edit JSON files in public/examples/
# Verify auto-reload works
# Test both flowchart and UI mockup modes
```

## License

MIT

## Credits

Part of the [Araseo](https://github.com/94wogus/Araseo) project - automatic conversion of markdown planning docs to interactive visuals.

Built with ❤️ using Claude Code.
