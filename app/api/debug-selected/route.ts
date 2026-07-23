import { ALL_UNIT_CATEGORIES } from '@/lib/insideAppData';
import { ALL_INSIDE_CATEGORIES } from '@/lib/unitAppData';

export async function GET() {
    const errors: string[] = [];

    try {
        ALL_UNIT_CATEGORIES.forEach(cat => {
            if (!cat.items) errors.push(`MISSING ITEMS IN CAT: ${cat.category}`);
            else {
                cat.items.forEach((item: any) => {
                    if (!item.deficiencies && !item.subcategories) {
                        errors.push(`MISSING DEFS AND SUBS IN ITEM: ${item.itemName} IN CAT: ${cat.category}`);
                    }
                    if (item.subcategories) {
                        item.subcategories.forEach((sub: any) => {
                            if (!sub.deficiencies) errors.push(`MISSING DEFS IN SUB: ${sub.name} IN ITEM: ${item.itemName}`);
                        });
                    }
                });
            }
        });
    } catch (e: any) {
        errors.push(`ALL_UNIT_CATEGORIES ERROR: ${e.message}`);
    }

    try {
        ALL_INSIDE_CATEGORIES.forEach(cat => {
            if (!cat.deficiencies && !cat.subcategories) {
                errors.push(`MISSING DEFS AND SUBS IN CAT: ${cat.itemName}`);
            }
            if (cat.subcategories) {
                cat.subcategories.forEach((sub: any) => {
                    if (!sub.deficiencies) errors.push(`MISSING DEFS IN SUB: ${sub.name} IN CAT: ${cat.itemName}`);
                });
            }
        });
    } catch (e: any) {
        errors.push(`ALL_INSIDE_CATEGORIES ERROR: ${e.message}`);
    }

    return Response.json({ errors });
}
