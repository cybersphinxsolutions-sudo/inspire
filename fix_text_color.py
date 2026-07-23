import os
import re

def fix_text_color(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to find bg-[#006795] with dark text
        patterns = [
            (r'bg-\[#006795\].*?text-gray-900', 'text-white'),
            (r'bg-\[#006795\].*?text-black', 'text-white'),
            (r'text-gray-900.*?bg-\[#006795\]', 'text-white'),
            (r'text-black.*?bg-\[#006795\]', 'text-white'),
        ]
        
        new_content = content
        for pattern, replacement in patterns:
            # This is a bit naive because it might match too much. 
            # But since these are usually in className strings, it should be okay if we are careful.
            # Let's use a more targeted regex for classNames.
            new_content = re.sub(r'(className="[^"]*?)\b(text-(?:gray-900|black))\b([^"]*?bg-\[#006795\])', r'\1text-white\3', new_content)
            new_content = re.sub(r'(className="[^"]*?bg-\[#006795\][^"]*?)\b(text-(?:gray-900|black))\b', r'\1text-white', new_content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed text color in {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    base_path = r'c:\inspireweb\inspire-web'
    for root, dirs, files in os.walk(os.path.join(base_path, 'app')):
        for file in files:
            if file.endswith('.tsx'):
                fix_text_color(os.path.join(root, file))
    for root, dirs, files in os.walk(os.path.join(base_path, 'components')):
        for file in files:
            if file.endswith('.tsx'):
                fix_text_color(os.path.join(root, file))

if __name__ == "__main__":
    main()
