import fs from 'fs';
import path from 'path';
import { runEngine } from './engine/runner.js';

export function runAudit(targetDir) {
  let target = targetDir;
  
  if (!target) {
    if (fs.existsSync('./src')) {
      target = './src';
    } else {
      console.error('Error: No target directory specified and ./src does not exist.');
      console.error('Usage: design_skill audit <target>');
      process.exit(2);
    }
  }

  const absoluteTarget = path.resolve(target);
  
  if (!fs.existsSync(absoluteTarget)) {
    console.error(`Error: Target directory does not exist: ${absoluteTarget}`);
    process.exit(2);
  }

  try {
    const allFindings = runEngine(absoluteTarget);
    
    // Filter out stubs just in case
    const findings = allFindings.filter(f => !f.ruleId.startsWith('_stub_'));

    if (findings.length === 0) {
      console.log('✅ Audit passed! No design anti-patterns found.');
      process.exit(0);
    }

    console.log(`❌ Audit failed. Found ${findings.length} design anti-pattern(s):\n`);

    findings.forEach(finding => {
      console.log(`[${finding.ruleId}] ${finding.file}:${finding.line}`);
      console.log(`  > ${finding.snippet}\n`);
    });

    process.exit(1);
  } catch (err) {
    console.error(`Error during audit: ${err.message}`);
    process.exit(2);
  }
}
