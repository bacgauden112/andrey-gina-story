const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = 'C:\\Users\\anhdq\\.gemini\\antigravity-ide\\brain\\6926a5f8-7a0a-4b25-b7af-b8a2a2ef3397\\scratch\\temp.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const $ = cheerio.load(htmlContent, { xmlMode: false, decodeEntities: false });

const componentsDir = path.join(__dirname, 'app', 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

function cssToReactStyle(cssStr) {
  if (!cssStr) return '{}';
  const rules = cssStr.split(';').map(s => s.trim()).filter(Boolean);
  const obj = {};
  for (const rule of rules) {
    const colonIdx = rule.indexOf(':');
    if (colonIdx === -1) continue;
    const key = rule.slice(0, colonIdx).trim();
    const val = rule.slice(colonIdx + 1).trim();
    
    let reactKey = key;
    if (!key.startsWith('--')) {
      reactKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
      if (reactKey.startsWith('ms')) reactKey = 'ms' + reactKey.charAt(2).toUpperCase() + reactKey.slice(3);
    }
    
    obj[reactKey] = val;
  }
  return JSON.stringify(obj);
}

function htmlToJSX(html) {
  let jsx = html;
  
  jsx = jsx.replace(/\sclass="/g, ' className="');
  jsx = jsx.replace(/\sfor="/g, ' htmlFor="');
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
  
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    const unescaped = p1.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    return `style={${cssToReactStyle(unescaped)}}`;
  });
  
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  jsx = jsx.replace(/\sstroke-width=/g, ' strokeWidth=');
  jsx = jsx.replace(/\sstroke-linecap=/g, ' strokeLinecap=');
  jsx = jsx.replace(/\sstroke-linejoin=/g, ' strokeLinejoin=');
  jsx = jsx.replace(/\sfill-rule=/g, ' fillRule=');
  jsx = jsx.replace(/\sclip-rule=/g, ' clipRule=');
  jsx = jsx.replace(/\sviewbox=/gi, ' viewBox=');
  jsx = jsx.replace(/\sautocomplete=/gi, ' autoComplete=');

  return jsx;
}

const canvas = $('.miu-canvas');
if (!canvas.length) {
  console.log('No .miu-canvas found');
  process.exit(1);
}

const children = canvas.children().toArray().filter(el => el.type === 'tag');
const totalElements = children.length;
console.log('Total absolute elements:', totalElements);

const NUM_SECTIONS = 10;
const chunkSize = Math.ceil(totalElements / NUM_SECTIONS);

let pageImports = [];
let pageComponents = [];

for (let i = 0; i < NUM_SECTIONS; i++) {
  const chunk = children.slice(i * chunkSize, (i + 1) * chunkSize);
  if (chunk.length === 0) break;
  
  const componentName = `Section${i + 1}`;
  const componentPath = path.join(componentsDir, `${componentName}.tsx`);
  
  let chunkHtml = '';
  chunk.forEach(el => {
    chunkHtml += $.html(el) + '\n';
  });
  
  const jsxStr = htmlToJSX(chunkHtml);
  
  const fileContent = `import React from 'react';

export default function ${componentName}() {
  return (
    <>
${jsxStr}
    </>
  );
}
`;
  fs.writeFileSync(componentPath, fileContent, 'utf-8');
  console.log(`Created ${componentName}.tsx with ${chunk.length} elements`);
  
  pageImports.push(`import ${componentName} from './${componentName}';`);
  pageComponents.push(`          <${componentName} />`);
}

// Read current page.tsx to extract useEffect content
const pageTsxPath = path.join(__dirname, 'app', 'page.tsx');
let originalPageTsx = '';
if (fs.existsSync(pageTsxPath)) {
  originalPageTsx = fs.readFileSync(pageTsxPath, 'utf-8');
}

// Simple fallback if regex fails
let useEffectBody = '// TODO: Insert logic here';
// Finding everything inside useEffect(() => { ... })
const useEffStart = originalPageTsx.indexOf('useEffect(() => {');
if (useEffStart !== -1) {
    const endMatch = originalPageTsx.indexOf('})();', useEffStart);
    if (endMatch !== -1) {
        useEffectBody = originalPageTsx.substring(useEffStart + 17, endMatch + 5);
    }
}

const newPageTsx = `// @ts-nocheck
'use client';
import { useEffect } from 'react';
${pageImports.join('\n')}

export default function HomeComponent() {
  useEffect(() => {
${useEffectBody}
  }); // Run logic

  return (
    <div className="miu-wrap">
      <div className="miu-stage" style={{ "--sh": "10881px" }}>
        <div className="miu-canvas-wrap">
          <div className="miu-canvas" data-invitation-id="6a0e698fd81ce3f11abeeaaf" style={{ height: "10881px" }}>
${pageComponents.join('\n')}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'app', 'components', 'HomeComponent.tsx'), newPageTsx, 'utf-8');
fs.writeFileSync(pageTsxPath, `// @ts-nocheck\nexport { default } from './components/HomeComponent';`, 'utf-8');
console.log('Updated app/page.tsx and created HomeComponent.tsx');
