'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SelectedPlan {
    id: string;
    name: string;
    scheme: string;
}

interface CompareContextType {
    selectedPlans: SelectedPlan[];
    togglePlan: (plan: SelectedPlan) => void;
    clearSelection: () => void;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [selectedPlans, setSelectedPlans] = useState<SelectedPlan[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_compare');
            if (saved) setSelectedPlans(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('healthos_compare', JSON.stringify(selectedPlans));
        }
    }, [selectedPlans]);

    const togglePlan = (plan: SelectedPlan) => {
        setSelectedPlans(prev => {
            const exists = prev.find(p => p.id === plan.id);
            if (exists) return prev.filter(p => p.id !== plan.id);

            // LIMIT ENFORCEMENT: Max 2 Plans
            if (prev.length >= 2) {
                // Optional: Trigger a toast notification here saying "Compare limit reached"
                return prev;
            }

            return [...prev, plan];
        });
        setIsOpen(true);
    };

    const clearSelection = () => {
        setSelectedPlans([]);
        setIsOpen(false);
        localStorage.removeItem('healthos_compare');
    };

    return (
        <CompareContext.Provider value={{ selectedPlans, togglePlan, clearSelection, isOpen, setIsOpen }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useCompare must be used within a CompareProvider');
    return context;
}