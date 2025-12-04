'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the Global State Shape
interface UserState {
    income: number;
    members: { main: number; adult: number; child: number };
    persona: string | null;
    filters: {
        location: string; // e.g., 'Any', 'Coastal', 'Network'
        mustHaves: string[]; // e.g., ['private_ward', 'gap_cover']
    };
}

interface PersonaContextType {
    state: UserState;
    setIncome: (val: number) => void;
    setMembers: (val: { main: number; adult: number; child: number }) => void;
    setPersona: (slug: string) => void;
    setFilter: (key: keyof UserState['filters'], value: any) => void; // Generic setter
    activePersonaPath: string;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<UserState>({
        income: 20000,
        members: { main: 1, adult: 0, child: 0 },
        persona: null,
        filters: {
            location: 'Any',
            mustHaves: []
        }
    });

    // 1. Hydrate from Local Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_profile');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Merge with default to ensure new fields (filters) exist if legacy data is found
                    setState(prev => ({ ...prev, ...parsed, filters: parsed.filters || prev.filters }));
                } catch (e) {
                    console.error("Failed to parse profile", e);
                }
            }
        }
    }, []);

    // 2. Persist Updates
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('healthos_profile', JSON.stringify(state));
        }
    }, [state]);

    // Helpers
    const setIncome = useCallback((val: number) => setState(prev => ({ ...prev, income: val })), []);
    const setMembers = useCallback((val: { main: number; adult: number; child: number }) => setState(prev => ({ ...prev, members: val })), []);
    const setPersona = useCallback((slug: string) => setState(prev => ({ ...prev, persona: slug })), []);

    // New: Generic Filter Setter
    const setFilter = useCallback((key: keyof UserState['filters'], value: any) => {
        setState(prev => ({
            ...prev,
            filters: { ...prev.filters, [key]: value }
        }));
    }, []);

    const activePersonaPath = state.persona
        ? `/personas/${state.persona}?income=${state.income}`
        : '/';

    return (
        <PersonaContext.Provider value={{ state, setIncome, setMembers, setPersona, setFilter, activePersonaPath }}>
            {children}
        </PersonaContext.Provider>
    );
}

export function usePersona() {
    const context = useContext(PersonaContext);
    if (!context) throw new Error('usePersona must be used within a PersonaProvider');
    return context;
}