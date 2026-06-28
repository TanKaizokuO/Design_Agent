import fs from 'fs';
import path from 'path';
import './rules.js';
import { detect } from './detector.mjs';

const rules = globalThis.DesignRules;
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

export function evaluateContent(content, ext) {
  // Pass content as html parameter for now; document/window are null in CLI context
  const rawFindings = detect(content, null, null);
  const findings = [];

  for (const finding of rawFindings) {
    const ruleMetadata = rules.find(r => r.id === finding.id);
    if (ruleMetadata) {
      findings.push({
        ruleId: finding.id,
        line: finding.line || 1,
        snippet: finding.snippet || '',
        name: ruleMetadata.name,
        message: ruleMetadata.message,
        severity: ruleMetadata.severity,
        category: ruleMetadata.category
      });
    } else {
      findings.push({
        ruleId: finding.id,
        line: finding.line || 1,
        snippet: finding.snippet || '',
        name: 'Unknown Rule',
        message: 'No metadata found for this rule.',
        severity: finding.severity || 'warning',
        category: 'unknown'
      });
    }
  }

  return findings;
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
    const content = fs.readFileSync(file, 'utf-8');
    
    const fileFindings = evaluateContent(content, ext);
    for (const finding of fileFindings) {
      findings.push({
        ...finding,
        file
      });
    }
  }

  return findings;
}
