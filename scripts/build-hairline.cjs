const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const skill = path.join(require('node:os').homedir(), '.agents/skills/hairline-create');
const kernel = fs.readFileSync(path.join(skill, 'kernel.js'), 'utf8');
const names = ['microphone', 'documents', 'server-kit'];
const figures = names.map(name => `(function(hairline){\n${fs.readFileSync(path.join(__dirname, 'hairline', name + '.js'), 'utf8')}\n})(figure => figures[figure.name] = figure);`).join('\n');
fs.writeFileSync(path.join(root, 'public/hairline/runtime.js'), `(function(){\n${kernel}\nconst figures = {};\n${figures}\nwindow.portfolioHairline = { engine: HL, figures };\n})();\n`);
