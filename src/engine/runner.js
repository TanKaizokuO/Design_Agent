import fs from 'fs';
import path from 'path';
import rules from './rules.js';

export function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    // Explicitly exclude node_modules
    if (file === 'node_modules') continue;
    
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function runEngine(targetDir) {
  let files;
  try {
    files = walkDir(targetDir);
  } catch (err) {
    throw new Error(`Failed to read directory: ${targetDir}. ${err.message}`);
  }

  const findings = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // Check if any rule cares about this extension
    const applicableRules = rules.filter(r => r.extensions.includes(ext));
    if (applicableRules.length === 0) continue;

    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split(/\r?\n/);

    for (const rule of applicableRules) {
      const matches = rule.evaluate(content, lines);
      for (const match of matches) {
        findings.push({
          ruleId: rule.id,
          file,
          line: match.line,
          snippet: match.snippet
        });
      }
    }
  }

  return findings;
}
