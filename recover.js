const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const backupHtmlPath = path.join(__dirname, '.backup', 'index.html');
const tempHtmlPath = 'C:\\Users\\anhdq\\.gemini\\antigravity-ide\\brain\\6926a5f8-7a0a-4b25-b7af-b8a2a2ef3397\\scratch\\temp.html';
const homeComponentPath = path.join(__dirname, 'app', 'components', 'HomeComponent.tsx');

// 1. Get the scripts from backup index.html
const htmlContent = fs.readFileSync(backupHtmlPath, 'utf-8');
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let scriptContent = '';
let match;
while ((match = scriptRegex.exec(htmlContent)) !== null) {
  scriptContent += match[1] + '\n';
}

// 2. Get the missing HTML from temp.html
const tempContent = fs.readFileSync(tempHtmlPath, 'utf-8');
const $ = cheerio.load(tempContent, { xmlMode: false, decodeEntities: false });

const elementsToExtract = [
  $('template[id^="miu-modal-tpl-"]').parent(), 
  $('#bgAudio'),
  $('#miuFabDock'),
  $('#miuOpening')
];

let rawOverlayHtml = '';
elementsToExtract.forEach(el => {
  if (el && el.length) {
    rawOverlayHtml += $.html(el) + '\n';
  }
});

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
  jsx = jsx.replace(/<(img|input|br|hr|circle)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
  
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    const unescaped = p1.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
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

const overlayJsx = htmlToJSX(rawOverlayHtml);

const overlayTsxPath = path.join(__dirname, 'app', 'components', 'OverlayComponent.tsx');
fs.writeFileSync(overlayTsxPath, `// @ts-nocheck
import React from 'react';
export default function OverlayComponent() {
  return (
    <>
${overlayJsx}
    </>
  );
}
`, 'utf-8');

let homeComponent = fs.readFileSync(homeComponentPath, 'utf-8');
if (!homeComponent.includes('OverlayComponent')) {
    homeComponent = homeComponent.replace(
      "import Section10 from './Section10';", 
      "import Section10 from './Section10';\nimport OverlayComponent from './OverlayComponent';"
    );
}

const useEffStart = homeComponent.indexOf('useEffect(() => {');
const useEffEnd = homeComponent.indexOf('  }); // Run logic');
if (useEffStart !== -1 && useEffEnd !== -1) {
  const before = homeComponent.substring(0, useEffStart + 17);
  const after = homeComponent.substring(useEffEnd);
  // We should remove existing scripts just in case, wait, before just cuts at the start.
  // Replacing it entirely
  homeComponent = before + '\n' + scriptContent + '\n' + after;
}

if (!homeComponent.includes('<OverlayComponent />')) {
    homeComponent = homeComponent.replace(
      'return (\n    <div className="miu-wrap">', 
      'return (\n    <>\n    <div className="miu-wrap">'
    );
    homeComponent = homeComponent.replace(
      '</div>\n    </div>\n  );\n}', 
      '</div>\n    </div>\n      <OverlayComponent />\n    </>\n  );\n}'
    );
}

fs.writeFileSync(homeComponentPath, homeComponent, 'utf-8');
console.log('Recovery complete!');
