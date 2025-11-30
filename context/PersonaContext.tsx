'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the Global State Shape
interface UserState {
    income: number;
    members: { main: number; adult: number; child: number };
    persona: string | null; // e.g., 'family-planner'
}

interface PersonaContextType {
    state: UserState;
    setIncome: (val: number) => void;
    setMembers: (val: { main: number; adult: number; child: number }) => void;
    setPersona: (slug: string) => void;
    activePersonaPath: string; // <--- New Property
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<UserState>({
        income: 20000,
        members: { main: 1, adult: 0, child: 0 },
        persona: null
    });

    // 1. Hydrate from Local Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_profile');
            if (saved) {
                try {
                    setState(JSON.parse(saved));
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

    // 3. Derive the Active Path (The "Return to Workbench" Link)
    const activePersonaPath = state.persona
        ? `/personas/${state.persona}?income=${state.income}`
        : '/';

    return (
        <PersonaContext.Provider value={{ state, setIncome, setMembers, setPersona, activePersonaPath }}>
            {children}
        </PersonaContext.Provider>
    );
}

export function usePersona() {
    const context = useContext(PersonaContext);
    if (!context) throw new Error('usePersona must be used within a PersonaProvider');
    return context;
}