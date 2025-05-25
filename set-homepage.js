import { writeFileSync } from 'fs';
import pkg, { homepage } from './package.json';

homepage = "https://zenrajko.github.io/warehouse-shift";

writeFileSync('package.json', JSON.stringify(pkg, null, 2));