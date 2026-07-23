/**
 * appDeficiencyLookup.ts
 *
 * This file imports directly from the mobile app's data files (which contain
 * full multi-step `codeReference` content) and exposes a single lookup function
 * that the frontend uses to display Code of Reference information.
 */

import { ALL_OUTSIDE_DEFICIENCIES } from './outsideAppData'
import { ALL_UNIT_CATEGORIES } from './insideAppData'
import { ALL_INSIDE_CATEGORIES } from './unitAppData'

/**
 * Look up the full multi-step `codeReference` text for a deficiency.
 *
 * @param section          'outside' | 'inside' | 'unit'
 * @param categoryName     The inspection item/category currently open (e.g. "1. Address and Signage")
 * @param deficiencyName   The deficiency label that the user selected
 * @returns                The full codeReference string, or undefined if not found
 */
export const lookupCodeReference = (
  section: string,
  categoryName: string,
  deficiencyName: string
): string | undefined => {
  if (!categoryName || !deficiencyName) return undefined

  // Normalise names for fuzzy matching
  const normalise = (s: string) => s.toLowerCase().replace(/^\d+[\.\-]\s*/, '').trim()
  const cat = normalise(categoryName)
  
  // Helper for name matching
  const namesMatch = (a: string, b: string) => {
    const na = normalise(a)
    const nb = normalise(b)
    return na === nb || na.includes(nb) || nb.includes(na)
  }

  // ── OUTSIDE SECTION ──────────────────────────────────────────────────────
  if (section === 'outside') {
    const category = ALL_OUTSIDE_DEFICIENCIES[categoryName]
    if (category) {
      const deficiency = category.deficiencies.find((d: any) =>
        namesMatch(d.name, deficiencyName)
      )
      if (deficiency) return deficiency.codeReference
    }
    // Fallback: search all outside
    for (const key of Object.keys(ALL_OUTSIDE_DEFICIENCIES)) {
        if (namesMatch(key, categoryName)) {
            const found = ALL_OUTSIDE_DEFICIENCIES[key].deficiencies.find((d: any) => namesMatch(d.name, deficiencyName));
            if (found) return found.codeReference;
        }
    }
    return undefined
  }

  // ── INSIDE SECTION (Common Areas) ───────────────────────────────────────
  if (section === 'inside') {
    // Search in ALL_UNIT_CATEGORIES (which actually contains Inside/Common data)
    for (const categoryObj of ALL_UNIT_CATEGORIES) {
      const currentCatName = normalise(categoryObj.category)
      
      // If the category matches (e.g., "Kitchen")
      if (currentCatName === cat || cat.includes(currentCatName) || currentCatName.includes(cat)) {
        // 1. Try to match the deficiencyName to one of the items (e.g., "Cooking Appliance")
        for (const item of categoryObj.items) {
          if (namesMatch(item.itemName, deficiencyName)) {
            return item.deficiencies[0]?.codeReference;
          }
        }
        
        // 2. Fallback: Search all deficiencies in all items of this category
        for (const item of categoryObj.items) {
          const found = item.deficiencies.find((d: any) => namesMatch(d.name, deficiencyName));
          if (found) return found.codeReference;
        }
      }
    }
    
    // Global fallback for inside
    for (const categoryObj of ALL_UNIT_CATEGORIES) {
      for (const item of categoryObj.items) {
        const found = item.deficiencies.find((d: any) => namesMatch(d.name, deficiencyName));
        if (found) return found.codeReference;
      }
    }
  }

  // ── UNIT SECTION (Apartments) ──────────────────────────────────────────
  if (section === 'unit') {
    // Search in ALL_INSIDE_CATEGORIES (which actually contains Unit data)
    for (const item of ALL_INSIDE_CATEGORIES) {
      const currentItemName = normalise(item.itemName);
      
      // If the item matches (e.g., "Bathroom")
      if (currentItemName === cat || cat.includes(currentItemName) || currentItemName.includes(cat)) {
        // 1. Check subcategories (e.g., "Bathtub/Shower")
        if (item.subcategories) {
          const sub = item.subcategories.find((s: any) => namesMatch((s as any).name || (s as any).itemName || '', deficiencyName));
          if (sub && sub.deficiencies[0]) return sub.deficiencies[0].codeReference;
        }
        
        // 2. Check direct deficiencies
        if (item.deficiencies) {
          const found = item.deficiencies.find((d: any) => namesMatch(d.name, deficiencyName));
          if (found) return found.codeReference;
        }
      }
    }

    // Global fallback for unit
    for (const item of ALL_INSIDE_CATEGORIES) {
      if (item.deficiencies) {
        const found = item.deficiencies.find((d: any) => namesMatch(d.name, deficiencyName));
        if (found) return found.codeReference;
      }
      if (item.subcategories) {
        for (const sub of item.subcategories) {
          const found = sub.deficiencies.find((d: any) => namesMatch(d.name, deficiencyName));
          if (found) return found.codeReference;
        }
      }
    }
  }

  return undefined
}
