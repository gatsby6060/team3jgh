# TeamProject Starter Kit Generator (Figma Plugin)

This local plugin creates a starter design file with:
- Pages: 00 Cover, 01 Foundations, 02 Components, 03 Examples
- Color Styles and Text Styles
- Components: Primary Button, Text Input
- Example form composed of the components

## How to run

1. Open Figma desktop app.
2. Create or open any file.
3. Go to `Plugins` > `Development` > `Import plugin from manifest...`.
4. Choose the `manifest.json` file inside this folder.
5. Run it via `Plugins` > `Development` > `TeamProject Starter Kit Generator`.
6. Click "Generate starter kit" in the plugin panel.

## Notes
- Plugin loads the Inter font automatically. If the font fails to load, verify network connectivity.
- The plugin targets both Figma and FigJam environments, but components are optimized for Figma.
