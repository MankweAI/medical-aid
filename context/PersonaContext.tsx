'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface UserState {
    income: number;
    members: { main: number; adult: number; child: number };
    persona: string | null;
    filters: {
        network: 'Any' | 'Coastal' | 'Network' | 'State' | null;
        chronic: 'Basic' | 'Comprehensive' | 'None' | null;
        savings: 'Yes' | 'No' | null;
        maternity: boolean;
    };
}

interface PersonaContextType {
    state: UserState;
    setIncome: (val: number) => void;
    setMembers: (val: { main: number; adult: number; child: number }) => void;
    setPersona: (slug: string) => void;
    setFilter: (key: keyof UserState['filters'], value: any) => void;
    activePersonaPath: string;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<UserState>({
        income: 20000,
        members: { main: 1, adult: 0, child: 0 },
        persona: null,
        filters: {
            network: null,
            chronic: null,
            savings: null,
            maternity: false
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_profile');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setState(prev => ({ ...prev, ...parsed, filters: { ...prev.filters, ...parsed.filters } }));
                } catch (e) {
                    console.error("Failed to parse profile", e);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('healthos_profile', JSON.stringify(state));
        }
    }, [state]);

    const setIncome = useCallback((val: number) => setState(prev => ({ ...prev, income: val })), []);
    const setMembers = useCallback((val: { main: number; adult: number; child: number }) => setState(prev => ({ ...prev, members: val })), []);
    const setPersona = useCallback((slug: string) => setState(prev => ({ ...prev, persona: slug })), []);

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