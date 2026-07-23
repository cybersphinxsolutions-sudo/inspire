with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('codeReference: \\🔍', 'codeReference: `🔍')
content = content.replace('codeReference: \\📝', 'codeReference: `📝')

with open('c:/inspireweb/inspire-web/lib/outsideAppData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
