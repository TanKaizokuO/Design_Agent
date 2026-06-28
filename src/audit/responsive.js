import fs from 'fs';
import path from 'path';

function walkFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function checkResponsive(targetDir) {
  const files = walkFiles(targetDir);
  const findings = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (!['.html', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue'].includes(ext)) {
      continue;
    }
    
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    if (ext === '.css' || ext === '.scss') {
      if (!/@media\s*/i.test(content)) {
        findings.push({
          ruleId: 'responsive-missing-media-queries',
          file: file,
          line: 1,
          snippet: 'CSS file contains zero @media queries'
        });
      }
    }

    lines.forEach((line, index) => {
      if (/<meta[^>]*name=["']viewport["'][^>]*>/i.test(line) || /<meta[^>]*content=["'][^>]*viewport["'][^>]*>/i.test(line) || /user-scalable\s*=\s*(no|0)/i.test(line)) {
        if (/user-scalable\s*=\s*(no|0)/i.test(line) && /viewport/i.test(line)) {
          findings.push({
            ruleId: 'responsive-user-scalable-no',
            file: file,
            line: index + 1,
            snippet: line.trim()
          });
        }
      }

      const widthMatch = /width\s*:\s*(\d+)px/gi;
      let match;
      while ((match = widthMatch.exec(line)) !== null) {
        const val = parseInt(match[1], 10);
        if (val > 500) {
          findings.push({
            ruleId: 'responsive-hardcoded-large-width',
            file: file,
            line: index + 1,
            snippet: line.trim()
          });
        }
      }
    });
  }

  return findings;
}
