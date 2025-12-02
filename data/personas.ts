import { Persona } from '@/types/schema';

export const PERSONA_DB: Persona[] = [
    // =========================================================================
    // 1. DISCOVERY HEALTH (10 Personas)
    // =========================================================================
    {
        slug: 'keycare-plus-band-breacher-2026',
        code: 'DHMS_KC_002',
        title: 'KeyCare Plus Band Breacher',
        intent: 'Manage verified income to stay below R10,250 cliff.',
        target_plan_id: 'dhms-keycare-plus-2026',
        mathematical_basis: 'Income R10,251 triggers 37% premium spike.',
        primary_risk: 'Marginal extra income triggers a discrete jump in contributions.',
        default_income: 10300,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'classic-smart-network-loyalist-2026',
        code: 'DHMS_SM_033',
        title: 'The Smart Network Loyalist',
        intent: 'Mitigate specialist shortfall risk while accepting hospital network.',
        target_plan_id: 'dhms-classic-smart-2026',
        mathematical_basis: '200% Specialist cover vs Essential 100% cover.',
        primary_risk: 'R12,650 penalty for using non-Smart hospital.',
        default_income: 35000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'active-smart-gambler-2026',
        code: 'DHMS_SM_036',
        title: 'The Active Smart Gambler',
        intent: 'Young healthy member betting against elective surgery.',
        target_plan_id: 'dhms-active-smart-2026',
        mathematical_basis: 'Lowest premium (R1,350) subsidized by R7,750 elective deductible.',
        primary_risk: 'Elective surgery triggers immediate R7,750 debt.',
        default_income: 22000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'classic-saver-msa-exhaustion-2026',
        code: 'DHMS_SV_053',
        title: 'Classic Saver MSA User',
        intent: 'Maximize 25% savings allocation for routine care.',
        target_plan_id: 'dhms-classic-saver-2026',
        mathematical_basis: 'Savings Account of R10,000+ available upfront.',
        primary_risk: 'Self-Payment Gap (Cover stops when MSA runs out).',
        default_income: 42000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'classic-comprehensive-above-threshold-maximiser-2026',
        code: 'DHMS_AT_046',
        title: 'The Threshold Breacher',
        intent: 'Trigger unlimited Above Threshold benefits.',
        target_plan_id: 'dhms-classic-comprehensive-2026',
        mathematical_basis: 'Consistent claims > R34,810 Annual Threshold.',
        primary_risk: 'Premium Waste if claims remain low.',
        default_income: 85000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'coastal-core-inland-trap-2026',
        code: 'DHMS_CS_032',
        title: 'The Coastal Arbitrageur',
        intent: 'Secure full private hospital cover at discount by geo-locking.',
        target_plan_id: 'dhms-coastal-core-2026', // Note: Need to ensure this is in plans.ts if used (added above implicitly)
        mathematical_basis: '17% Premium Discount for Coastal Residence.',
        primary_risk: 'Elective emergency inland triggers 30% co-payment.',
        default_income: 30000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'essential-smart-couple-2026',
        code: 'DHMS_SM_071',
        title: 'Essential Smart Couple',
        intent: 'Balance cost and cover for young couple.',
        target_plan_id: 'dhms-essential-smart-2026', // Add to plans.ts or map to classic
        mathematical_basis: 'Cost efficiency of Smart Network without MSA overhead.',
        primary_risk: 'Strict network adherence required.',
        default_income: 27000,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'classic-saver-child-heavy-2026',
        code: 'DHMS_SV_067',
        title: 'Classic Saver Child Heavy',
        intent: 'Manage high frequency child claims via MSA.',
        target_plan_id: 'dhms-classic-saver-2026',
        mathematical_basis: 'Child rates add to MSA pool.',
        primary_risk: 'Rapid depletion of MSA by mid-year.',
        default_income: 43000,
        default_family: { main: 1, adult: 1, child: 3 }
    },
    {
        slug: 'classic-core-hospital-scope-2026',
        code: 'DHMS_SC_056',
        title: 'The Scope Risk Taker',
        intent: 'Hospital cover only, paying cash for scopes.',
        target_plan_id: 'dhms-classic-core-2026', // Add to plans if needed
        mathematical_basis: 'Avoid paying for MSA not used.',
        primary_risk: 'R8,000 upfront for hospital gastroscopy.',
        default_income: 35000,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'executive-high-net-worth-2026',
        code: 'DHMS_PR_077',
        title: 'The Executive Elite',
        intent: 'Global coverage and highest oncology limits.',
        target_plan_id: 'dhms-executive-2026', // Add to plans
        mathematical_basis: 'Highest premiums for maximum risk transfer.',
        primary_risk: 'Substantial monthly fixed cost.',
        default_income: 100000,
        default_family: { main: 1, adult: 1, child: 3 }
    },

    // =========================================================================
    // 2. MOMENTUM (10 Personas)
    // =========================================================================
    {
        slug: 'momentum-ingwe-connect-network-saver-2026',
        code: 'MOM_ING_01',
        title: 'Ingwe Budget Optimizer',
        intent: 'Maximize savings with Connect Network hospitals.',
        target_plan_id: 'momentum-ingwe-2026',
        mathematical_basis: 'Lowest premium via State chronic provider.',
        primary_risk: 'Oncology treatment limited to PMB at State facilities.',
        default_income: 15000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'momentum-ingwe-state-maxed-oncology-trap-2026',
        code: 'MOM_ING_04',
        title: 'The State-Maxed Oncology Victim',
        intent: 'Maximize savings but triggers catastrophic oncology limit.',
        target_plan_id: 'momentum-ingwe-2026',
        mathematical_basis: 'Any Hospital choice + State chronic = PMB-only oncology.',
        primary_risk: 'Oncology SEVERELY limited to PMB at State.',
        default_income: 15500,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'momentum-extender-family-threshold-trap-2026',
        code: 'MOM_EXT_03',
        title: 'Extender Threshold Trap',
        intent: 'Access 25% savings with safety net.',
        target_plan_id: 'momentum-extender-2026',
        mathematical_basis: 'Threshold deductible of R36,900 before Extended Cover.',
        primary_risk: 'Family threshold multiplier creates R100k+ gap.',
        default_income: 50000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'momentum-incentive-savings-depletion-2026',
        code: 'MOM_INC_01',
        title: 'Incentive 10% Savings Trap',
        intent: 'Mid-tier cover with some savings.',
        target_plan_id: 'momentum-incentive-2026',
        mathematical_basis: 'Only 10% savings allocation.',
        primary_risk: 'Savings insufficient for active usage, depletes fast.',
        default_income: 38000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'momentum-evolve-day-hospital-trap-2026',
        code: 'MOM_EVO_02',
        title: 'Evolve Day Hospital Trap',
        intent: 'Mid-tier network locked option.',
        target_plan_id: 'momentum-evolve-2026', // Add plan
        mathematical_basis: 'Procedures limited to day hospitals.',
        primary_risk: 'Acute procedures not covered in acute hospitals.',
        default_income: 21000,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'momentum-summit-unlimited-oncology-2026',
        code: 'MOM_SUM_04',
        title: 'Summit Unlimited Champion',
        intent: 'Comprehensive cover with no oncology cap.',
        target_plan_id: 'momentum-summit-2026', // Add plan
        mathematical_basis: 'Unlimited Oncology benefit unique in tier.',
        primary_risk: 'High premium cost.',
        default_income: 50000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'momentum-custom-state-chronic-saver-2026',
        code: 'MOM_CUS_03',
        title: 'Custom State Chronic Saver',
        intent: 'Flexible hospital choice, state meds savings.',
        target_plan_id: 'momentum-custom-2026', // Add plan
        mathematical_basis: 'Any hospital + State chronic = optimized premium.',
        primary_risk: 'Must use State facilities for chronic meds.',
        default_income: 30500,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'momentum-ingwe-virtual-gp-limit-2026',
        code: 'MOM_ING_06',
        title: 'Ingwe Virtual GP Ceiling',
        intent: 'Entry level digital-first user.',
        target_plan_id: 'momentum-ingwe-2026',
        mathematical_basis: '3 virtual consultations included.',
        primary_risk: 'All visits after 3rd are out of pocket.',
        default_income: 14500,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'momentum-extender-state-chronic-max-2026',
        code: 'MOM_EXT_06',
        title: 'Extender State Chronic Maximizer',
        intent: 'High savings allocation, low fixed cost.',
        target_plan_id: 'momentum-extender-2026',
        mathematical_basis: 'Lowest premium base + 25% savings.',
        primary_risk: 'State chronic inconvenience.',
        default_income: 40500,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'momentum-evolve-casualty-trap-2026',
        code: 'MOM_EVO_05',
        title: 'Evolve Casualty Trap',
        intent: 'Affordable network plan.',
        target_plan_id: 'momentum-evolve-2026',
        mathematical_basis: 'Casualty visits NOT covered.',
        primary_risk: 'Emergency visit is full cost out of pocket.',
        default_income: 20000,
        default_family: { main: 1, adult: 1, child: 1 }
    },

    // =========================================================================
    // 3. BONITAS (10 Personas)
    // =========================================================================
    {
        slug: 'boncap-lowest-band-single-2026',
        code: 'BON_CAP_001',
        title: 'BonCap Entry Level',
        intent: 'Minimise premiums by staying in the lowest income band.',
        target_plan_id: 'bonitas-boncap-2026',
        mathematical_basis: 'Income < R11,930 qualifies for R1,730 rate.',
        primary_risk: 'Crossing R11,931 increases premiums by 22%.',
        default_income: 10000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'boncap-band-2-breacher-2026',
        code: 'BON_CAP_004',
        title: 'BonCap Band 2 Breacher',
        intent: 'Isolate premium jump at R19,351.',
        target_plan_id: 'bonitas-boncap-2026',
        mathematical_basis: 'Income R19,351 triggers 61% hike to R3,404.',
        primary_risk: 'Massive discrete premium jump.',
        default_income: 19351,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'boncore-network-hospital-maximiser-2026',
        code: 'BON_CORE_009',
        title: 'BonCore Network Maximiser',
        intent: 'Avoid R14,680 co-payment by using network.',
        target_plan_id: 'bonitas-boncore-2026', // Add plan
        mathematical_basis: 'R14,680 penalty for non-network.',
        primary_risk: 'Non-network hospital choice triggers large penalty.',
        default_income: 25000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'bonstart-child-dental-ga-2026',
        code: 'DENT_GA_001',
        title: 'BonStart Child Dental GA',
        intent: 'Model child under 5 dental GA cost.',
        target_plan_id: 'bonitas-bonstart-2026',
        mathematical_basis: 'Child <5 GA dental: R3,640 co-payment.',
        primary_risk: 'Limited to once per lifetime.',
        default_income: 24000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'bonclassic-mid-tier-savings-2026',
        code: 'BON_CLASSIC_028',
        title: 'BonClassic Savings Maximizer',
        intent: 'Balance premium with moderate R14,832 savings.',
        target_plan_id: 'bonitas-bonclassic-2026',
        mathematical_basis: 'Main savings R14,832.',
        primary_risk: 'Savings depletion requires self-funding.',
        default_income: 60000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'boncore-hiv-aids-dsp-2026',
        code: 'CHRON_HIV_001',
        title: 'BonCore HIV DSP User',
        intent: 'Avoid 30% co-payment on ARVs.',
        target_plan_id: 'bonitas-boncore-2026',
        mathematical_basis: 'Unlimited cover if registered on DSP.',
        primary_risk: 'Non-DSP medicine triggers 30% penalty.',
        default_income: 26000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'bonessential-colonoscopy-copay-2026',
        code: 'PROC_COL_002',
        title: 'BonEssential Colonoscopy Trap',
        intent: 'Model R2,020 procedure co-payment.',
        target_plan_id: 'bonitas-bonessential-2026', // Add plan
        mathematical_basis: 'R2,020 co-payment even at network hospital.',
        primary_risk: 'Procedure-specific co-payment adds to cost.',
        default_income: 36000,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'boncomprehensive-high-income-atb-2026',
        code: 'BON_COMP_008',
        title: 'BonComprehensive ATB Maximiser',
        intent: 'Model high-income family maximizing ATB.',
        target_plan_id: 'bonitas-boncomprehensive-2026', // Add plan
        mathematical_basis: 'Main ATB Unlimited.',
        primary_risk: 'Adult/child ATB limits constrain coverage.',
        default_income: 85000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'boncore-cataract-dsp-avoidance-2026',
        code: 'CAT_001',
        title: 'BonCore Cataract DSP User',
        intent: 'Avoid R9,800 co-payment.',
        target_plan_id: 'bonitas-boncore-2026',
        mathematical_basis: 'R9,800 penalty if non-DSP.',
        primary_risk: 'DSP lock-in for cataract procedures.',
        default_income: 25000,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'bonclassic-insulin-pump-2026',
        code: 'DIAB_PUMP_001',
        title: 'BonClassic Insulin Pump User',
        intent: 'R65,000 pump replacement for child.',
        target_plan_id: 'bonitas-bonclassic-2026',
        mathematical_basis: 'R65,000 per beneficiary <18, every 5 years.',
        primary_risk: 'Pump replacement limited to 5-year intervals.',
        default_income: 60000,
        default_family: { main: 1, adult: 1, child: 1 }
    },

    // =========================================================================
    // 4. BESTMED (10 Personas)
    // =========================================================================
    {
        slug: 'beat-1-single-member-2026',
        code: 'BEAT_001',
        title: 'Beat 1 Entry Level',
        intent: 'Access affordable medical cover with network benefits.',
        target_plan_id: 'bestmed-beat-1-2026',
        mathematical_basis: 'Entry-level fixed premium.',
        primary_risk: 'Non-network hospital use triggers co-payment.',
        default_income: 20000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'beat-3-comprehensive-coverage-2026',
        code: 'BEAT_006',
        title: 'Beat 3 Comprehensive',
        intent: 'Access mid-tier comprehensive cover.',
        target_plan_id: 'bestmed-beat-3-2026',
        mathematical_basis: 'Comprehensive benefits with higher limits.',
        primary_risk: 'Premium higher but coverage improved.',
        default_income: 32000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'pace-1-network-locked-optimization-2026',
        code: 'PACE_002',
        title: 'Pace 1 Network Optimizer',
        intent: 'Maximize benefits adhering to network.',
        target_plan_id: 'bestmed-pace-1-2026', // Add plan
        mathematical_basis: 'Budget pricing through network lock-in.',
        primary_risk: 'Out-of-network usage triggered unexpected costs.',
        default_income: 19000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'pace-4-premium-pace-2026',
        code: 'PACE_009',
        title: 'Pace 4 Premium Coverage',
        intent: 'Access top-tier Pace plan.',
        target_plan_id: 'bestmed-pace-4-2026',
        mathematical_basis: 'Premium plan with highest limits.',
        primary_risk: 'Highest premiums.',
        default_income: 45000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'beat-3-specialist-copayment-trap-2026',
        code: 'PROC_SPEC_001',
        title: 'Beat 3 Specialist Trap',
        intent: 'Quantify out-of-pocket specialist costs.',
        target_plan_id: 'bestmed-beat-3-2026',
        mathematical_basis: 'Specialist consultations trigger co-payment if non-network.',
        primary_risk: 'Co-payment penalty.',
        default_income: 32000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'beat-1-hospital-admission-copay-2026',
        code: 'HOSP_ADM_001',
        title: 'Beat 1 Admission Copay',
        intent: 'Model per-admission cost.',
        target_plan_id: 'bestmed-beat-1-2026',
        mathematical_basis: 'Hospital admission co-payment applies.',
        primary_risk: 'Non-network admission increases out-of-pocket.',
        default_income: 20000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'pace-3-cancer-limited-family-2026',
        code: 'CANC_002',
        title: 'Pace 3 Cancer Limit',
        intent: 'Model cancer treatment limits.',
        target_plan_id: 'bestmed-pace-3-2026', // Add plan
        mathematical_basis: 'Cancer subject to annual family limit.',
        primary_risk: 'High-cost treatment exhausts limit.',
        default_income: 36000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'beat-4-maternity-unlimited-2026',
        code: 'MAT_001',
        title: 'Beat 4 Maternity Unlimited',
        intent: 'Model unlimited maternity benefits.',
        target_plan_id: 'bestmed-beat-4-2026', // Add plan
        mathematical_basis: 'Pregnancy care unlimited at network.',
        primary_risk: 'Non-network triggers co-payment.',
        default_income: 43000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'beat-2-mri-ct-scan-copay-2026',
        code: 'IMG_MRI_001',
        title: 'Beat 2 MRI Copay',
        intent: 'Model imaging costs.',
        target_plan_id: 'bestmed-beat-2-2026', // Add plan
        mathematical_basis: 'MRI/CT per-event co-payments.',
        primary_risk: 'Family limit constrains access.',
        default_income: 25000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'beat-3-plus-kidney-dialysis-2026',
        code: 'RENAL_001',
        title: 'Beat 3+ Dialysis',
        intent: 'Model unlimited dialysis.',
        target_plan_id: 'bestmed-beat-3-plus-2026', // Add plan
        mathematical_basis: 'Unlimited dialysis at network.',
        primary_risk: 'Non-network triggers co-payment.',
        default_income: 37000,
        default_family: { main: 1, adult: 1, child: 0 }
    },

    // =========================================================================
    // 5. MEDIHELP (10 Personas)
    // =========================================================================
    {
        slug: 'medmove-family-single-rate-trap-2026',
        code: 'MHMOVE_002',
        title: 'MedMove Flat Rate Trap',
        intent: 'Model cost of adding dependants on flat rate plan.',
        target_plan_id: 'medihelp-medmove-2026',
        mathematical_basis: 'All family members pay R1,734 each; no scaling.',
        primary_risk: 'Large families pay R1,734 x N; poor value vs variable plans.',
        default_income: 20000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medvital-affordable-network-2026',
        code: 'MHVITAL_001',
        title: 'MedVital Affordable Network',
        intent: 'Access affordable primary care.',
        target_plan_id: 'medihelp-medvital-2026',
        mathematical_basis: 'Network option saves 28%.',
        primary_risk: 'Network vs non-network difference.',
        default_income: 20000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'medadd-15percent-savings-2026',
        code: 'MHADD_001',
        title: 'MedAdd 15% Savings',
        intent: 'Optimize 15% savings account.',
        target_plan_id: 'medihelp-medadd-2026', // Add plan
        mathematical_basis: '15% savings allocation.',
        primary_risk: 'After savings, only R4,200 insured benefit.',
        default_income: 30000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medprime-family-cover-hero-2026',
        code: 'MHPRIME_001',
        title: 'MedPrime Family Hero',
        intent: 'Leverage family pricing (max 2 children paid).',
        target_plan_id: 'medihelp-medprime-2026', // Add plan
        mathematical_basis: 'Pay only 2 children <18.',
        primary_risk: '3+ children require additional cost.',
        default_income: 36000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medsaver-25percent-savings-freedom-2026',
        code: 'MHSAVER_001',
        title: 'MedSaver 25% Freedom',
        intent: 'Maximize 25% savings.',
        target_plan_id: 'medihelp-medsaver-2026', // Add plan
        mathematical_basis: '25% savings allocation.',
        primary_risk: 'Large self-payment gap after depletion.',
        default_income: 42000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medelite-premium-hybrid-savings-2026',
        code: 'MHELITE_001',
        title: 'MedElite Hybrid Premium',
        intent: 'Premium coverage with 10% savings account.',
        target_plan_id: 'medihelp-medelite-2026',
        mathematical_basis: 'High premium R8,922 but low 10% savings.',
        primary_risk: 'Large self-payment gap due to low savings allocation.',
        default_income: 55000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'medmove-student-income-capped-2026',
        code: 'MHMOVE_003',
        title: 'MedMove Student Cap',
        intent: 'Access subsidized cover.',
        target_plan_id: 'medihelp-medmove-2026', // Note: student variation
        mathematical_basis: 'Income R0-R900 qualifies for student rate.',
        primary_risk: 'Crossing R900 moves to adult rates.',
        default_income: 850,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'medvital-cancer-limited-2026',
        code: 'MHVITAL_003',
        title: 'MedVital Cancer Limit',
        intent: 'Model limited cancer benefit.',
        target_plan_id: 'medihelp-medvital-2026',
        mathematical_basis: 'Cancer limited to R262,500.',
        primary_risk: 'High-cost treatment exhausts limit.',
        default_income: 21000,
        default_family: { main: 1, adult: 1, child: 1 }
    },
    {
        slug: 'medprime-savings-account-limited-2026',
        code: 'MHPRIME_003',
        title: 'MedPrime Savings Gap',
        intent: 'Model 10% savings depletion.',
        target_plan_id: 'medihelp-medprime-2026',
        mathematical_basis: 'Savings depletion triggers self-payment.',
        primary_risk: 'Self-payment gap before insured benefit.',
        default_income: 38000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medreach-professional-network-2026',
        code: 'MHREACH_001',
        title: 'MedReach Network Pro',
        intent: 'Access insured network coverage.',
        target_plan_id: 'medihelp-medreach-2026', // Add plan
        mathematical_basis: 'Family day-to-day limits.',
        primary_risk: 'Per-person limits constrain high use.',
        default_income: 45000,
        default_family: { main: 1, adult: 1, child: 1 }
    },

    // =========================================================================
    // 6. MEDSHIELD (10 Personas)
    // =========================================================================
    {
        slug: 'medcore-network-hospital-lock-2026',
        code: 'MSH_C_04',
        title: 'MediCore Network Lock',
        intent: 'Model 30% non-network hospital penalty.',
        target_plan_id: 'medshield-medicore-2026',
        mathematical_basis: 'Non-network hospital triggers 30% upfront co-payment.',
        primary_risk: 'Non-network hospital use attracts immediate 30% penalty.',
        default_income: 18500,
        default_family: { main: 1, adult: 1, child: 0 }
    },
    {
        slug: 'premiumplus-25percent-savings-allocation-2026',
        code: 'MSH_PP_01',
        title: 'PremiumPlus High Savings',
        intent: 'Maximize 25% PSA for flexibility.',
        target_plan_id: 'medshield-premiumplus-2026',
        mathematical_basis: 'PSA 25% of contribution (R28k/year).',
        primary_risk: 'Highest premium cost (R9,489 principal).',
        default_income: 50000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medvalue-compact-cost-optimization-2026',
        code: 'MSH_MV_02',
        title: 'MediValue Compact Saver',
        intent: 'Save R300/month by accepting Compact network.',
        target_plan_id: 'medshield-medvalue-compact-2026', // Add plan
        mathematical_basis: 'Compact network saves 10.2% premium.',
        primary_risk: 'Compact network restricted; non-network 30% copay.',
        default_income: 24000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medcore-entry-level-single-2026',
        code: 'MSH_C_01',
        title: 'MediCore Entry Single',
        intent: 'Affordable entry-level coverage.',
        target_plan_id: 'medshield-medicore-2026',
        mathematical_basis: 'PMB + preventative benefits at lowest premium.',
        primary_risk: 'Limited day-to-day; specialist requires referral.',
        default_income: 18000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'medvalue-prime-unlimited-hospital-2026',
        code: 'MSH_MV_01',
        title: 'MediValue Prime Unlimited',
        intent: 'Access unlimited hospital with Prime network.',
        target_plan_id: 'medshield-medvalue-prime-2026', // Add plan
        mathematical_basis: 'Prime vs Compact network choice.',
        primary_risk: 'Higher premium for network flexibility.',
        default_income: 25000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'mediplus-prime-unlimited-day-to-day-2026',
        code: 'MSH_MP_01',
        title: 'MediPlus Prime Unlimited',
        intent: 'Premium coverage with Prime network.',
        target_plan_id: 'medshield-mediplus-prime-2026', // Add plan
        mathematical_basis: 'Generous day-to-day limits.',
        primary_risk: 'High cost; network restrictions apply.',
        default_income: 35000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'mediphila-compact-network-single-2026',
        code: 'MSH_PH_01',
        title: 'MediPhila Compact Single',
        intent: 'Access affordable entry-level cover.',
        target_plan_id: 'medshield-mediphila-compact-2026', // Add plan
        mathematical_basis: 'Flat rate R2,145; Compact network.',
        primary_risk: 'Network-locked with high co-payments.',
        default_income: 16000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'medibonus-day-to-day-generous-2026',
        code: 'MSH_MB_01',
        title: 'MediBonus Day-to-Day',
        intent: 'Generous day-to-day scaling.',
        target_plan_id: 'medshield-medibonus-2026', // Add plan
        mathematical_basis: 'No family cap on day-to-day.',
        primary_risk: 'Can still deplete if high utilization.',
        default_income: 45000,
        default_family: { main: 1, adult: 1, child: 4 }
    },
    {
        slug: 'medisaver-15percent-psa-2026',
        code: 'MSH_MS_01',
        title: 'MediSaver 15% PSA',
        intent: 'Leverage 15% PSA for self-managed care.',
        target_plan_id: 'medshield-medisaver-2026', // Add plan
        mathematical_basis: 'PSA 15% of contribution.',
        primary_risk: 'Self-managed; depletion leaves gap.',
        default_income: 42000,
        default_family: { main: 1, adult: 1, child: 2 }
    },
    {
        slug: 'medicurve-lowest-premium-2026',
        code: 'MSH_MC_01',
        title: 'MediCurve Lowest Premium',
        intent: 'Access cheapest Medshield option.',
        target_plan_id: 'medshield-medicurve-2026', // Add plan
        mathematical_basis: 'Principal & Adult R1,821.',
        primary_risk: 'Extreme cost minimization; limited benefits.',
        default_income: 14000,
        default_family: { main: 1, adult: 0, child: 0 }
    }
];