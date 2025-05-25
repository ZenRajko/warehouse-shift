import { writeFileSync } from 'fs';
import pkg, { homepage } from './package.json';

if (homepage) {
  delete pkg.homepage;
  writeFileSync('package.json', JSON.stringify(pkg, null, 2));
}