import { unitDeficiencyMapping } from '@/lib/unitDeficiencyMapping';

export async function GET() {
    let intraMappingDuplicates = 0;
    
    Object.values(unitDeficiencyMapping).forEach(arr => {
        const seen = new Set();
        arr.forEach(def => {
            if (seen.has(def.id)) intraMappingDuplicates++;
            seen.add(def.id);
        });
    });

    return Response.json({
        intraMappingDuplicates
    });
}
