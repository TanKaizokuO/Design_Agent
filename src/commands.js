export const commands = [
  { name: 'init', description: 'Initialize the project with required design contexts.' },
  { name: 'audit', description: 'Evaluate technical frontend quality and accessibility.' },
  { name: 'critique', description: 'Provide a design critique against standard principles.' },
  { name: 'bolder', description: 'Make the design bolder and more prominent.' },
  { name: 'shape', description: 'Refine the structural layout and spacing.' },
  { name: 'craft', description: 'Apply fine-tuned micro-design improvements.' },
  { name: 'polish', description: 'Apply final polish and polish up the aesthetics.' },
  { name: 'animate', description: 'Add appropriate animations and transitions.' },
  { name: 'colorize', description: 'Apply colors according to brand guidelines.' },
  { name: 'extract', description: 'Extract UI tokens and components to the design system.' },
  { name: 'document', description: 'Generate DESIGN.md from an undocumented codebase.' },
  // Undecided slots
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null },
  { name: null, description: null }
];

export function getValidCommands() {
  return commands.filter(c => c.name !== null).map(c => c.name);
}

export function generateHelpTable() {
  const validCommands = commands.filter(c => c.name !== null);
  const maxLen = Math.max(...validCommands.map(c => c.name.length));
  
  let output = 'Available commands:\\n\\n';
  for (const cmd of validCommands) {
    const paddedName = cmd.name.padEnd(maxLen + 4, ' ');
    output += `  ${paddedName}${cmd.description}\\n`;
  }
  return output;
}
