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

export function checkPerformance(targetDir) {
  const files = walkFiles(targetDir);
  const findings = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      const stats = fs.statSync(file);
      if (stats.size > 500 * 1024) {
        findings.push({
          ruleId: 'performance-large-image',
          file: file,
          line: 1,
          snippet: `Image size is ${(stats.size / 1024).toFixed(1)}KB (exceeds 500KB)`
        });
      }
      continue;
    }

    if (!['.html', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue'].includes(ext)) {
      continue;
    }
    
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    if (content.includes('@font-face')) {
      const fontFaceMatches = content.match(/@font-face\s*{[^}]+}/gi);
      if (fontFaceMatches) {
        fontFaceMatches.forEach(block => {
          if (!/font-display\s*:\s*swap/i.test(block)) {
            let lineNum = 1;
            const firstLineOfBlock = block.split('\n')[0].trim();
            const idx = lines.findIndex(l => l.includes(firstLineOfBlock));
            if (idx !== -1) lineNum = idx + 1;
            
            findings.push({
              ruleId: 'performance-font-display',
              file: file,
              line: lineNum,
              snippet: '@font-face missing font-display: swap'
            });
          }
        });
      }
    }

    lines.forEach((line, index) => {
      const imgRegex = /<img[^>]+>/gi;
      let match;
      while ((match = imgRegex.exec(line)) !== null) {
        const imgTag = match[0];
        if (!/loading\s*=\s*["']lazy["']/i.test(imgTag)) {
          findings.push({
            ruleId: 'performance-lazy-load',
            file: file,
            line: index + 1,
            snippet: imgTag.trim()
          });
        }
      }
    });
  }

  return findings;
}
