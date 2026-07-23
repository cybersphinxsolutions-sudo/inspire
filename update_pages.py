import os
import re

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original_content = content
    for target, replacement in replacements:
        if callable(target):
            content = target(content)
        else:
            if target not in content:
                print(f"Warning: target string not found in {filepath}: {target[:50]}...")
            content = content.replace(target, replacement)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes in {filepath}")

base = '/home/ali/Downloads/inspire/inspire-web-main/app'

# 1. About
replace_in_file(f'{base}/about/AboutClient.tsx', [
    ('across the USA designed to', 'across the Nation designed to')
])

# 2. Home Page
public_text = "NSPIREinspection.AI provides professional Public and affordable Housing Inspection nationwide, helping housing authorities, property managers, and multifamily communities maintain federal compliance and safe living conditions. Our team specializes in Real Estate Assessment inspection, ensuring every property meets federal housing standards, requirements, and energy and safety regulations. From apartment communities to large public or affordable housing developments, Inspire ensures compliance inspections are thorough, timely, and precise. We focus on identifying deficiencies, supporting risk management, and improving HUD REAC scores, providing a comprehensive solution for all public housing inspection needs while streamlining documentation and reporting for PHAs."
replace_in_file(f'{base}/page.tsx', [
    ('Start inspection with our certified professionals.', 'Start inspection'),
    ('NSPIREinspection.AI provides professional Public and affordable Housing Inspection nationwide...', public_text)
])

# 3. All Services
replace_in_file(f'{base}/inspection-services/InspectionServicesClient.tsx', [
    ('Professional Inspections</p>', 'Nationwide Solutions</p>'),
    ('From first-time homebuyers to large commercial portfolios, our certified inspectors deliver comprehensive, technology-driven assessments you can trust.', 'NSPIREinspectiom.AI provides professional Inspection Services nationwide, delivering end-to-end solutions for buyers, owners, sellers, landlords, investors, and public housing authorities.\n            </p>\n            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mt-4">\n              From single-family homes to multi-unit commercial buildings, Inspire combines structural, mechanical, electrical, and safety evaluations into a single trusted framework. We support purchase decisions, risk management, compliance verification, and long-term asset planning through data-driven inspections.')
])

# Function to replace the main hero text in a ServiceClient
def replace_service_hero(filepath, new_title, new_text):
    def replacer(content):
        # find the <p className="text-white/80 ..."> ... </p> in the hero
        pattern = r'(<p className="text-white/80[^>]*>)(.*?)(</p>)'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            content = content[:match.start(2)] + "\n              " + new_text + "\n            " + content[match.end(2):]
        else:
            print(f"Could not find hero text in {filepath}")
        
        if new_title:
            # find <p className="text-[#006795] font-bold uppercase ...">Expert Inspection Services</p>
            title_pattern = r'(<p className="text-\[#006795\] font-bold uppercase[^>]*>)(.*?)(</p>)'
            title_match = re.search(title_pattern, content, re.DOTALL)
            if title_match:
                content = content[:title_match.start(2)] + new_title + content[title_match.end(2):]
            else:
                print(f"Could not find top title in {filepath}")
        
        return content
    replace_in_file(filepath, [(replacer, None)])


# 4. Buyers
buyer_text = "At NSPIREinspection.AI, we provide Buyer's Inspection Services nationwide to help homebuyers and investors make informed decisions before purchasing any property. Our expert inspectors conduct thorough evaluations for single-family homes, multi-unit residential buildings, condominiums, and commercial properties. Using advanced techniques, we identify structural, mechanical, and electrical issues, estimate repair costs, and highlight potential hazards. From pre-buy inspections to full property condition assessments, our services provide peace of mind and support informed negotiation. Trust Inspire to protect your investment and simplify your multi-family home-buying experience with professional, reliable, and comprehensive inspection solutions."
replace_service_hero(f'{base}/inspection-services/buyers/BuyersClient.tsx', None, buyer_text)

# 5. Commercial
commercial_title = "Business Properties Nationwide"
commercial_text = "At NSPIREinspection.AI, we provide top-tier commercial buildings multi-unit, mixed-use inspection services nationwide, helping businesses, property managers, and industrial facility owners ensure the safety, functionality, and compliance of their properties. Our expert inspectors specialize in commercial, industrial, and retail inspections, covering warehouses, office buildings, and shopping centers. From structural integrity assessments to safety and code compliance checks, our services are tailored to address every property concern. By combining advanced inspection technology with decades of experience, we help clients avoid costly repairs, maintain operational efficiency, and comply with local regulations, making us a trusted choice for commercial property owners nationwide."
replace_service_hero(f'{base}/inspection-services/commercial/CommercialClient.tsx', commercial_title, commercial_text)

# 6. Insurance Risk
insurance_title = "Protect Your Assets"
insurance_text = "At NSPIREinspection.AI, we provide comprehensive Insurance Risk Management Services nationwide, designed to protect residential, commercial, and enterprise properties from potential hazards, structural risks, and insurance liabilities. Our expert team combines advanced inspection techniques, risk assessment methodologies, and compliance audits to ensure your property and business remain secure. We focus on proactive risk mitigation, evaluating property structures, electrical systems, and liability exposures while aligning with insurance requirements. By integrating both traditional and AI-driven analysis, Inspire helps businesses and homeowners anticipate risks, reduce premiums, and prevent claims, ensuring peace of mind through strategic risk management solutions."
replace_service_hero(f'{base}/inspection-services/insurance-risk/InsuranceRiskClient.tsx', insurance_title, insurance_text)

# 7. Owners
owners_title = "Maintain & Protect Your Investment"
owners_text = "NSPIREinspection.AI offers comprehensive Owners Inspection Services across the USA, designed to provide property owners, landlords, and multi-unit managers with precise evaluations of their real estate assets. Our services include annual home inspections for owners, multi-family property assessments, renovation inspections, and insurance risk evaluations to ensure your properties remain in peak condition. By leveraging advanced inspection technologies, our expert team identifies structural, maintenance, and safety concerns before they become costly problems. Whether you own a single-family home, an apartment building, or a condominium, Inspire delivers actionable insights that protect your investment, optimize property health, and ensure long-term tenant satisfaction."
replace_service_hero(f'{base}/inspection-services/owners/OwnersClient.tsx', owners_title, owners_text)

# 8. Public Housing
public_title = "Government Housing Compliance"
public_text = "NSPIREinspection.AI provides professional Public and affordable Housing Inspection nationwide, helping housing authorities, property managers, and multifamily communities maintain federal compliance and safe living conditions. Our team specializes in Real Estate Assessment inspection, ensuring every property meets federal housing standards, requirements, and energy and safety regulations. From apartment communities to large public or affordable housing developments, Inspire ensures compliance inspections are thorough, timely, and precise. We focus on identifying deficiencies, supporting risk management, and improving HUD REAC scores, providing a comprehensive solution for all public housing inspection needs while streamlining documentation and reporting for PHAs."
replace_service_hero(f'{base}/inspection-services/public-housing/PublicHousingClient.tsx', public_title, public_text)

# 9. Rental
rental_title = "Safety, Compliance & Satisfaction"
rental_text = "NSPIREinspection..AI offers comprehensive Rental Property Inspection Services nationwide, designed to assist landlords, property managers, and tenants in maintaining safe, habitable, and compliant rental properties. Our services focus on every stage of the rental lifecycle, including move-in, move-out, and annual inspections. Using advanced tools and Inspire Compliance Software, we provide detailed tenant documentation, tenant damage reports, and multi-unit inspection reports. Our goal is to protect landlords from liability, ensure tenant safety, and maintain property standards. From commercial rental inspections to multi-family units, Napier’s inspection services ensure legal compliance, proper record keeping, and long-term property value retention."
replace_service_hero(f'{base}/inspection-services/rental/RentalClient.tsx', rental_title, rental_text)

# 10. Sellers
sellers_title = None
sellers_text = "At NSPIREinspection.AI, we provide comprehensive Sellers Inspection Services nationwide, ensuring property owners, multi-unit landlords, and real estate sellers gain accurate insights before listing their properties. Our services include pre-sale home inspections, REAC(Real Estate Assessment Center) inspection preparation, property readiness evaluations, and seller transparency reports, helping clients reduce negotiation risks and enhance property marketability. By leveraging our experience and compliance expertise, sellers can confidently present their homes to buyers with detailed reports, actionable recommendations, and pricing advantage strategies. Whether it’s a single-family home or a multi-unit property, Inspire delivers thorough inspections tailored to each seller’s needs."
replace_service_hero(f'{base}/inspection-services/sellers/SellersClient.tsx', sellers_title, sellers_text)

# 11. Specialized
specialized_title = "Advanced Assessments"
specialized_text = "At NSPIREinspection.AI, we provide comprehensive Special Inspection Services nationwide, designed to address every residential, commercial, and specialized property need. Our expert team uses advanced and updated software to inspect pool and spa safety evaluations, roof inspections, and foundation assessments to detect potential issues before they escalate. Whether it’s a luxury home, multi-unit building, historic property, or commercial establishment, our services ensure safety, regulatory compliance, and peace of mind. With our qulified inspectors, you receive detailed reports, actionable recommendations, and trustworthy guidance to maintain your property’s integrity and value."
replace_service_hero(f'{base}/inspection-services/specialized/SpecializedClient.tsx', specialized_title, specialized_text)

