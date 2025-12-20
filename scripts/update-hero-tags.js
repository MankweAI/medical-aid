// Script to update hero_image_tag for each persona based on hierarchical mapping logic
const fs = require('fs');

// Read the personas file
const content = fs.readFileSync('b:\\medical-aid\\data\\personas.ts', 'utf8');

const lines = content.split('\r\n');
let currentPersona = null;
let personaData = [];

// Extract key data for each persona
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('slug:')) {
        const slugMatch = line.match(/slug:\s*"([^"]+)"/);
        if (slugMatch) {
            // Save previous persona if exists
            if (currentPersona) {
                personaData.push(currentPersona);
            }
            currentPersona = {
                slug: slugMatch[1],
                lineNumber: i + 1,
                fields: { hasMaternity: false }
            };
        }
    }

    if (currentPersona) {
        // Extract key fields for mapping logic
        if (line.includes('strategic_intent:')) {
            const match = line.match(/strategic_intent:\s*"([^"]+)"/);
            if (match) currentPersona.fields.strategic_intent = match[1];
        }
        if (line.includes('category:')) {
            const match = line.match(/category:\s*"([^"]+)"/);
            if (match) currentPersona.fields.category = match[1];
        }
        if (line.includes('priority_tag:')) {
            const match = line.match(/priority_tag:\s*"([^"]+)"/);
            if (match) currentPersona.fields.priority_tag = match[1];
        }
        if (line.includes('chronic_needs:')) {
            const match = line.match(/chronic_needs:\s*"([^"]+)"/);
            if (match) currentPersona.fields.chronic_needs = match[1];
        }
        if (line.includes('hero_image_tag:')) {
            currentPersona.fields.hero_image_tag_line = i;
        }
        // Extract age
        if (line.match(/^\s*age:\s*\d+/)) {
            const match = line.match(/age:\s*(\d+)/);
            if (match) currentPersona.fields.age = parseInt(match[1]);
        }
        // Extract child count
        if (line.match(/^\s*child:\s*\d+/)) {
            const match = line.match(/child:\s*(\d+)/);
            if (match) currentPersona.fields.child = parseInt(match[1]);
        }
        // Extract adult count
        if (line.match(/^\s*adult:\s*\d+/)) {
            const match = line.match(/adult:\s*(\d+)/);
            if (match) currentPersona.fields.adult = parseInt(match[1]);
        }
        // Check for maternity in required_benefits
        if (line.toLowerCase().includes('maternity') && !line.includes('hero_image_tag')) {
            currentPersona.fields.hasMaternity = true;
        }
    }
}
// Don't forget the last persona
if (currentPersona) {
    personaData.push(currentPersona);
}

// Mapping function based on the hierarchical logic
function getHeroImageTag(persona) {
    const f = persona.fields;
    const slug = persona.slug;
    const intent = f.strategic_intent || '';
    const category = f.category || '';
    const chronics = f.chronic_needs || '';
    const priority = f.priority_tag || '';
    const age = f.age || 0;
    const child = f.child || 0;
    const adult = f.adult || 0;
    const hasMaternity = f.hasMaternity || false;

    // 1. Maternity Priority - If search_profile.required_benefits includes "maternity" or strategic_intent is Maternity_Risk_Transfer
    if (hasMaternity ||
        intent === 'Maternity_Risk_Transfer' ||
        intent.includes('Maternity') ||
        priority === 'maternity' ||
        slug.toLowerCase().includes('maternity')) {
        return 'maternity-advanced-family-growth';
    }

    // 2. Oncology Priority - If strategic_intent includes "Oncology" or "Cancer"
    if (intent.toLowerCase().includes('oncology') ||
        intent.toLowerCase().includes('cancer') ||
        category.toLowerCase().includes('oncology') ||
        priority === 'oncology' ||
        priority === 'cancer' ||
        slug.toLowerCase().includes('oncology') ||
        slug.toLowerCase().includes('cancer')) {
        return 'oncology-transfer-critical-care';
    }

    // 3. Chronic/Clinical Priority - If chronic_needs is "Specialized" or "Comprehensive", or category is "Chronic"
    if (chronics === 'Specialized' ||
        chronics === 'Comprehensive' ||
        category === 'Chronic' ||
        category.toLowerCase().includes('chronic disease') ||
        intent.includes('Multi_Chronic') ||
        intent.includes('Maximum_Biological') ||
        intent === 'Biologic_Bridge_Funding' ||
        chronics.includes('Type 1 Diabetes') ||
        chronics.includes('Active Cancer') ||
        intent.includes('High_Cost_Technology') ||
        intent.includes('Complex_Clinical') ||
        intent.includes('Extended_Chronic')) {
        return 'chronic-management-senior-diabetes';
    }

    // 4. Senior/Surgical Priority - If defaults.age > 60 or strategic_intent mentions "Joint" or "Age_Optimized"
    if (age > 60 ||
        intent.includes('Joint') ||
        intent.includes('Age_Optimized') ||
        intent.includes('High_Cost_Surgical') ||
        slug.toLowerCase().includes('senior-joint') ||
        (slug.toLowerCase().includes('senior') && !slug.includes('maternity'))) {
        return 'senior-surgical-joint-replacement';
    }

    // 5. Executive Priority - If category is "Comprehensive" or strategic_intent mentions "Executive", "Liquidity", or "Control"
    if (category === 'Comprehensive' ||
        category === 'Premium' ||
        category.toLowerCase().includes('comprehensive') ||
        intent.includes('Executive') ||
        intent.includes('Liquidity') ||
        intent.includes('Control') ||
        intent.includes('High_Risk_Transfer') ||
        intent.includes('Max_Risk_Transfer') ||
        intent.includes('Global_Risk_Transfer') ||
        priority === 'comprehensive' ||
        priority === 'premium' ||
        priority === 'heavy_user' ||
        priority === 'dental_allied') {
        return 'comprehensive-executive-high-liquidity';
    }

    // 6. Disaster/Minimalist Priority - If strategic_intent is Disaster_Cover_Only
    if (intent === 'Disaster_Cover_Only' ||
        intent.includes('Disaster') ||
        intent.includes('Extreme_Cost_Constraint') ||
        category.toLowerCase().includes('disaster') ||
        category.toLowerCase().includes('catastrophic')) {
        return 'disaster-cover-professional-minimalist';
    }

    // 7. Family Priority - If priority_tag is "family" or family_composition.child > 0
    if (priority === 'family' ||
        child > 0 ||
        intent.includes('Family_Cost') ||
        intent.includes('Family_Disaster') ||
        slug.toLowerCase().includes('family') ||
        category.toLowerCase().includes('family')) {
        return 'family-budget-starter-essentials';
    }

    // 8. Young Professional Priority - If category is "Hospital" or "Savings" and the user is a main member only
    if ((category.toLowerCase().includes('hospital') ||
        category.toLowerCase().includes('savings') ||
        category.toLowerCase().includes('network') ||
        category.toLowerCase().includes('msa') ||
        intent.includes('MSA') ||
        intent.includes('Network') ||
        intent.includes('Liquidity_Buffer') ||
        priority === 'savings' ||
        priority === 'budget') &&
        child === 0 && adult === 0) {
        return 'hospital-saver-young-adult-active';
    }

    // 9. Fallback
    return 'default-medical';
}

// Apply the mappings to update the file content
let updatedLines = [...lines];
let changesCount = 0;

for (const persona of personaData) {
    const newTag = getHeroImageTag(persona);
    const lineIndex = persona.fields.hero_image_tag_line;

    if (lineIndex !== undefined) {
        const originalLine = updatedLines[lineIndex];
        const updatedLine = originalLine.replace(/hero_image_tag:\s*"[^"]+"/, `hero_image_tag: "${newTag}"`);
        if (originalLine !== updatedLine) {
            updatedLines[lineIndex] = updatedLine;
            changesCount++;
            console.log(`Updated: ${persona.slug.substring(0, 40)}... -> ${newTag}`);
        }
    }
}

// Write the updated content back
fs.writeFileSync('b:\\medical-aid\\data\\personas.ts', updatedLines.join('\r\n'), 'utf8');

console.log(`\nTotal changes made: ${changesCount}`);
