// TeamProject Starter Kit Generator (JS)
// Creates pages, styles, and basic components

figma.showUI(__html__, { width: 340, height: 420 });

function ensurePage(name) {
  const existing = figma.root.children.find((n) => n.type === 'PAGE' && n.name === name);
  if (existing)
    return existing;
  const page = figma.createPage();
  page.name = name;
  return page;
}

function createColorStyle(name, r, g, b) {
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [{ type: 'SOLID', color: { r, g, b } }];
  return style;
}

function createTextStyle(name, fontName, fontSize, lineHeight) {
  const style = figma.createTextStyle();
  style.name = name;
  style.fontName = fontName;
  style.fontSize = fontSize;
  style.lineHeight = { unit: 'PIXELS', value: lineHeight };
  return style;
}

async function createButtonComponent() {
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

  label.textAutoResize = 'WIDTH_AND_HEIGHT';
  component.resizeWithoutConstraints(frame.width, frame.height);

  return component;
}

async function createInputComponent() {
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
  const cover = ensurePage('00 Cover');
  const foundations = ensurePage('01 Foundations');
  const components = ensurePage('02 Components');
  const examples = ensurePage('03 Examples');

  const primary = createColorStyle('Color/Primary', 0.086, 0.361, 0.996);
  const secondary = createColorStyle('Color/Secondary', 0.106, 0.678, 0.596);
  const gray700 = createColorStyle('Color/Gray/700', 0.2, 0.2, 0.22);

  const textSm = createTextStyle('Text/Body/Sm', { family: 'Inter', style: 'Regular' }, 12, 18);
  const textMd = createTextStyle('Text/Body/Md', { family: 'Inter', style: 'Regular' }, 14, 20);
  const textLg = createTextStyle('Text/Heading/H3', { family: 'Inter', style: 'Medium' }, 20, 28);

  figma.currentPage = components;

  const button = await createButtonComponent();
  const input = await createInputComponent();

  button.x = 100;
  button.y = 100;
  input.x = 100;
  input.y = 180;

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
