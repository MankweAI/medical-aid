export const PROCEDURE_METADATA: Record<string, {
    preparation: string[];
    recovery_time: string;
    description_template?: string;
}> = {
    "Gastroscopy": {
        preparation: [
            "For {{PLAN_NAME}} admission, fast for at least 6 hours before the procedure (no food or water).",
            "Arrangement for a driver is essential as sedation is used.",
            "Stop blood thinners if advised by your doctor."
        ],
        recovery_time: "Post-procedure monitoring is 1-2 hours. {{PLAN_NAME}} members typically return to work the next day."
    },
    "Colonoscopy": {
        preparation: [
            "Follow a low-fiber diet 2-3 days before your {{PLAN_NAME}} procedure.",
            "Take the prescribed bowel preparation medication the day before (this will cause frequent loose stools).",
            "Stay near a bathroom and drink clear fluids only on the day before."
        ],
        recovery_time: "You will be monitored until the sedative wears off. Bloating is common."
    },
    "Cataract Surgery": {
        preparation: [
            "Use prescribed eye drops 3 days before surgery.",
            "Fast for 12 hours prior to admission.",
            "Wash your face thoroughly on the morning of surgery."
        ],
        recovery_time: "Vision may be blurry for a few days. Avoid heavy lifting for 2 weeks."
    },
    "Wisdom Teeth Removal": {
        preparation: [
            "No eating or drinking 8 hours before surgery.",
            "Arrange for a responsible adult to drive you home.",
            "Wear loose, comfortable clothing."
        ],
        recovery_time: "Swelling peaks at 48 hours. Full recovery takes 1-2 weeks."
    }
};
