import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

function walkHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkHtmlFiles(filePath, fileList);
    } else if (filePath.toLowerCase().endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export async function checkA11y(targetDir) {
  const htmlFiles = walkHtmlFiles(targetDir);
  const findings = [];

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    const dom = new JSDOM(html);
    
    let results;
    try {
      results = await axe.run(dom.window.document.documentElement);
    } catch (e) {
      continue;
    }

    const lines = html.split('\n');

    for (const violation of results.violations) {
      for (const node of violation.nodes) {
        const htmlSnippet = node.html || '';
        let lineNumber = 0;
        
        if (htmlSnippet) {
          const firstLineOfSnippet = htmlSnippet.split('\n')[0].trim();
          if (firstLineOfSnippet) {
            const index = lines.findIndex(l => l.includes(firstLineOfSnippet));
            if (index !== -1) {
              lineNumber = index + 1;
            }
          }
        }

        findings.push({
          ruleId: `a11y-${violation.id}`,
          file: file,
          line: lineNumber,
          snippet: htmlSnippet || violation.description
        });
      }
    }
  }

  return findings;
}
