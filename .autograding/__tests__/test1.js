const { parseHTML, parseCSS, readFile } = require('../setup.js');
const doc = parseHTML(readFile('../index.html'));
const css = parseCSS(readFile('../styles/main.css'));
const readMe = readFile('../README.md');
const badgeRegex = /\[\!\[Netlify Status]\(https:\/\/api\.netlify\.com\/api\/v1\/badges\/[-a-f0-9]+\/deploy-status\)]\([^)]+\)/g;

// HTML tests
describe('index.html', () => {
  test('file found', () => {
    expect(doc).toBeTruthy();
  });

  test('contains <!DOCTYPE html> declaration', () => {
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

  test('contains exactly one <link /> element pointing to the "styles/main.css" stylesheet', () => {
    expect(doc.querySelectorAll('head link[rel=stylesheet]').length).toBeGreaterThan(0);
    expect(
      doc.querySelectorAll('head link[rel=stylesheet]')
      .filter(link => link.getAttribute('href').indexOf('styles/main.css') >= 0).length
    ).toBe(1);
  });

  test('contains exactly one <link /> element pointing to a favicon', () => {
    expect(doc.querySelectorAll('head link[rel=icon]').length).toBe(1);
  });

  test('contains exactly one <h1 /> element', () => {
    expect(doc.querySelectorAll('body h1').length).toBe(1);
  });

  test('contains exactly one <section /> element with the class name "about-me"', () => {
    expect(doc.querySelectorAll('body section.about-me').length).toBe(1);
  });

  test('contains exactly one <img /> element with the class name "profile-img"', () => {
    expect(doc.querySelectorAll('body section.about-me').length).toBe(1);
  });

  test('contains exactly one <ul /> element with the class name "projects" and multiple projects listed', () => {
    expect(doc.querySelectorAll('body ul.projects').length).toBe(1);
    expect(doc.querySelectorAll('body ul.projects li').length).toBeGreaterThan(1);
  });

  test('contains at least one <ul /> element with the class name "social-media" and multiple social accounts listed, inside a <footer /> element', () => {
    expect(doc.querySelectorAll('body footer ul.social-media').length).toBeGreaterThan(0);
    expect(doc.querySelectorAll('body footer ul.social-media li').length).toBeGreaterThan(1);
  });
});

// CSS tests
describe('styles/main.css', () => {
  test('file found', () => {
      expect(css).toBeTruthy();
  });

  test('imports at least one font', () => {
      expect(
        css.stylesheet.rules.filter(
          rule => rule.type == 'font-face' &&
          typeof rule.declarations.find(declaration => declaration.property === 'font-family') !== 'undefined' &&
          typeof rule.declarations.find(declaration => declaration.property === 'src' && declaration.value.indexOf('url') >= 0) !== 'undefined'
        ).length
      ).toBeGreaterThan(0);
  });
});

describe('README.md', () => {
  test('status badge found', () => {
    expect(readMe.match(badgeRegex).length).toBeGreaterThan(0);
  });
});
