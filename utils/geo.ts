export type RegionStatus = 'National' | 'Coastal' | 'Polokwane_Hub' | 'George_Hub' | 'Mbombela_Hub';

const HUB_MAP: Record<string, RegionStatus> = {
    // Polokwane
    '0699': 'Polokwane_Hub', '0700': 'Polokwane_Hub',
    // George
    '6529': 'George_Hub', '6530': 'George_Hub',
    // Coastal (Sample)
    '8000': 'Coastal', '8001': 'Coastal', // Cape Town
    '4000': 'Coastal', '4001': 'Coastal', // Durban
};

export function resolveRegion(postalCode: string): RegionStatus {
    const code = postalCode?.trim() || '';
    return HUB_MAP[code] || 'National';
}