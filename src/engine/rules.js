(function () {
  const rules = [
    // Color Category
    {
      id: 'low-contrast',
      name: 'Low Contrast',
      description: 'Text contrast does not meet WCAG accessibility minimums against its background.',
      severity: 'error',
      category: 'color',
      message: 'Increase text contrast ratio to at least 4.5:1 (or 3.0:1 for large text).'
    },
    {
      id: 'gray-on-color',
      name: 'Gray on Color',
      description: 'Gray text on colored backgrounds creates muddy contrast and is hard to read.',
      severity: 'warning',
      category: 'color',
      message: 'Use white, very light, or very dark text against colored backgrounds instead of gray.'
    },
    {
      id: 'gradient-text',
      name: 'Gradient Text',
      description: 'Text using a background clip gradient can be visually overwhelming and hard to read.',
      severity: 'warning',
      category: 'color',
      message: 'Remove the gradient clip from text and use a solid, high-contrast color.'
    },
    {
      id: 'ai-color-palette',
      name: 'AI Color Palette',
      description: 'Uses generic AI-generated color palettes (e.g., highly saturated purples and violets).',
      severity: 'warning',
      category: 'color',
      message: 'Refine the color palette to align with brand guidelines instead of default generic presets.'
    },
    {
      id: 'dark-glow',
      name: 'Dark Glow',
      description: 'Bright colored box-shadow glows on dark backgrounds can look dated or noisy.',
      severity: 'warning',
      category: 'color',
      message: 'Remove or heavily soften colored glows on dark backgrounds. Rely on borders or subtle elevations.'
    },
    {
      id: 'repeating-stripes-gradient',
      name: 'Repeating Stripes Gradient',
      description: 'Repeating CSS gradient stripes are a common AI design tell that looks unrefined.',
      severity: 'warning',
      category: 'color',
      message: 'Replace repeating gradient stripes with a solid color, subtle texture, or cleaner background pattern.'
    },
    {
      id: 'cream-palette',
      name: 'Cream Palette',
      description: 'Overuse of cream/beige palettes resulting in a low-contrast or muddy aesthetic.',
      severity: 'warning',
      category: 'color',
      message: 'Introduce crisp white or darker contrasting sections to break up uniform cream backgrounds.'
    },

    // Motion Category
    {
      id: 'bounce-easing',
      name: 'Bounce Easing',
      description: 'Uses generic, exaggerated bounce or elastic animation easings.',
      severity: 'warning',
      category: 'motion',
      message: 'Replace bounce easings with refined spring mechanics or smooth ease-out curves.'
    },
    {
      id: 'layout-transition',
      name: 'Layout Transition',
      description: 'Animating layout properties (width, height, padding, margin) causes performance and reflow issues.',
      severity: 'error',
      category: 'motion',
      message: 'Transition transform (scale, translate) or opacity instead of layout properties.'
    },
    {
      id: 'image-hover-transform',
      name: 'Image Hover Transform',
      description: 'Applying dramatic scale or rotate transforms to images on hover is a generic pattern.',
      severity: 'warning',
      category: 'motion',
      message: 'Use subtle transitions or rely on opacity/overlay changes rather than raw image scaling.'
    },

    // Quality Category
    {
      id: 'line-length',
      name: 'Line Length',
      description: 'Line length is either too short or too long for comfortable reading.',
      severity: 'warning',
      category: 'quality',
      message: 'Constrain body text width to approximately 60-80 characters per line (e.g., max-w-prose).'
    },
    {
      id: 'cramped-padding',
      name: 'Cramped Padding',
      description: 'Containers lack sufficient internal padding, making content feel crowded.',
      severity: 'warning',
      category: 'quality',
      message: 'Increase padding inside containers, cards, and buttons to give content breathing room.'
    },
    {
      id: 'tight-leading',
      name: 'Tight Leading',
      description: 'Line height (leading) is too tight, squishing text vertically.',
      severity: 'warning',
      category: 'quality',
      message: 'Increase line-height (e.g., 1.5 or 150%) for body text to improve readability.'
    },
    {
      id: 'justified-text',
      name: 'Justified Text',
      description: 'Text is fully justified, causing uneven gaps (rivers) between words.',
      severity: 'warning',
      category: 'quality',
      message: 'Align text to the left (or right for RTL languages) instead of using text-align: justify.'
    },
    {
      id: 'tiny-text',
      name: 'Tiny Text',
      description: 'Font size is too small, failing accessibility and legibility standards.',
      severity: 'error',
      category: 'quality',
      message: 'Ensure all text is at least 12px, preferably 16px for body content.'
    },
    {
      id: 'all-caps-body',
      name: 'All Caps Body',
      description: 'Long blocks of text are set in all caps, severely reducing readability.',
      severity: 'warning',
      category: 'quality',
      message: 'Use sentence case for multi-line text and reserve all-caps for short headings or labels.'
    },
    {
      id: 'wide-tracking',
      name: 'Wide Tracking',
      description: 'Excessive letter-spacing (tracking) on lowercase body text.',
      severity: 'warning',
      category: 'quality',
      message: 'Remove letter-spacing on lowercase text. Wide tracking should only be used on all-caps.'
    },
    {
      id: 'extreme-negative-tracking',
      name: 'Extreme Negative Tracking',
      description: 'Letter-spacing is heavily negative, causing characters to crash into each other.',
      severity: 'warning',
      category: 'quality',
      message: 'Reduce negative letter-spacing to ensure distinct letterforms remain legible.'
    },
    {
      id: 'body-text-viewport-edge',
      name: 'Body Text at Viewport Edge',
      description: 'Text touches the edge of the viewport on small screens without padding.',
      severity: 'error',
      category: 'quality',
      message: 'Add horizontal padding (e.g., px-4 or 16px) to the main container to keep text off screen edges.'
    },
    {
      id: 'theater-slop-phrase',
      name: 'Theater Slop Phrase',
      description: 'Uses generic "theater" framing copy commonly output by AI models.',
      severity: 'warning',
      category: 'quality',
      message: 'Rewrite copy to be direct and authentic rather than using generic framing phrasing.'
    },

    // Layout Category
    {
      id: 'side-tab',
      name: 'Side Tab',
      description: 'Thick borders on just one side of a container resemble outdated side tabs.',
      severity: 'warning',
      category: 'layout',
      message: 'Remove the heavy side border. Use subtle background colors or full borders for emphasis.'
    },
    {
      id: 'border-accent-on-rounded',
      name: 'Border Accent on Rounded Container',
      description: 'Mixing a heavy single-side border accent with rounded corners creates geometric awkwardness.',
      severity: 'warning',
      category: 'layout',
      message: 'Use full borders on rounded containers, or remove the border-radius if using a side accent.'
    },
    {
      id: 'monotonous-spacing',
      name: 'Monotonous Spacing',
      description: 'Uses the exact same spacing value everywhere without hierarchy.',
      severity: 'warning',
      category: 'layout',
      message: 'Vary padding and margin to create clear logical groupings and visual hierarchy.'
    },
    {
      id: 'nested-cards',
      name: 'Nested Cards',
      description: 'Placing cards within cards creates unnecessary visual clutter and boxiness.',
      severity: 'warning',
      category: 'layout',
      message: 'Flatten the UI by removing nested borders/backgrounds and relying on spacing for grouping.'
    },
    {
      id: 'gpt-thin-border-wide-shadow',
      name: 'Thin Border Wide Shadow',
      description: 'Combines a thin gray border with a massive, diffuse shadow (classic AI pattern).',
      severity: 'warning',
      category: 'layout',
      message: 'Pick one: a crisp border with no shadow, or a refined shadow with no border.'
    },
    {
      id: 'icon-tile-stack',
      name: 'Icon Tile Stack',
      description: 'Floating icon tiles stacked directly above headings without integration.',
      severity: 'warning',
      category: 'layout',
      message: 'Integrate icons inline with the text or refine the layout to avoid floating icon boxes.'
    },
    {
      id: 'repeated-section-kickers',
      name: 'Repeated Section Kickers',
      description: 'Every section uses the exact same uppercase kicker style, creating monotony.',
      severity: 'warning',
      category: 'layout',
      message: 'Vary section headers or remove unnecessary kickers/eyebrows to reduce repetitiveness.'
    },
    {
      id: 'clipped-overflow-container',
      name: 'Clipped Overflow Container',
      description: 'Container strictly clips its contents in a way that hides interactive elements or shadows.',
      severity: 'warning',
      category: 'layout',
      message: 'Adjust overflow settings or padding so child elements (like focus rings or dropdowns) are not clipped.'
    },

    // Typography Category
    {
      id: 'overused-font',
      name: 'Overused Font',
      description: 'Relies on an overused default web font without typographic refinement.',
      severity: 'warning',
      category: 'typography',
      message: 'Switch to a more distinctive typeface or carefully refine weight and spacing if using defaults.'
    },
    {
      id: 'single-font',
      name: 'Single Font',
      description: 'Uses only one font family across the entire page without varying weight or size enough.',
      severity: 'warning',
      category: 'typography',
      message: 'Introduce a secondary typeface for headings, or create starker contrast in font weights/sizes.'
    },
    {
      id: 'flat-type-hierarchy',
      name: 'Flat Type Hierarchy',
      description: 'Headings and body text are too similar in size and weight.',
      severity: 'error',
      category: 'typography',
      message: 'Increase contrast between headings and body text using larger sizes, heavier weights, or different fonts.'
    },
    {
      id: 'oversized-h1',
      name: 'Oversized H1',
      description: 'The main heading is comically large and breaks layout or readability.',
      severity: 'warning',
      category: 'typography',
      message: 'Reduce the font size of the H1 to fit harmoniously within the viewport.'
    },
    {
      id: 'italic-serif-display',
      name: 'Italic Serif Display',
      description: 'Uses italic serif fonts for large display text, a cliché AI design trope.',
      severity: 'warning',
      category: 'typography',
      message: 'Use a regular (upright) serif or a sans-serif for hero typography instead of forced italics.'
    },
    {
      id: 'hero-eyebrow-chip',
      name: 'Hero Eyebrow Chip',
      description: 'Uses a small, brightly colored pill/chip above the main H1 (common generic pattern).',
      severity: 'warning',
      category: 'typography',
      message: 'Remove the eyebrow chip or integrate the text more naturally into the heading hierarchy.'
    }
  ];

  globalThis.DesignRules = rules;
})();
