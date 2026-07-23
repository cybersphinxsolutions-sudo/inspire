import sys
import re

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace `codeReference: \🔍` (any whitespace) with `codeReference: \`🔍`
content = re.sub(r'codeReference:\s*\\(🔍|📝)', r'codeReference: `\1', content)

# Check if there are still any `codeReference: \` and fix them
content = re.sub(r'codeReference:\s*\\', r'codeReference: `', content)

# Also fix the closing backticks if they are missing
# For item 24 Retaining wall:
content = re.sub(r'features\s+},\n', 'features`\n    },\n', content)
# Ensure we don't double add them
content = re.sub(r'features`\s*`\s*\n', 'features`\n', content)

content = re.sub(r'finishes\s+},\n', 'finishes`\n    },\n', content)
content = re.sub(r'finishes`\s*`\s*\n', 'finishes`\n', content)

content = re.sub(r'paths\s+},\n', 'paths`\n    },\n', content)
content = re.sub(r'paths`\s*`\s*\n', 'paths`\n', content)

content = re.sub(r'routes\s+},\n', 'routes`\n    },\n', content)
content = re.sub(r'routes`\s*`\s*\n', 'routes`\n', content)

# Ensure Water heater is also fixed if affected
content = re.sub(r'equipment\s+},\n', 'equipment`\n    },\n', content)
content = re.sub(r'equipment`\s*`\s*\n', 'equipment`\n', content)

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Formatting applied.")
