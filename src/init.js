import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initProject() {
  const cwd = process.cwd();
  
  const templatesDir = path.join(__dirname, '..', 'templates');
  
  const productTplPath = path.join(templatesDir, 'PRODUCT.md');
  const designTplPath = path.join(templatesDir, 'DESIGN.md');
  const skillTplPath = path.join(templatesDir, 'skill.md');
  
  const destProductPath = path.join(cwd, 'PRODUCT.md');
  const destDesignPath = path.join(cwd, 'DESIGN.md');
  const destSkillDir = path.join(cwd, '.design_skill');
  const destSkillPath = path.join(destSkillDir, 'skill.md');
  
  // Create .design_skill directory if it doesn't exist
  if (!fs.existsSync(destSkillDir)) {
    fs.mkdirSync(destSkillDir, { recursive: true });
  }
  
  // Copy files if they don't exist
  if (!fs.existsSync(destProductPath)) {
    fs.copyFileSync(productTplPath, destProductPath);
    console.log('Created PRODUCT.md');
  } else {
    console.log('PRODUCT.md already exists, skipping.');
  }
  
  if (!fs.existsSync(destDesignPath)) {
    fs.copyFileSync(designTplPath, destDesignPath);
    console.log('Created DESIGN.md');
  } else {
    console.log('DESIGN.md already exists, skipping.');
  }
  
  if (!fs.existsSync(destSkillPath)) {
    fs.copyFileSync(skillTplPath, destSkillPath);
    console.log('Created .design_skill/skill.md');
  } else {
    console.log('.design_skill/skill.md already exists, skipping.');
  }
  
  console.log('Initialization complete.');
}
