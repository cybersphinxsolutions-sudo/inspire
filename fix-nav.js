const fs = require('fs');

const files = [
  'app/inspection-services/commercial/CommercialClient.tsx',
  'app/inspection-services/insurance-risk/InsuranceRiskClient.tsx',
  'app/inspection-services/owners/OwnersClient.tsx',
  'app/inspection-services/public-housing/PublicHousingClient.tsx',
  'app/inspection-services/rental/RentalClient.tsx',
  'app/inspection-services/sellers/SellersClient.tsx',
  'app/inspection-services/specialized/SpecializedClient.tsx',
  'app/inspection-services/InspectionServicesClient.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');

    const navStart = '<nav className="bg-[#E8F4F8] px-4 md:px-6 py-3 md:py-4">';
    const navEnd = '</nav>';
    
    // We already have a functioning nav we can copy directly from BuyersClient.tsx
    const buyersContent = fs.readFileSync('app/inspection-services/buyers/BuyersClient.tsx', 'utf8');
    const bStart = buyersContent.indexOf(navStart);
    const bEnd = buyersContent.indexOf(navEnd) + navEnd.length;
    
    const correctNav = buyersContent.substring(bStart, bEnd);
    
    const startIdx = content.indexOf(navStart);
    const endIdx = content.indexOf(navEnd) + navEnd.length;
    
    if (startIdx !== -1 && endIdx > startIdx) {
      content = content.substring(0, startIdx) + correctNav + content.substring(endIdx);
      fs.writeFileSync(f, content);
      console.log('Copied nav from BuyersClient to ' + f);
    }
  }
});
