import sys

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_content = """// 19. Railings
export const RAILINGS_OUTSIDE: ItemDeficiencies = {
  itemName: 'Railings',
  deficiencies: [
    {
      id: 'rail_out_1',
      name: 'Guardrail',
      detail: 'A guardrail is deficient if it\\'s missing or not installed along a walking surface over 30 inches above the floor or grade in areas accessible to residents. Limiting its safe use',
      criteria: 'A guardrail is deficient if it\\'s missing or not installed along a walking surface over 30 inches above the floor or grade in areas accessible to residents',
      severity: 'Life-Threatening',
      repairBy: '24 Hrs',
      points: '24.8/n',
      code: 'RAIL-OUT-01',
      codeReference: `📝 Step 1: Identify Guardrail Locations
Inspect all elevated walking surfaces accessible to residents or staff:
• Balconies, decks, porches
• Exterior stair landings and ramps
• Retaining walls with adjacent walkways
• Rooftop terraces or utility platforms
• Accessible paths with drop-offs >30"

🧱 Step 2: Assess Structural Integrity
Inspect for missing, damaged, or unstable components:
Guardrail missing, Top/mid rail, Posts & anchors, Balusters/pickets, Height compliance
• Cross-reference: Note IRC §R312.1, NSPIRE Guardrail Standard, and IBU overlays

🔧 Step 3: Perform Stability & Safety Tests
• Push/pull test: Apply moderate force to top rail and posts to check for movement
• Gap check: Measure spacing between vertical elements (must be ≤4")
• Height check: Use tape measure to confirm rail height from walking surface
• NSPIRE Deficiency Examples:

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Rust, mold, or pest nests on or around guardrail components
• Water damage or algae on adjacent walking surfaces
• IBU Overlay: May require sealed joints, pest-resistant materials, and corrosion-proof finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Handrail integration: If guardrail doubles as handrail, must meet local disability Act
• Visual contrast: Guardrails must be distinguishable from surroundings for low-vision users
• Edge protection: Required at accessible ramps and elevated paths without curbs
• IBU Overlay: May require tactile warnings, ADA-compliant grip surfaces, and extended`
    },
    {
      id: 'rail_out_2',
      name: 'Guardrail',
      detail: 'A guardrail is deficient if it\\'s missing critical components, visibly damaged, under 30 inches in height, or not securely attached enough to prevent fall hazards. The guardrail is functionally adequate.',
      criteria: 'A guardrail is deficient if it\\'s missing critical components, visibly damaged, under 30 inches in height, or not securely attached enough to prevent fall hazards.',
      severity: 'Life-Threatening',
      repairBy: '24 Hrs',
      points: '24.8/n',
      code: 'RAIL-OUT-02',
      codeReference: `📝 Step 1: Identify Guardrail Locations
Inspect all elevated walking surfaces accessible to residents or staff:
• Balconies, decks, porches
• Exterior stair landings and ramps
• Retaining walls with adjacent walkways
• Rooftop terraces or utility platforms
• Accessible paths with drop-offs >30"

🧱 Step 2: Assess Structural Integrity
Inspect for missing, damaged, or unstable components:
Guardrail missing, Top/mid rail, Posts & anchors, Balusters/pickets, Height compliance
• Cross-reference: Note IRC §R312.1, NSPIRE Guardrail Standard, and IBU overlays

🔧 Step 3: Perform Stability & Safety Tests
• Push/pull test: Apply moderate force to top rail and posts to check for movement
• Gap check: Measure spacing between vertical elements (must be ≤4")
• Height check: Use tape measure to confirm rail height from walking surface
• NSPIRE Deficiency Examples:

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Rust, mold, or pest nests on or around guardrail components
• Water damage or algae on adjacent walking surfaces
• IBU Overlay: May require sealed joints, pest-resistant materials, and corrosion-proof finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Handrail integration: If guardrail doubles as handrail, must meet local disability Act
• Visual contrast: Guardrails must be distinguishable from surroundings for low-vision users
• Edge protection: Required at accessible ramps and elevated paths without curbs
• IBU Overlay: May require tactile warnings, ADA-compliant grip surfaces, and extended`
    },
    {
      id: 'rail_out_3',
      name: 'Handrail',
      detail: 'Handrail is missing (i.e., evidence of prior installation, but now not present or is incomplete).',
      criteria: 'Handrail is missing (i.e., evidence of prior installation, but now not present or is incomplete).',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'RAIL-OUT-03',
      codeReference: `📝 Step 1: Identify Railing Locations
Inspect all exterior railings that serve:
• Stairs, ramps, and elevated walkways
• Balconies, porches, and decks
• Accessible paths with elevation changes
• Retaining walls or drop-offs adjacent to pedestrian routes

🧱 Step 2: Assess Structural Integrity
Inspect for damage, instability, or missing components:
Railing structure, Mounting hardware, Top rail, Vertical supports, Height compliance
• Cross-reference: Note IRC §R311.7.8, NSPIRE Guardrail Standard, and IBU overlays

🔧 Step 3: Perform Safety & Functionality Checks
• Stability test: Apply moderate force to top rail and posts—should not wobble or shift
• Height check: Measure from walking surface to top of rail
• Spacing check: Ensure vertical elements are ≤4" apart to prevent entrapment

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Rust, mold, or pest nests on or around railing components
• Water damage or algae on adjacent walking surfaces
• IBU Overlay: May require sealed joints, pest-resistant materials, and corrosion-proof finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Handrail grip: Must be graspable and continuous
• Edge protection: Required at ramps and elevated surfaces without curbs
• Visual contrast: Railings must be distinguishable for low-vision users
• IBU Overlay: May require tactile warnings, disability-compliant grip surfaces, and extended landings`
    },
    {
      id: 'rail_out_4',
      name: 'Handrail',
      detail: 'Handrail is not functionally adequate. The handrail is deficient if it cannot be reasonably grasped for support, is not continuous along the full flight of stairs, or is installed at a height outside the 28-42 inch range.',
      criteria: 'Handrail is not functionally adequate (i.e., it cannot reasonably be grasped by hand to provide stability or support when ascending or descending stairways). OR Handrail is not continuous for the full length of each flight of stairs. OR Handrail is not between 28 inches and 42 inches in height.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'RAIL-OUT-04',
      codeReference: `📝 Step 1: Identify Railing Locations
Inspect all exterior railings that serve:
• Stairs, ramps, and elevated walkways
• Balconies, porches, and decks
• Accessible paths with elevation changes
• Retaining walls or drop-offs adjacent to pedestrian routes

🧱 Step 2: Assess Structural Integrity
Inspect for damage, instability, or missing components:
Railing structure, Mounting hardware, Top rail, Vertical supports, Height compliance
• Cross-reference: Note IRC §R311.7.8, NSPIRE Guardrail Standard, and IBU overlays

🔧 Step 3: Perform Safety & Functionality Checks
• Stability test: Apply moderate force to top rail and posts—should not wobble or shift
• Height check: Measure from walking surface to top of rail
• Spacing check: Ensure vertical elements are ≤4" apart to prevent entrapment

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Rust, mold, or pest nests on or around railing components
• Water damage or algae on adjacent walking surfaces
• IBU Overlay: May require sealed joints, pest-resistant materials, and corrosion-proof finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Handrail grip: Must be graspable and continuous
• Edge protection: Required at ramps and elevated surfaces without curbs
• Visual contrast: Railings must be distinguishable for low-vision users
• IBU Overlay: May require tactile warnings, disability-compliant grip surfaces, and extended landings`
    },
    {
      id: 'rail_out_5',
      name: 'Handrail',
      detail: 'Handrail is not installed where required.',
      criteria: '4 or more stair risers are present, and a handrail is not installed. OR A ramp has a rise greater than 6 inches or a horizontal projection greater than 72 inches and a handrail is not installed on both sides.',
      severity: 'Severe',
      repairBy: '24 Hrs',
      points: '12.20/n',
      code: 'RAIL-OUT-05',
      codeReference: `📝 Step 1: Identify Railing Locations
Inspect all exterior railings that serve:
• Stairs, ramps, and elevated walkways
• Balconies, porches, and decks
• Accessible paths with elevation changes
• Retaining walls or drop-offs adjacent to pedestrian routes

🧱 Step 2: Assess Structural Integrity
Inspect for damage, instability, or missing components:
Railing structure, Mounting hardware, Top rail, Vertical supports, Height compliance
• Cross-reference: Note IRC §R311.7.8, NSPIRE Guardrail Standard, and IBU overlays

🔧 Step 3: Perform Safety & Functionality Checks
• Stability test: Apply moderate force to top rail and posts—should not wobble or shift
• Height check: Measure from walking surface to top of rail
• Spacing check: Ensure vertical elements are ≤4" apart to prevent entrapment

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Rust, mold, or pest nests on or around railing components
• Water damage or algae on adjacent walking surfaces
• IBU Overlay: May require sealed joints, pest-resistant materials, and corrosion-proof finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Handrail grip: Must be graspable and continuous
• Edge protection: Required at ramps and elevated surfaces without curbs
• Visual contrast: Railings must be distinguishable for low-vision users
• IBU Overlay: May require tactile warnings, disability-compliant grip surfaces, and extended landings`
    },
    {
      id: 'rail_out_6',
      name: 'Handrail',
      detail: 'Handrail is not secured. There is movement in the anchors of the handrail.',
      criteria: 'There is movement in the anchors of the handrail.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'RAIL-OUT-06',
      codeReference: `📝 Step 1: Identify Railing Locations
Inspect all exterior railings that serve:
• Stairs, ramps, and elevated walkways
• Balconies, porches, and decks
• Accessible paths with elevation changes
• Retaining walls or drop-offs adjacent to pedestrian routes

🧱 Step 2: Assess Structural Integrity
Inspect for damage, instability, or missing components:
Railing structure, Mounting hardware, Top rail, Vertical supports, Height compliance
• Cross-reference: Note IRC §R311.7.8, NSPIRE Guardrail Standard, and IBU overlays

🔧 Step 3: Perform Safety & Functionality Checks
• Stability test: Apply moderate force to top rail and posts—should not wobble or shift
• Height check: Measure from walking surface to top of rail
• Spacing check: Ensure vertical elements are ≤4" apart to prevent entrapment

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Rust, mold, or pest nests on or around railing components
• Water damage or algae on adjacent walking surfaces
• IBU Overlay: May require sealed joints, pest-resistant materials, and corrosion-proof finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Handrail grip: Must be graspable and continuous
• Edge protection: Required at ramps and elevated surfaces without curbs
• Visual contrast: Railings must be distinguishable for low-vision users
• IBU Overlay: May require tactile warnings, disability-compliant grip surfaces, and extended landings`
    }
  ]
};

// 20. Roof Assembly
export const ROOF_OUTSIDE: ItemDeficiencies = {
  itemName: 'Roof Assembly',
  deficiencies: [
    {
      id: 'roof_out_1',
      name: 'Gutter component is damaged. OR Gutter component is missing or unfixed.',
      detail: 'Gutter component is damaged. OD OR Gutter component is missing or gutter component is unfixed.',
      criteria: 'Gutter or downspout missing or damaged components.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'ROOF-OUT-01',
      codeReference: `📝 Step 1: Identify Roof Assembly Components
Focus on all visible and accessible roof-related elements:
• Roof covering (shingles, membrane, tile, metal)
• Flashing, fascia, soffits, and drip edges
• Gutters, downspouts, scuppers, and roof drains
• Roof-mounted equipment (vents, HVAC units, exhausts)
• Parapets, eaves, and structural edges

🧱 Step 2: Assess Structural Integrity
Inspect for damage, deterioration, or missing components:
Roof surface, Drainage system, Flashing & joints, Fascia/soffit, Standing water
• IRC – Roof Assemblies (§R901–R908)

🔧 Step 3: Evaluate Functional Performance
• Water flow test (if safe): Observe drainage during or after rain
• Ventilation check: Confirm roof vents are unobstructed and intact
• Seal integrity: Look for gaps around penetrations (e.g., exhaust pipes, HVAC mounts)

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Mold, algae, or pest nests on roof edges or under eaves
• Debris buildup in gutters or scuppers
• Water stains or efflorescence on walls below roofline
• IBU Overlay: May require pest-proof flashing, sealed joints, and moisture-resistant finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Roof access: Confirm safe access for maintenance (e.g., ladders, hatches)
• Fall protection: Guardrails or parapets required at accessible roof edges
• Signage: Required for rooftop equipment zones and restricted areas
• IBU Overlay: May require ADA-compliant access paths to rooftop amenities or service zones`
    },
    {
      id: 'roof_out_2',
      name: 'Restricted flow of water from a roof drain, gutter, or downspout.',
      detail: 'Debris is limiting the ability of water to drain; water may not be present. Or an area of approximately 25 sq. ft. of ponding water is located above the drain.',
      criteria: 'The condition is not caused by recent rain.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'ROOF-OUT-02',
      codeReference: `📝 Step 1: Identify Roof Assembly Components
Focus on all visible and accessible roof-related elements:
• Roof covering (shingles, membrane, tile, metal)
• Flashing, fascia, soffits, and drip edges
• Gutters, downspouts, scuppers, and roof drains
• Roof-mounted equipment (vents, HVAC units, exhausts)
• Parapets, eaves, and structural edges

🧱 Step 2: Assess Structural Integrity
Inspect for damage, deterioration, or missing components:
Roof surface, Drainage system, Flashing & joints, Fascia/soffit, Standing water
• IRC – Roof Assemblies (§R901–R908)

🔧 Step 3: Evaluate Functional Performance
• Water flow test (if safe): Observe drainage during or after rain
• Ventilation check: Confirm roof vents are unobstructed and intact
• Seal integrity: Look for gaps around penetrations (e.g., exhaust pipes, HVAC mounts)

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Mold, algae, or pest nests on roof edges or under eaves
• Debris buildup in gutters or scuppers
• Water stains or efflorescence on walls below roofline
• IBU Overlay: May require pest-proof flashing, sealed joints, and moisture-resistant finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Roof access: Confirm safe access for maintenance (e.g., ladders, hatches)
• Fall protection: Guardrails or parapets required at accessible roof edges
• Signage: Required for rooftop equipment zones and restricted areas
• IBU Overlay: May require ADA-compliant access paths to rooftop amenities or service zones`
    },
    {
      id: 'roof_out_3',
      name: 'Roof assembly has a hole.',
      detail: 'Unintentional holes of any size are found. Or, intentional holes of any size are found and are not covered by vents or screens.',
      criteria: 'Not including the missing vent that had been installed and is now missing.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'ROOF-OUT-03',
      codeReference: `📝 Step 1: Identify Roof Assembly Components
Focus on all visible and accessible roof-related elements:
• Roof covering (shingles, membrane, tile, metal)
• Flashing, fascia, soffits, and drip edges
• Gutters, downspouts, scuppers, and roof drains
• Roof-mounted equipment (vents, HVAC units, exhausts)
• Parapets, eaves, and structural edges

🧱 Step 2: Assess Structural Integrity
Inspect for damage, deterioration, or missing components:
Roof surface, Drainage system, Flashing & joints, Fascia/soffit, Standing water
• IRC – Roof Assemblies (§R901–R908)

🔧 Step 3: Evaluate Functional Performance
• Water flow test (if safe): Observe drainage during or after rain
• Ventilation check: Confirm roof vents are unobstructed and intact
• Seal integrity: Look for gaps around penetrations (e.g., exhaust pipes, HVAC mounts)

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Mold, algae, or pest nests on roof edges or under eaves
• Debris buildup in gutters or scuppers
• Water stains or efflorescence on walls below roofline
• IBU Overlay: May require pest-proof flashing, sealed joints, and moisture-resistant finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Roof access: Confirm safe access for maintenance (e.g., ladders, hatches)
• Fall protection: Guardrails or parapets required at accessible roof edges
• Signage: Required for rooftop equipment zones and restricted areas
• IBU Overlay: May require ADA-compliant access paths to rooftop amenities or service zones`
    },
    {
      id: 'roof_out_4',
      name: 'Roof assembly is damaged.',
      detail: 'Roof assembly has damage (i.e., visibly defective; impacts functionality) present that causes one or more components to become unstable.',
      criteria: 'Any part of the roof assembly that is damaged may impact the functionality of other sections of roof.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'ROOF-OUT-04',
      codeReference: `📝 Step 1: Identify Roof Assembly Components
Focus on all visible and accessible roof-related elements:
• Roof covering (shingles, membrane, tile, metal)
• Flashing, fascia, soffits, and drip edges
• Gutters, downspouts, scuppers, and roof drains
• Roof-mounted equipment (vents, HVAC units, exhausts)
• Parapets, eaves, and structural edges

🧱 Step 2: Assess Structural Integrity
Inspect for damage, deterioration, or missing components:
Roof surface, Drainage system, Flashing & joints, Fascia/soffit, Standing water
• IRC – Roof Assemblies (§R901–R908)

🔧 Step 3: Evaluate Functional Performance
• Water flow test (if safe): Observe drainage during or after rain
• Ventilation check: Confirm roof vents are unobstructed and intact
• Seal integrity: Look for gaps around penetrations (e.g., exhaust pipes, HVAC mounts)

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Mold, algae, or pest nests on roof edges or under eaves
• Debris buildup in gutters or scuppers
• Water stains or efflorescence on walls below roofline
• IBU Overlay: May require pest-proof flashing, sealed joints, and moisture-resistant finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Roof access: Confirm safe access for maintenance (e.g., ladders, hatches)
• Fall protection: Guardrails or parapets required at accessible roof edges
• Signage: Required for rooftop equipment zones and restricted areas
• IBU Overlay: May require ADA-compliant access paths to rooftop amenities or service zones`
    },
    {
      id: 'roof_out_5',
      name: 'Roof surface has standing water.',
      detail: 'Water ponding in area approximately 25 sq. ft. or greater on a flat roof surface not near drain or scupper.',
      criteria: 'Condtion is not caused by recent rain.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'ROOF-OUT-05',
      codeReference: `📝 Step 1: Identify Roof Assembly Components
Focus on all visible and accessible roof-related elements:
• Roof covering (shingles, membrane, tile, metal)
• Flashing, fascia, soffits, and drip edges
• Gutters, downspouts, scuppers, and roof drains
• Roof-mounted equipment (vents, HVAC units, exhausts)
• Parapets, eaves, and structural edges

🧱 Step 2: Assess Structural Integrity
Inspect for damage, deterioration, or missing components:
Roof surface, Drainage system, Flashing & joints, Fascia/soffit, Standing water
• IRC – Roof Assemblies (§R901–R908)

🔧 Step 3: Evaluate Functional Performance
• Water flow test (if safe): Observe drainage during or after rain
• Ventilation check: Confirm roof vents are unobstructed and intact
• Seal integrity: Look for gaps around penetrations (e.g., exhaust pipes, HVAC mounts)

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Mold, algae, or pest nests on roof edges or under eaves
• Debris buildup in gutters or scuppers
• Water stains or efflorescence on walls below roofline
• IBU Overlay: May require pest-proof flashing, sealed joints, and moisture-resistant finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Roof access: Confirm safe access for maintenance (e.g., ladders, hatches)
• Fall protection: Guardrails or parapets required at accessible roof edges
• Signage: Required for rooftop equipment zones and restricted areas
• IBU Overlay: May require ADA-compliant access paths to rooftop amenities or service zones`
    },
    {
      id: 'roof_out_6',
      name: 'Substrate is exposed.',
      detail: 'Any amount of substrate is exposed.',
      criteria: 'Visually observed.',
      severity: 'Moderate',
      repairBy: '30 days',
      points: '4.5/n',
      code: 'ROOF-OUT-06',
      codeReference: `📝 Step 1: Identify Roof Assembly Components
Focus on all visible and accessible roof-related elements:
• Roof covering (shingles, membrane, tile, metal)
• Flashing, fascia, soffits, and drip edges
• Gutters, downspouts, scuppers, and roof drains
• Roof-mounted equipment (vents, HVAC units, exhausts)
• Parapets, eaves, and structural edges

🧱 Step 2: Assess Structural Integrity
Inspect for damage, deterioration, or missing components:
Roof surface, Drainage system, Flashing & joints, Fascia/soffit, Standing water
• IRC – Roof Assemblies (§R901–R908)

🔧 Step 3: Evaluate Functional Performance
• Water flow test (if safe): Observe drainage during or after rain
• Ventilation check: Confirm roof vents are unobstructed and intact
• Seal integrity: Look for gaps around penetrations (e.g., exhaust pipes, HVAC mounts)

🧼 Step 4: Check Sanitation & Environmental Safety
• Inspect for:
• Mold, algae, or pest nests on roof edges or under eaves
• Debris buildup in gutters or scuppers
• Water stains or efflorescence on walls below roofline
• IBU Overlay: May require pest-proof flashing, sealed joints, and moisture-resistant finishes

🧠 Step 5: Verify Accessibility & Local Compliance
• Roof access: Confirm safe access for maintenance (e.g., ladders, hatches)
• Fall protection: Guardrails or parapets required at accessible roof edges
• Signage: Required for rooftop equipment zones and restricted areas
• IBU Overlay: May require ADA-compliant access paths to rooftop amenities or service zones`
    }
  ]
};
"""

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if line.startswith('// 19. Railings'):
        start_idx = i
    elif line.startswith('// 21. Sidewalk, walkway, and ramp'):
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    lines = lines[:start_idx] + [new_content + '\n'] + lines[end_idx:]
    with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print('Successfully updated outsideAppData.ts')
else:
    print(f'Could not find indices: {start_idx}, {end_idx}')
