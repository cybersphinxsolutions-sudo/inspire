import { unitDeficiencyMapping } from '@/lib/unitDeficiencyMapping';
import { insideDeficiencyMapping } from '@/lib/deficiencyMapping';

export async function GET() {
    const duplicateIds: string[] = [];
    const seenIds = new Set<string>();

    Object.values(unitDeficiencyMapping).forEach(arr => {
        arr.forEach(def => {
            if (seenIds.has(def.id)) duplicateIds.push(def.id);
            seenIds.add(def.id);
        });
    });

    Object.values(insideDeficiencyMapping).forEach(arr => {
        arr.forEach(def => {
            if (seenIds.has(def.id)) duplicateIds.push(def.id);
            seenIds.add(def.id);
        });
    });

    return Response.json({
        duplicates: duplicateIds.length,
        sample: duplicateIds.slice(0, 5)
    });
}
