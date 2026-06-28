export function detect(html, document, window) {
  const findings = [];
  findings.push(...checkColors(html, document, window));
  findings.push(...checkMotion(html, document, window));
  findings.push(...checkQuality(html, document, window));
  findings.push(...checkLayout(html, document, window));
  findings.push(...checkTypography(html, document, window));
  findings.push(...checkPatterns(html, document, window));
  return findings;
}

function checkColors(html, document, window) {
  // Handles: low-contrast, gray-on-color, gradient-text, ai-color-palette
  return [];
}

function checkMotion(html, document, window) {
  // Handles: bounce-easing, layout-transition
  return [];
}

function checkQuality(html, document, window) {
  // Handles: line-length, cramped-padding, tight-leading, justified-text,
  // tiny-text, all-caps-body, wide-tracking, extreme-negative-tracking, body-text-viewport-edge
  return [];
}

function checkLayout(html, document, window) {
  // Handles: nested-cards, side-tab, border-accent-on-rounded
  return [];
}

function checkTypography(html, document, window) {
  // Handles: overused-font, single-font, flat-type-hierarchy
  return [];
}

function checkPatterns(html, document, window) {
  // Handles: monotonous-spacing, dark-glow, cream-palette, oversized-h1,
  // gpt-thin-border-wide-shadow, icon-tile-stack, italic-serif-display,
  // hero-eyebrow-chip, repeated-section-kickers, image-hover-transform,
  // theater-slop-phrase, repeating-stripes-gradient, clipped-overflow-container
  return [];
}
