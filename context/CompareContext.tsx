'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of a plan in the comparison bucket
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

    // 1. Hydrate from Local Storage on Mount (Client-Side)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_compare');
            if (saved) {
                try {
                    setSelectedPlans(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse compare state", e);
                }
            }
        }
    }, []);

    // 2. Persist to Local Storage on Change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('healthos_compare', JSON.stringify(selectedPlans));
        }
    }, [selectedPlans]);

    // 3. Logic: Add/Remove with a Limit of 3
    const togglePlan = (plan: SelectedPlan) => {
        setSelectedPlans(prev => {
            const exists = prev.find(p => p.id === plan.id);

            if (exists) {
                // Remove if already selected
                return prev.filter(p => p.id !== plan.id);
            }

            if (prev.length >= 3) {
                // Haptic feedback could be triggered here in a real PWA
                return prev;
            }

            // Add new plan
            return [...prev, plan];
        });

        // Auto-open the dock when a plan is added
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

// Custom Hook for consumption
export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useCompare must be used within a CompareProvider');
    return context;
}
