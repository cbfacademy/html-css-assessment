const { parseHTML, parseCSS, readFile } = require('./setup.js');
const doc = parseHTML(readFile('../src/index.html'));
const css = parseCSS(readFile('../src/styles/main.css'));

// HTML tests
describe('web page', () => {
  test('index.html exists', () => {
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

  test('contains at least one <link /> element pointing to a stylesheet in the "styles" directory', () => {
    expect(doc.querySelectorAll('head link[rel=stylesheet]').length).toBeGreaterThan(0);
    expect(
      doc.querySelectorAll('head link[rel=stylesheet]')
      .filter(link => link.getAttribute('href').indexOf('styles/') >= 0).length
    ).toBeGreaterThan(0);
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

  test('contains exactly at least one <ul /> element with the class name "social-media" and multiple social accounts listed, inside a <footer /> element', () => {
    expect(doc.querySelectorAll('body footer ul.social-media').length).toBeGreaterThan(0);
    expect(doc.querySelectorAll('body footer ul.social-media li').length).toBeGreaterThan(1);
  });
});

// CSS tests
describe('stylesheet', () => {
  test('styles/main.css exists', () => {
      expect(css).toBeTruthy();
  });

  test('imports at least one font', () => {
      expect(
        css.stylesheet.rules.filter(rule => rule.type == 'font-face').length
      ).toBeGreaterThan(0);
  });
});
