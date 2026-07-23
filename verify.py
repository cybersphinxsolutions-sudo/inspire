import os
import re

base = '/home/ali/Downloads/inspire/inspire-web-main/app/inspection-services'
files = [
    'commercial/CommercialClient.tsx',
    'insurance-risk/InsuranceRiskClient.tsx',
    'owners/OwnersClient.tsx',
    'public-housing/PublicHousingClient.tsx',
    'rental/RentalClient.tsx',
    'sellers/SellersClient.tsx',
    'specialized/SpecializedClient.tsx',
    'buyers/BuyersClient.tsx'
]

for f in files:
    path = os.path.join(base, f)
    with open(path, 'r') as file:
        content = file.read()
        
        # Extract title
        title_match = re.search(r'<p className="[^"]*uppercase[^"]*">(.*?)</p>', content)
        title = title_match.group(1) if title_match else "None"
        
        # Extract hero text
        hero_match = re.search(r'<p className="text-white/80[^>]*>\s*(.*?)\s*</p>', content, re.DOTALL)
        hero = hero_match.group(1) if hero_match else "None"
        
        print(f"=== {f} ===")
        print(f"Title: {title}")
        print(f"Hero start: {hero[:100]}...")
        print()

