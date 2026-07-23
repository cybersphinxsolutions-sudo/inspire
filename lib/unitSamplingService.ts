/**
 * Unit Sampling Service for NSPIRE Inspections
 * 
 * This service provides unit sampling logic for properties following official NSPIRE
 * sampling requirements. Supports all property sizes from 1 unit to 921+ units.
 * The sampling ensures consistency across inspectors.
 */

export interface UnitSample {
  totalUnits: number;
  unitsToInspect: number;
  selectedUnits: string[];
}

/**
 * NSPIRE Scoring Factor (n) ranges based on official NSPIRE sampling requirements
 * Each entry: [minUnits, maxUnits, scoringFactor]
 * This covers all property sizes from 1 to unlimited units
 */
const NSPIRE_SAMPLING_RANGES: [number, number, number][] = [
  [1, 1, 1],       // 1 unit = n=1
  [2, 2, 1],       // 2 units = n=1
  [3, 3, 2],       // 3 units = n=2
  [4, 4, 3],       // 4 units = n=3
  [5, 5, 4],       // 5 units = n=4
  [6, 6, 5],       // 6 units = n=5
  [7, 7, 6],       // 7 units = n=6
  [8, 8, 7],       // 8 units = n=7
  [9, 9, 8],       // 9 units = n=8
  [10, 10, 9],     // 10 units = n=9
  [11, 12, 9],     // 11-12 units = n=9
  [13, 14, 10],    // 13-14 units = n=10
  [15, 16, 11],    // 15-16 units = n=11
  [17, 18, 12],    // 17-18 units = n=12
  [19, 21, 13],    // 19-21 units = n=13
  [22, 24, 14],    // 22-24 units = n=14
  [25, 27, 15],    // 25-27 units = n=15
  [28, 30, 16],    // 28-30 units = n=16
  [31, 35, 17],    // 31-35 units = n=17
  [36, 39, 18],    // 36-39 units = n=18
  [40, 45, 19],    // 40-45 units = n=19
  [46, 51, 20],    // 46-51 units = n=20
  [52, 59, 21],    // 52-59 units = n=21
  [60, 67, 22],    // 60-67 units = n=22
  [68, 78, 23],    // 68-78 units = n=23
  [79, 92, 24],    // 79-92 units = n=24
  [93, 110, 25],   // 93-110 units = n=25
  [111, 120, 26],  // 111-120 units = n=26
  [121, 166, 27],  // 121-166 units = n=27
  [167, 214, 28],  // 167-214 units = n=28
  [215, 295, 29],  // 215-295 units = n=29
  [296, 455, 30],  // 296-455 units = n=30
  [456, 920, 31],  // 456-920 units = n=31
  [921, Infinity, 32], // 921+ units = n=32
];

/**
 * Gets the scoring factor (n) for a given number of units
 * This is the number of units to inspect based on NSPIRE guidelines
 */
function getScoringFactor(totalUnits: number): number {
  if (totalUnits < 1) {
    return 1;
  }

  for (const [min, max, factor] of NSPIRE_SAMPLING_RANGES) {
    if (totalUnits >= min && totalUnits <= max) {
      return factor;
    }
  }

  return 32;
}

/**
 * Generates a deterministic random sample of units based on property ID
 * This ensures the same property always gets the same unit selection
 */
function generateDeterministicSample(
  totalUnits: number, 
  unitsToInspect: number, 
  propertyId: string
): string[] {
  // Create a simple hash from property ID to ensure consistency
  let hash = 0;
  if (propertyId) {
    for (let i = 0; i < propertyId.length; i++) {
      const char = propertyId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
  }
  
  // Use the hash as a seed for deterministic selection
  const seed = Math.abs(hash) || Date.now();
  
  // Generate all possible unit numbers
  const allUnits = Array.from({ length: totalUnits }, (_, i) => 
    `Unit ${(i + 1).toString().padStart(3, '0')}`
  );
  
  // If we need to inspect all units, return all
  if (unitsToInspect >= totalUnits) {
    return allUnits;
  }
  
  // Create a deterministic shuffle based on the seed
  const shuffled = [...allUnits];
  let currentSeed = seed;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate a deterministic "random" index
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = currentSeed % (i + 1);
    
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first N units from the shuffled array
  return shuffled.slice(0, unitsToInspect);
}

/**
 * Gets the number of units to inspect based on total units
 */
export function getUnitsToInspect(totalUnits: number): number {
  if (totalUnits < 1) return 0;
  return getScoringFactor(totalUnits);
}

/**
 * Gets the sampling requirements for a given number of units
 */
export function getSamplingRequirements(totalUnits: number): { requiredSize: number } {
  return { requiredSize: getUnitsToInspect(totalUnits) };
}

/**
 * Generates a random unit sample for inspection
 */
export function generateRandomUnitSample(
  totalUnits: number, 
  propertyId: string
): UnitSample {
  if (totalUnits < 1) {
    return { totalUnits: 0, unitsToInspect: 0, selectedUnits: [] };
  }
  
  const unitsToInspect = getUnitsToInspect(totalUnits);
  const selectedUnits = generateDeterministicSample(totalUnits, unitsToInspect, propertyId);
  
  return {
    totalUnits,
    unitsToInspect,
    selectedUnits,
  };
}

export function isRandomSelectionAvailable(totalUnits: number): boolean {
  return totalUnits >= 1;
}

export function getSamplingExplanation(totalUnits: number): string {
  if (totalUnits < 1) return "No units available.";
  
  const unitsToInspect = getUnitsToInspect(totalUnits);
  
  if (totalUnits === 1) {
    return `This property has 1 unit. The single unit will be inspected.`;
  }
  
  return `This property has ${totalUnits} units. Based on NSPIRE sampling requirements, ${unitsToInspect} units will be randomly selected for inspection.`;
}
