import { Procedure } from '@/types/schemes/discovery';

/**
 * Major Joint Procedures
 * High-value surgeries with prosthesis cost considerations
 */
export const MAJOR_JOINT_PROCEDURES: Procedure[] = [
    {
        id: "hip-replacement",
        label: "Hip Replacement",
        medical_term: "Total Hip Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 150000,
        risk_notes: "Prosthesis limits apply. Network provider essential for full cover.",
        scope_complexity: "single",
        cpt_code: "27130",
        common_diagnoses: [
            { code: "M16.1", label: "Primary osteoarthritis of hip" },
            { code: "M87.05", label: "Idiopathic aseptic necrosis of femur" },
            { code: "S72.0", label: "Fracture of neck of femur" }
        ],
        description: "Surgical replacement of the hip joint with an artificial prosthesis. One of the most successful orthopaedic procedures."
    },
    {
        id: "knee-replacement",
        label: "Knee Replacement",
        medical_term: "Total Knee Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 140000,
        risk_notes: "Prosthesis limits apply. Network provider essential for full cover.",
        scope_complexity: "single",
        cpt_code: "27447",
        common_diagnoses: [
            { code: "M17.1", label: "Primary osteoarthritis of knee" },
            { code: "M17.5", label: "Other secondary osteoarthritis of knee" }
        ],
        description: "Surgical replacement of the knee joint with an artificial prosthesis to relieve pain and restore function."
    },
    {
        id: "shoulder-replacement",
        label: "Shoulder Replacement",
        medical_term: "Total Shoulder Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 160000,
        risk_notes: "Prosthesis limits of up to R46,000 may apply.",
        scope_complexity: "single",
        cpt_code: "23472",
        common_diagnoses: [
            { code: "M19.01", label: "Primary osteoarthritis of shoulder" },
            { code: "M75.1", label: "Rotator cuff tear" }
        ],
        description: "Surgical replacement of the shoulder joint with an artificial prosthesis for severe arthritis or irreparable rotator cuff damage."
    },
    {
        id: "acl-reconstruction",
        label: "ACL Reconstruction",
        medical_term: "Anterior Cruciate Ligament Reconstruction",
        category: "major_joint",
        base_cost_estimate: 80000,
        risk_notes: "Sports injury. Check if sports-related injuries are covered.",
        scope_complexity: "single",
        cpt_code: "29888",
        common_diagnoses: [
            { code: "S83.5", label: "Sprain of cruciate ligament of knee" },
            { code: "M23.5", label: "Chronic instability of knee" }
        ],
        description: "Surgical reconstruction of a torn anterior cruciate ligament using a graft, commonly performed in athletes."
    }
];
