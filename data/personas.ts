import { Persona } from '@/utils/persona';

export const PERSONAS: Persona[] = [
    // --- BESTMED BEAT 1 (The Foundation) ---
    {
        slug: "bestmed-beat1-network-student-starter-2026",
        code: "BST_B1_NET_STU",
        meta: {
            title: "The Student Starter",
            description: "Ideal for students and young adults under 25. This plan leverages the network option to offer the most affordable private hospital cover for those with low hospitalization risk.",
            category: "Student"
        },
        defaults: {
            income: 12000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 22
        },
        search_profile: {
            network_tolerance: 'Network',
            min_savings_allocation: 0,
            chronic_needs: 'None',
            required_benefits: [],
            priority_tag: 'budget'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Optimizes the R254 monthly premium spread. For a healthy individual <25, the probability of needing a specific non-network specialist is negligible, making the R2,269 price point the 'Global Minimum' for private cover.",
            primary_risk_warning: "Out-of-hospital expenses are 100% self-funded. One GP visit will cost ~R500 out of pocket."
        }
    },
    {
        slug: "bestmed-beat1-standard-biologic-exile-2026",
        code: "BST_B1_STD_BIO",
        meta: {
            title: "The Biologic Exile",
            description: "Designed for individuals without autoimmune conditions. Defined by its low R12,144 annual limit for biological medicine, making it unsuitable for chronic biologic therapy.",
            category: "Chronic"
        },
        defaults: {
            income: 18000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 28
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 0,
            chronic_needs: 'Basic',
            required_benefits: [],
            priority_tag: 'budget'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Defined by the R12,144 Biological Medicine limit. A single course of biologics (e.g. Humira) exceeds this in two months. This plan is mathematically valid only for the 'Strictly Non-Autoimmune' user.",
            primary_risk_warning: "Biological medicine limit is insufficient for chronic biologic therapy. Do not select if you have autoimmune conditions."
        }
    },
    {
        slug: "bestmed-beat1-non-network-large-family-2026",
        code: "BST_B1_STD_FAM",
        meta: {
            title: "The Large Family Bootstrapper",
            description: "Leverages the Bestmed 3-child cap to provide affordable hospital cover for large families. Offers a low per-person cost by covering additional children at no extra charge.",
            category: "Family"
        },
        defaults: {
            income: 35000,
            family_composition: { main: 1, adult: 1, child: 4 },
            age: 40
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 0,
            chronic_needs: 'None',
            required_benefits: [],
            priority_tag: 'family'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Exploits the 3-Child Cap. A family with 4 children pays for 3, achieving hospital cover for 6 people at ~R1,277 per head—a highly efficient ratio for large families.",
            primary_risk_warning: "Zero day-to-day cover means a sick family could face crippling pharmacy bills in winter."
        }
    },

    // --- BESTMED BEAT 2 (The Savings Buffer) ---
    {
        slug: "bestmed-beat2-network-savings-tactician-2026",
        code: "BST_B2_NET_SAV",
        meta: {
            title: "The Savings Buffer Tactician",
            description: "Perfect for those needing a day-to-day buffer. Optimizes the R5,328 annual savings for occasional GP visits, avoiding the out-of-pocket costs of a pure hospital plan.",
            category: "Savings"
        },
        defaults: {
            income: 25000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 30
        },
        search_profile: {
            network_tolerance: 'Network',
            min_savings_allocation: 400,
            chronic_needs: 'Basic',
            required_benefits: ['savings'],
            priority_tag: 'savings'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Optimizes the utility of the R5,328 annual savings. Best for those healthy enough not to exhaust it quickly but requiring enough care to make Beat 1 untenable.",
            primary_risk_warning: "Once the R5,328 savings are depleted, you have zero day-to-day cover until Jan 1st."
        }
    },
    {
        slug: "bestmed-beat2-standard-dental-preserver-2026",
        code: "BST_B2_STD_DENT",
        meta: {
            title: "The Dental Preserver",
            description: "Maximizes preventative dentistry benefits. Features twice-yearly scaling and polishing paid from scheme benefits, offering value for families prioritizing dental health.",
            category: "Family"
        },
        defaults: {
            income: 45000,
            family_composition: { main: 1, adult: 1, child: 2 },
            age: 35
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 400,
            chronic_needs: 'Basic',
            required_benefits: ['dentistry'],
            priority_tag: 'family'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Beat 2 offers Preventative Dentistry paid from risk. Unlike Beat 1 (where this is out-of-pocket ~R1,400), this is a structured benefit creating significant family value.",
            primary_risk_warning: "Specialised dentistry (crowns, bridges) will decimate the savings account instantly."
        }
    },
    {
        slug: "bestmed-beat2-network-ortho-risk-2026",
        code: "BST_B2_NET_ORTH",
        meta: {
            title: "The Orthopaedic Risk Exile",
            description: "Strictly for members under 50 without joint issues. The plan's hard exclusion on elective joint replacement makes it a catastrophic risk for older individuals.",
            category: "Chronic"
        },
        defaults: {
            income: 30000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 28
        },
        search_profile: {
            network_tolerance: 'Network',
            min_savings_allocation: 400,
            chronic_needs: 'None',
            required_benefits: [],
            priority_tag: 'budget'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Defined by the hard exclusion for elective joint replacement. Since private knee replacement costs ~R180,000, this plan is mathematically invalid for anyone with deteriorating joints.",
            primary_risk_warning: "NO BENEFIT for elective joint replacements. Do not join if you anticipate hip or knee surgery."
        }
    },

    // --- BESTMED BEAT 3 (The Family Pivot) ---
    {
        slug: "bestmed-beat3-network-maternity-planner-2026",
        code: "BST_B3_NET_MAT",
        meta: {
            title: "The Maternity Planner",
            description: "Essential for expectant families. Preserves the savings account by funding comprehensive maternity care from scheme risk, keeping funds available for the baby.",
            category: "Maternity"
        },
        defaults: {
            income: 55000,
            family_composition: { main: 1, adult: 1, child: 0 },
            age: 29
        },
        search_profile: {
            network_tolerance: 'Network',
            min_savings_allocation: 600,
            chronic_needs: 'Basic',
            required_benefits: ['maternity'],
            priority_tag: 'maternity'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Beat 3's Maternity Benefit is funded by Scheme Risk. On Beat 2, pregnancy bankrupts savings; on Beat 3, savings remain intact for the infant. Users intending to conceive must migrate here.",
            primary_risk_warning: "Maternity supplements limited to R145/month; expect out-of-pocket costs for premium vitamins."
        }
    },
    {
        slug: "bestmed-beat3-standard-chronic-climber-2026",
        code: "BST_B3_STD_CHR",
        meta: {
            title: "The Chronic Climber",
            description: "For families managing non-CDL chronic conditions like ADHD. Offers a risk-subsidized benefit of R4,358 for medications not covered on lower tiers.",
            category: "Chronic"
        },
        defaults: {
            income: 60000,
            family_composition: { main: 1, adult: 1, child: 1 },
            age: 38
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 600,
            chronic_needs: 'Comprehensive',
            required_benefits: ['chronic'],
            priority_tag: 'chronic'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Offers a Non-CDL Benefit for 5 conditions (e.g. ADHD) limited to R4,358. For a family with a child needing ADHD meds, this subsidizes a significant portion of the annual cost.",
            primary_risk_warning: "Non-CDL limit (R4,358) covers only ~5 months of branded ADHD medication. Co-payments apply thereafter."
        }
    },

    // --- BESTMED BEAT 3 PLUS (The Cash Flow King) ---
    {
        slug: "bestmed-beat3-plus-discretionary-spender-2026",
        code: "BST_B3P_DISC",
        meta: {
            title: "The Discretionary Spender",
            description: "Ideal for high-utilization users. Offers a superior savings ratio, effectively allowing members to buy R1.10 of savings for every R1.00 of premium increase.",
            category: "Savings"
        },
        defaults: {
            income: 70000,
            family_composition: { main: 1, adult: 1, child: 2 },
            age: 45
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 1200,
            chronic_needs: 'Basic',
            required_benefits: ['savings'],
            priority_tag: 'savings'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-plus-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Principal Annual Savings is R15,132 vs Beat 3's R8,124. You pay R528 more per month to get R584 more in savings—a positive expected value arbitrage for high utilizers.",
            primary_risk_warning: "High total monthly cost (R5,042) requires liquidity; value is lost if savings are not utilized."
        }
    },
    {
        slug: "bestmed-beat3-plus-optical-cyclist-2026",
        code: "BST_B3P_OPT",
        meta: {
            title: "The Optical Cyclist",
            description: "Tailored for regular eyewear updates. Insulates users from high optical costs by providing a specific optometry benefit that refreshes every 24 months.",
            category: "Savings"
        },
        defaults: {
            income: 65000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 33
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 1200,
            chronic_needs: 'Basic',
            required_benefits: ['optometry'],
            priority_tag: 'savings'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-plus-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Includes a specific Optometry Benefit (R990 frame + 100% lens cost) refreshing every 24 months. Insulates users with myopia from this cost eating their savings.",
            primary_risk_warning: "Benefit available only every 24 months. Timing of claims is critical."
        }
    },

    // --- BESTMED BEAT 4 (The Safety Net) ---
    {
        slug: "bestmed-beat4-senior-joint-replacer-2026",
        code: "BST_B4_SNR_JOINT",
        meta: {
            title: "The Senior Joint Replacer",
            description: "The only plan in the series covering elective joint replacement. Designed for the 55+ demographic to cover major surgeries like hip or knee replacements.",
            category: "Senior"
        },
        defaults: {
            income: 85000,
            family_composition: { main: 1, adult: 1, child: 0 },
            age: 62
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 1000,
            chronic_needs: 'Comprehensive',
            required_benefits: ['joint_replacement'],
            priority_tag: 'comprehensive'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Beat 4 is the only plan covering elective Joint Replacement. On lower plans, this is a R180k self-payment. The premium is justified if major surgery probability > 15%.",
            primary_risk_warning: "Even with cover, the R58,086 sub-limit for knees may leave a co-payment if using premium prostheses."
        }
    },
    {
        slug: "bestmed-beat4-biologic-user-2026",
        code: "BST_B4_BIO",
        meta: {
            title: "The High-Cost Biologic User",
            description: "For conditions like Rheumatoid Arthritis. Offers a R30,357 limit for biologicals, providing a bridge for intermittent or lower-cost biosimilar therapies.",
            category: "Chronic"
        },
        defaults: {
            income: 90000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 45
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 1000,
            chronic_needs: 'Specialized',
            required_benefits: ['biologics'],
            priority_tag: 'chronic'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Biological Medicine limit increases to R30,357 (vs R12k on Beat 1). While low for full-year therapy, it provides a 'Bridge' for lower-cost biosimilars, making the plan viable.",
            primary_risk_warning: "R30,357 limit is a hard cap. Once depleted, biologics are self-funded or subject to PMB restrictions."
        }
    },
    {
        slug: "bestmed-beat4-complex-chronic-2026",
        code: "BST_B4_CMPLX",
        meta: {
            title: "The Comprehensive Chronic Manager",
            description: "Crucial for conditions like Major Depression or GORD. Provides risk funding (R9,571 limit) for 9 Non-CDL conditions excluded on lower tiers.",
            category: "Chronic"
        },
        defaults: {
            income: 75000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 38
        },
        search_profile: {
            network_tolerance: 'Any',
            min_savings_allocation: 1000,
            chronic_needs: 'Specialized',
            required_benefits: ['chronic'],
            priority_tag: 'chronic'
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Coverage for 9 Non-CDL conditions (e.g. Major Depression) with a R9,571 limit. Users needing chronic SSRIs must be routed to Beat 4 to access this risk funding.",
            primary_risk_warning: "20% co-payment applies to non-formulary chronic medicine. Strict adherence to drug list required."
        }
    }
];