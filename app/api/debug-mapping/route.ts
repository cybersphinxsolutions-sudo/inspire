import { NextResponse } from 'next/server';
import { unitDeficiencyMapping } from '@/lib/unitDeficiencyMapping';
import { insideDeficiencyMapping } from '@/lib/deficiencyMapping';
import { outsideDeficiencyMapping } from '@/lib/deficiencyMapping';

export async function GET() {
    const unitCounts: Record<string, number> = {};
    Object.keys(unitDeficiencyMapping).forEach(k => unitCounts[k] = unitDeficiencyMapping[k].length);
    const insideCounts: Record<string, number> = {};
    Object.keys(insideDeficiencyMapping).forEach(k => insideCounts[k] = insideDeficiencyMapping[k].length);
    const outsideCounts: Record<string, number> = {};
    Object.keys(outsideDeficiencyMapping).forEach(k => outsideCounts[k] = outsideDeficiencyMapping[k].length);

    return NextResponse.json({
        unitCounts,
        insideCounts,
        outsideCounts
    });
}
