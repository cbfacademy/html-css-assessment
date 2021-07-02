const { parseHTML, parseJS, readFile } = require('./setup.js');
const doc = parseHTML(readFile('../src/index.html'));
const script = parseJS(readFile('../src/index.js'));

// HTML tests
test('index.html exists', () => {
  expect(doc).toBeTruthy();
});

test('starts with <!DOCTYPE html /> declaration', () => {
  let match = doc.childNodes[0].rawText.match(/^<!DOCTYPE html>/);

  expect(match).toBeTruthy();
});

test('<html /> element contains "lang" attribute', () => {
  expect(doc.querySelectorAll('html').length).toBe(1);
  expect(doc.querySelector('html').getAttribute('lang')).toBeTruthy();
});

test('contains exactly one <title /> element', () => {
  expect(doc.querySelectorAll('head title').length).toBe(1);
});

test('contains exactly one <meta charset="" /> element', () => {
  expect(doc.querySelectorAll('head meta[charset]').length).toBe(1);
});

test('contains at least one <link rel="stylesheet" /> element', () => {
  expect(doc.querySelectorAll('head link[rel=stylesheet]').length).toBeGreaterThan(0);
});

test('contains exactly one <h1 /> element', () => {
  expect(doc.querySelectorAll('body h1').length).toBe(1);
});

// JS tests
test('src/index.js exists', () => {
    expect(script).toBeTruthy();
});

test('contains "getGrade" function', () => {
    expect(typeof script.body.find(node => node.type === 'FunctionDeclaration' && node.id.name === 'getGrade')).toBe('object');
});

test('"getGrade" function contains "switch" statement', () => {
    let fn = script.body.find(node => node.type === 'FunctionDeclaration' && node.id.name === 'getGrade');
    let switchStatement = fn.body.body.find(node => node.type === 'SwitchStatement' && Array.isArray(node.cases));

    expect(typeof switchStatement).toBe('object');
});

test('"getGrade" "switch" statement contains at least 7 case statements', () => {
    let fn = script.body.find(node => node.type === 'FunctionDeclaration' && node.id.name === 'getGrade');
    let switchStatement = fn.body.body.find(node => node.type === 'SwitchStatement' && Array.isArray(node.cases));

    expect(Array.isArray(switchStatement.cases) && switchStatement.cases.length >= 7).toBeTruthy();
});
