import sys
import re

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all \🔍 with `🔍
content = content.replace('codeReference: \\🔍', 'codeReference: `🔍')

# Replace all \📝 with `📝 (just in case)
content = content.replace('codeReference: \\📝', 'codeReference: `📝')

# We need to make sure the backticks are closed.
# The end of the codeReference block before the closing brace '}' should have a backtick.
# Look for 'features    },' and similar ones without backticks.
content = content.replace('features    },', 'features`\n    },')
content = content.replace('finishes    },', 'finishes`\n    },')
content = content.replace('paths    },', 'paths`\n    },')
content = content.replace('routes    },', 'routes`\n    },')

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
