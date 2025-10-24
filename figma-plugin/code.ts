// TeamProject Starter Kit Generator
// Creates pages, text styles, color styles, and basic components

figma.showUI(__html__, { width: 340, height: 420 });

function ensurePage(name: string): PageNode {
  const existing = figma.root.children.find(n => n.type === 'PAGE' && n.name === name) as PageNode | undefined;
  if (existing) return existing;
  const page = figma.createPage();
  page.name = name;
  return page;
}

function createColorStyle(name: string, r: number, g: number, b: number) {
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [{ type: 'SOLID', color: { r, g, b } }];
  return style;
}

function createTextStyle(name: string, fontName: FontName, fontSize: number, lineHeight: number) {
  const style = figma.createTextStyle();
  style.name = name;
  style.fontName = fontName;
  style.fontSize = fontSize;
  style.lineHeight = { unit: 'PIXELS', value: lineHeight };
  return style;
}

async function createButtonComponent(): Promise<ComponentNode> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

  const component = figma.createComponent();
  component.name = 'Button / Primary';

  const frame = figma.createFrame();
  frame.name = 'Container';
  frame.resize(120, 40);
  frame.fills = [{ type: 'SOLID', color: { r: 0.086, g: 0.361, b: 0.996 } }];
  frame.cornerRadius = 8;
  frame.layoutMode = 'HORIZONTAL';
  frame.counterAxisSizingMode = 'AUTO';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.itemSpacing = 8;
  frame.paddingLeft = 16;
  frame.paddingRight = 16;
  frame.paddingTop = 10;
  frame.paddingBottom = 10;

  const label = figma.createText();
  label.name = 'Label';
  label.characters = 'Button';
  label.fontName = { family: 'Inter', style: 'Medium' };
  label.fontSize = 14;
  label.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  component.appendChild(frame);
  frame.appendChild(label);

  // Center text vertically in auto-layout
  label.textAutoResize = 'WIDTH_AND_HEIGHT';

  // Resize component to fit
  component.resizeWithoutConstraints(frame.width, frame.height);

  return component;
}

async function createInputComponent(): Promise<ComponentNode> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const component = figma.createComponent();
  component.name = 'Input / Text';

  const frame = figma.createFrame();
  frame.resize(280, 44);
  frame.strokes = [{ type: 'SOLID', color: { r: 0.84, g: 0.84, b: 0.86 } }];
  frame.strokeWeight = 1;
  frame.cornerRadius = 8;
  frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  frame.layoutMode = 'HORIZONTAL';
  frame.counterAxisAlignItems = 'CENTER';
  frame.paddingLeft = 12;
  frame.paddingRight = 12;

  const text = figma.createText();
  text.characters = 'Placeholder';
  text.fontName = { family: 'Inter', style: 'Regular' };
  text.fontSize = 14;
  text.fills = [{ type: 'SOLID', color: { r: 0.47, g: 0.49, b: 0.54 } }];

  component.appendChild(frame);
  frame.appendChild(text);

  component.resizeWithoutConstraints(frame.width, frame.height);

  return component;
}

async function generate() {
  // Pages
  const cover = ensurePage('00 Cover');
  const foundations = ensurePage('01 Foundations');
  const components = ensurePage('02 Components');
  const examples = ensurePage('03 Examples');

  // Color styles
  const primary = createColorStyle('Color/Primary', 0.086, 0.361, 0.996);
  const secondary = createColorStyle('Color/Secondary', 0.106, 0.678, 0.596);
  const gray700 = createColorStyle('Color/Gray/700', 0.2, 0.2, 0.22);

  // Text styles
  const textSm = createTextStyle('Text/Body/Sm', { family: 'Inter', style: 'Regular' }, 12, 18);
  const textMd = createTextStyle('Text/Body/Md', { family: 'Inter', style: 'Regular' }, 14, 20);
  const textLg = createTextStyle('Text/Heading/H3', { family: 'Inter', style: 'Medium' }, 20, 28);

  // Components page content
  figma.currentPage = components;

  const button = await createButtonComponent();
  const input = await createInputComponent();

  // Place components neatly
  button.x = 100;
  button.y = 100;
  input.x = 100;
  input.y = 180;

  // Examples page
  figma.currentPage = examples;
  const frame = figma.createFrame();
  frame.name = 'Example / Form';
  frame.resize(400, 240);
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 12;
  frame.paddingLeft = 24;
  frame.paddingRight = 24;
  frame.paddingTop = 24;
  frame.paddingBottom = 24;
  frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.99 } }];

  const inputInstance = input.createInstance();
  const buttonInstance = button.createInstance();
  frame.appendChild(inputInstance);
  frame.appendChild(buttonInstance);

  figma.viewport.scrollAndZoomIntoView([frame]);

  figma.notify('Starter kit generated ✅');
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    await generate();
    figma.ui.postMessage({ type: 'done' });
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
