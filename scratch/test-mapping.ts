import { unitDeficiencyMapping } from '../lib/unitDeficiencyMapping';
import { insideDeficiencyMapping } from '../lib/deficiencyMapping';
import { outsideDeficiencyMapping } from '../lib/deficiencyMapping';

console.log("UNIT MAP KEYS:", Object.keys(unitDeficiencyMapping).length);
console.log("INSIDE MAP KEYS:", Object.keys(insideDeficiencyMapping).length);
console.log("OUTSIDE MAP KEYS:", Object.keys(outsideDeficiencyMapping).length);
