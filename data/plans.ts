// data/plans.ts
import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [
    {
        id: "discovery-keycare-plus-2026",
        price: 3018,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery",
            plan_name: "KeyCare Plus",
            plan_series: "KeyCare",
            plan_type: "Income-Banded Full Cover"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 10550, main: 3018, adult: 3018, child: 830 },
                    { min: 10551, max: 15950, main: 3266, adult: 3266, child: 900 },
                    { min: 15951, max: null, main: 3687, adult: 3687, child: 1016 }
                ],
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "KeyCare Network",
        network_details: {
            hospitals: "KeyCare Network Hospitals",
            gps: "KeyCare Network GP (Unlimited)",
            specialists: "KeyCare Network Specialists (Referral Required)"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: { status: "Limited", value: 250000 },
            casualty: { status: "Fixed Co-payment", value: 520 },
            internal_prosthesis: { sublimit: 0 }
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2600, wellness_screening: true }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "State/Network Only",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Specialist cover is limited to R5,750 per year. Income verification is required and includes all sources (interest, rent, spouse earnings).",
        faq: [
            { question: "What is the specialist limit?", answer: "Cover is limited to R5,750 per year for specialists on the KeyCare network." }
        ]
    },
    {
        id: "discovery-keycare-core-2026",
        price: 1530,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery",
            plan_name: "KeyCare Core",
            plan_series: "KeyCare",
            plan_type: "Income-Banded Hospital"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 10550, main: 1530, adult: 1530, child: 422 },
                    { min: 10551, max: 15950, main: 1948, adult: 1948, child: 536 },
                    { min: 15951, max: null, main: 2790, adult: 2790, child: 766 }
                ],
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "KeyCare Network",
        network_details: {
            hospitals: "KeyCare Network Hospitals",
            gps: "None (Except PMB)",
            specialists: "KeyCare Network Specialists (Referral Required)"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: { status: "Limited", value: 250000 },
            casualty: { status: "No Benefit", value: 0 },
            internal_prosthesis: { sublimit: 0 }
        },
        defined_baskets: {
            maternity: { antenatal_consults: 0, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0, wellness_screening: true }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "State/Network Only",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Optional",
        red_flag: "Specialist cover is strictly capped at R2,850 per year. No day-to-day cover provided.",
        faq: [
            { question: "Does this plan cover GP visits?", answer: "No, this is a hospital-only plan. GP visits are only covered if they are part of a PMB condition." }
        ]
    },
    {
        id: "discovery-keycare-start-2026",
        price: 1331,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery",
            plan_name: "KeyCare Start",
            plan_series: "KeyCare",
            plan_type: "Income-Banded Network Entry"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 10550, main: 1331, adult: 1331, child: 581 },
                    { min: 10551, max: 15950, main: 1952, adult: 1952, child: 852 },
                    { min: 15951, max: 24250, main: 3063, adult: 3063, child: 1338 },
                    { min: 24251, max: null, main: 3488, adult: 3488, child: 1524 }
                ],
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "KeyCare Start Network",
        network_details: {
            hospitals: "KeyCare Start Hospital Network",
            gps: "KeyCare Start Network GP (Unlimited)",
            specialists: "KeyCare Start Network Specialists (Referral Required)"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: { status: "PMB Only", value: 0 },
            casualty: { status: "No Benefit", value: 0 },
            internal_prosthesis: { sublimit: 0 }
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0, wellness_screening: true }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "State Only",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Chronic medication is only available at State facilities. High 'cliff' risk at the R10,551 income mark.",
        faq: [
            { question: "Where do I get my chronic medicine?", answer: "On the KeyCare Start plan, you must use State facilities for your chronic medication." }
        ]
    },
    {
        id: "discovery-keycare-start-regional-2026",
        price: 1184,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery",
            plan_name: "KeyCare Start Regional",
            plan_series: "KeyCare",
            plan_type: "Regional Hub Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 10550, main: 1184, adult: 1184, child: 517 },
                    { min: 10551, max: 15950, main: 1790, adult: 1790, child: 782 },
                    { min: 15951, max: 24250, main: 2790, adult: 2790, child: 1219 },
                    { min: 24251, max: null, main: 3178, adult: 3178, child: 1388 }
                ],
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "Regional Hub Network",
        network_details: {
            hospitals: "Designated Regional Hub Hospitals",
            gps: "KeyCare Online Practice / Hub GP",
            specialists: "Hub-Specific Specialists"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: { status: "PMB Only", value: 0 },
            casualty: { status: "No Benefit", value: 0 },
            internal_prosthesis: { sublimit: 0 }
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0, wellness_screening: true }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "State Only",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Valid only in Polokwane, George, Mbombela, Bellville, and Tzaneen. Moving outside these hubs invalidates cover.",
        faq: [
            { question: "What happens if I move?", answer: "If you relocate to a non-hub area, your coverage model breaks and you must upgrade to a national plan." }
        ]
    }
];

