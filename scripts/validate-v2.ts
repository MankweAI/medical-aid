/**
 * V2 Link Validation Script
 * 
 * This script validates that every persona in data/personas.ts has a corresponding
 * V2 redirect entry in the slug mapping. This ensures 100% redirect coverage
 * for SEO protection of indexed pages.
 * 
 * Usage:
 *   npm run validate-links
 *   npx tsx scripts/validate-v2.ts
 * 
 * Exit Codes:
 *   0 - All personas have valid V2 redirects
 *   1 - Missing redirects detected (fails CI/build)
 */

import { PERSONAS } from '../data/personas-backup';
import { V1_TO_V2_SLUG_MAP } from '../utils/slug-utils';

interface ValidationResult {
    slug: string;
    title: string;
    hasV2Redirect: boolean;
    v2Slug: string | null;
}

function validatePersonaRedirects(): void {
    console.log('\n🔍 V2 Link Validation Script');
    console.log('═'.repeat(50));
    console.log(`\n📊 Checking ${PERSONAS.length} personas for V2 redirect coverage...\n`);

    const results: ValidationResult[] = [];
    const missingRedirects: ValidationResult[] = [];

    for (const persona of PERSONAS) {
        const v2Slug = V1_TO_V2_SLUG_MAP[persona.slug];
        const hasV2Redirect = !!v2Slug;

        const result: ValidationResult = {
            slug: persona.slug,
            title: persona.meta.title,
            hasV2Redirect,
            v2Slug: v2Slug || null
        };

        results.push(result);

        if (!hasV2Redirect) {
            missingRedirects.push(result);
        }
    }

    // Report Results
    const passCount = results.filter(r => r.hasV2Redirect).length;
    const failCount = missingRedirects.length;

    console.log('📈 Results Summary');
    console.log('─'.repeat(50));
    console.log(`   ✅ Personas with V2 redirect: ${passCount}`);
    console.log(`   ❌ Personas missing V2 redirect: ${failCount}`);
    console.log('');

    if (missingRedirects.length > 0) {
        console.log('🚨 MISSING V2 REDIRECTS:');
        console.log('─'.repeat(50));

        for (const missing of missingRedirects) {
            console.log(`\n   ❌ ${missing.title}`);
            console.log(`      V1 Slug: ${missing.slug}`);
            console.log(`      Action: Add entry to V1_TO_V2_SLUG_MAP in utils/slug-utils.ts`);
            console.log(`              AND add redirect to next.config.ts`);
        }

        console.log('\n' + '═'.repeat(50));
        console.log('❌ BUILD FAILED: Missing V2 redirects detected');
        console.log('═'.repeat(50));
        console.log('\n⚠️  SEO Impact: 60+ indexed pages could return 404 errors.');
        console.log('   Fix the above issues before deploying.\n');

        process.exit(1);
    }

    // All passed
    console.log('═'.repeat(50));
    console.log('✅ BUILD PASSED: All personas have V2 redirects');
    console.log('═'.repeat(50));
    console.log(`\n🎉 ${passCount}/${PERSONAS.length} personas validated successfully.\n`);

    process.exit(0);
}

// Run validation
validatePersonaRedirects();
