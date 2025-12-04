'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Plan {
    id: string;
    price: number;
    savings_annual: number;
    network_restriction: string;

    // Detailed Object Structure
    identity: {
        scheme_name: string;
        plan_name: string;
        plan_series: string;
        plan_type: string;
    };
    coverage_rates: {
        hospital_account: number;
        specialist_in_hospital: number;
        specialist_out_hospital: number;
        gp_network: number;
    };
    defined_baskets: {
        maternity: {
            antenatal_consults: number;
            ultrasounds_2d: number;
            paediatrician_visits: number;
        };
        preventative: {
            vaccinations: boolean;
            contraceptives: number;
        };
    };
    procedure_copays: {
        scope_in_hospital: number;
        scope_out_hospital: number;
        mri_scan: number;
        joint_replacement: number;
    };

    // UI Helpers
    red_flag?: string;
    chronic_limit?: string; // Optional helper for compatibility
    features?: any;         // Optional helper for compatibility
}

interface CompareContextType {
    activePin: Plan | null;
    pinnedHistory: Plan[];
    showPinnedOnly: boolean;
    setPin: (plan: Plan) => void;
    clearPin: () => void;
    removeFromHistory: (id: string) => void;
    togglePinnedView: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [activePin, setActivePin] = useState<Plan | null>(null);
    const [pinnedHistory, setPinnedHistory] = useState<Plan[]>([]);
    const [showPinnedOnly, setShowPinnedOnly] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedHistory = localStorage.getItem('healthos_pin_history');
            const savedActive = localStorage.getItem('healthos_active_pin');

            if (savedHistory) setPinnedHistory(JSON.parse(savedHistory));
            if (savedActive) setActivePin(JSON.parse(savedActive));
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('healthos_pin_history', JSON.stringify(pinnedHistory));
            if (activePin) {
                localStorage.setItem('healthos_active_pin', JSON.stringify(activePin));
            } else {
                localStorage.removeItem('healthos_active_pin');
            }
        }
    }, [pinnedHistory, activePin]);

    const setPin = (plan: Plan) => {
        setActivePin(plan);
        setPinnedHistory(prev => {
            const others = prev.filter(p => p.id !== plan.id);
            return [plan, ...others];
        });
    };

    const clearPin = () => setActivePin(null);

    const removeFromHistory = (id: string) => {
        setPinnedHistory(prev => prev.filter(p => p.id !== id));
        if (activePin?.id === id) setActivePin(null);
    };

    const togglePinnedView = () => setShowPinnedOnly(prev => !prev);

    return (
        <CompareContext.Provider value={{
            activePin,
            pinnedHistory,
            showPinnedOnly,
            setPin,
            clearPin,
            removeFromHistory,
            togglePinnedView
        }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useCompare must be used within a CompareProvider');
    return context;
}