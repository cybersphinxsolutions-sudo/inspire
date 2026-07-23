import { ALL_UNIT_CATEGORIES } from '@/lib/insideAppData';
import { ALL_INSIDE_CATEGORIES } from '@/lib/unitAppData';
import { NextResponse } from 'next/server';

export async function GET() {
    const singleUnitCats: string[] = [];
    ALL_UNIT_CATEGORIES.forEach(cat => {
        if (cat.items && cat.items.length === 1) {
            singleUnitCats.push(`${cat.category} -> ${cat.items[0].itemName}`);
        }
    });

    const flatInsideCats: string[] = [];
    ALL_INSIDE_CATEGORIES.forEach(cat => {
        if (cat.deficiencies && !cat.subcategories) {
            flatInsideCats.push(`${cat.itemName}`);
        }
    });

    return NextResponse.json({
        singleUnitCats,
        flatInsideCats
    });
}
