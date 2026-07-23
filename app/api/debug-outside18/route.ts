import { OUTSIDE_ITEMS } from '@/lib/inspectionData';
import { outsideDeficiencyMapping } from '@/lib/deficiencyMapping';

export async function GET() {
    const item18 = OUTSIDE_ITEMS.find(i => i.id === '18');
    const name = item18 ? item18.name : 'Not Found';
    const baseName = name.replace(/^\d+\.\s+/, '').trim();
    
    const exactMatch = !!outsideDeficiencyMapping[baseName];
    
    const fuzzyMatches = Object.keys(outsideDeficiencyMapping).filter(k => {
        const nk = k.toLowerCase();
        const nb = baseName.toLowerCase();
        if (nb.includes(nk) || nk.includes(nb)) return true;
        if (nb.includes('paint') && nk.includes('paint')) return true;
        return false;
    });

    return Response.json({
        name,
        baseName,
        exactMatch,
        fuzzyMatches,
        mappingKeys: Object.keys(outsideDeficiencyMapping)
    });
}
