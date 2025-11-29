'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SelectedPlan {
    id: string;
    name: string;
    scheme: string;
    price?: number; // Added for the Saved View
}

interface CompareContextType {
    selectedPlans: SelectedPlan[];
    savedPlans: SelectedPlan[]; // NEW: The Vault
    togglePlan: (plan: SelectedPlan) => void;
    toggleSave: (plan: SelectedPlan) => void; // NEW: Bookmark Action
    clearSelection: () => void;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [selectedPlans, setSelectedPlans] = useState<SelectedPlan[]>([]);
    const [savedPlans, setSavedPlans] = useState<SelectedPlan[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // 1. Hydrate from Local Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const compareSaved = localStorage.getItem('healthos_compare');
            const vaultSaved = localStorage.getItem('healthos_vault'); // Load Bookmarks

            if (compareSaved) setSelectedPlans(JSON.parse(compareSaved));
            if (vaultSaved) setSavedPlans(JSON.parse(vaultSaved));
        }
    }, []);

    // 2. Persist to Local Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('healthos_compare', JSON.stringify(selectedPlans));
            localStorage.setItem('healthos_vault', JSON.stringify(savedPlans)); // Save Bookmarks
        }
    }, [selectedPlans, savedPlans]);

    // 3. Compare Logic (Max 2)
    const togglePlan = (plan: SelectedPlan) => {
        setSelectedPlans(prev => {
            const exists = prev.find(p => p.id === plan.id);
            if (exists) return prev.filter(p => p.id !== plan.id);
            if (prev.length >= 2) return prev; // Limit to 2
            return [...prev, plan];
        });
        setIsOpen(true);
    };

    // 4. Bookmark Logic (Unlimited)
    const toggleSave = (plan: SelectedPlan) => {
        setSavedPlans(prev => {
            const exists = prev.find(p => p.id === plan.id);
            if (exists) return prev.filter(p => p.id !== plan.id); // Remove
            return [...prev, plan]; // Add
        });
    };

    const clearSelection = () => {
        setSelectedPlans([]);
        setIsOpen(false);
        localStorage.removeItem('healthos_compare');
    };

    return (
        <CompareContext.Provider value={{
            selectedPlans,
            savedPlans,
            togglePlan,
            toggleSave,
            clearSelection,
            isOpen,
            setIsOpen
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