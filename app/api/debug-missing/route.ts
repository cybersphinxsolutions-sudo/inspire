import { INSIDE_ITEMS, UNIT_ITEMS } from '@/lib/inspectionData';
import { unitDeficiencyMapping } from '@/lib/unitDeficiencyMapping';
import { insideDeficiencyMapping } from '@/lib/deficiencyMapping';

export async function GET() {
    const unitMapKeys = Object.keys(unitDeficiencyMapping).map(k => k.toLowerCase());
    const insideMapKeys = Object.keys(insideDeficiencyMapping).map(k => k.toLowerCase());

    const insideMissing = INSIDE_ITEMS.filter(item => {
        const name = item.name.trim().toLowerCase();
        if (name === 'general comment' || name === 'general comment:*') return false;
        
        const exact = unitMapKeys.includes(name);
        const fuzzy = unitMapKeys.some(k => name.includes(k) || k.includes(name));
        return !exact && !fuzzy;
    });

    const unitMissing = UNIT_ITEMS.filter(item => {
        const name = item.name.trim().toLowerCase();
        if (name === 'general comment' || name === 'general comment:*') return false;

        const exact = insideMapKeys.includes(name);
        const fuzzy = insideMapKeys.some(k => name.includes(k) || k.includes(name));
        return !exact && !fuzzy;
    });

    return Response.json({
        insideMissing,
        unitMissing
    });
}
