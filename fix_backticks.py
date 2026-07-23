import sys
import re

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the missing backticks
content = content.replace('codeReference: \\🔍', 'codeReference: `🔍')
content = content.replace('features    },', 'features`\n    },')
content = content.replace('finishes    },', 'finishes`\n    },')
content = content.replace('paths    },', 'paths`\n    },')
content = content.replace('routes    },', 'routes`\n    },')

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
