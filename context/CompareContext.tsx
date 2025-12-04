'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define a flexible Plan type
export interface Plan {
    id: string;
    name: string;
    scheme: string;
    price: number;
    network_restriction?: string;
    savings_annual: number;
    chronic_limit?: string;
    verdictType?: 'good' | 'warning' | 'neutral';
    red_flag?: string;
}

interface CompareContextType {
    activePin: Plan | null;      // The "Reference" card stuck to the top
    pinnedHistory: Plan[];       // The "Collection" for the Dock
    setPin: (plan: Plan) => void; // Sets active pin & adds to history
    clearPin: () => void;
    removeFromHistory: (id: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [activePin, setActivePin] = useState<Plan | null>(null);
    const [pinnedHistory, setPinnedHistory] = useState<Plan[]>([]);

    // 1. Hydrate
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedHistory = localStorage.getItem('healthos_pin_history');
            const savedActive = localStorage.getItem('healthos_active_pin');

            if (savedHistory) setPinnedHistory(JSON.parse(savedHistory));
            if (savedActive) setActivePin(JSON.parse(savedActive));
        }
    }, []);

    // 2. Persist
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

    // 3. Logic: Pinning replaces the Active Pin and adds to History
    const setPin = (plan: Plan) => {
        setActivePin(plan);
        setPinnedHistory(prev => {
            // Move to top if exists, or add new
            const others = prev.filter(p => p.id !== plan.id);
            return [plan, ...others];
        });
    };

    const clearPin = () => {
        setActivePin(null);
    };

    const removeFromHistory = (id: string) => {
        setPinnedHistory(prev => prev.filter(p => p.id !== id));
        if (activePin?.id === id) {
            setActivePin(null); // Unpin if removing the active one
        }
    };

    return (
        <CompareContext.Provider value={{
            activePin,
            pinnedHistory,
            setPin,
            clearPin,
            removeFromHistory
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