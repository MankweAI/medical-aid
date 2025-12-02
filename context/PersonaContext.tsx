'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { resolveRegion } from '@/utils/geo';

// --- TYPES ---
interface UserState {
    income: number;
    members: { main: number; adult: number; child: number };
    personas: string[];
    postalCode: string;
    region: string;
    isDigitalActive: boolean;
    persona: string; // Required string
}

interface PersonaContextType {
    state: UserState;
    setIncome: (val: number) => void;
    setMembers: (val: { main: number; adult: number; child: number }) => void;
    setPersona: (slug: string) => void;
    togglePersona: (slug: string) => void;
    setPostalCode: (code: string) => void;
    toggleDigital: () => void;
    activePersonaPath: string;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

// --- PROVIDER ---
export function PersonaProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<UserState>({
        income: 20000,
        members: { main: 1, adult: 0, child: 0 },
        personas: [],
        postalCode: '',
        region: 'National',
        isDigitalActive: false,
        persona: '', // FIX 1: Initialize this property to empty string
    });

    // 1. Hydrate from Local Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_profile');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);

                    // Migration: Ensure consistency between string and array
                    if (parsed.persona && (!parsed.personas || parsed.personas.length === 0)) {
                        parsed.personas = [parsed.persona];
                    } else if (!parsed.persona && parsed.personas && parsed.personas.length > 0) {
                        parsed.persona = parsed.personas[0];
                    } else if (!parsed.persona) {
                        parsed.persona = '';
                    }

                    setState(prev => ({ ...prev, ...parsed }));
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

    // --- ACTIONS ---

    const setIncome = useCallback((val: number) =>
        setState(prev => ({ ...prev, income: val })), []);

    const setMembers = useCallback((val: { main: number; adult: number; child: number }) =>
        setState(prev => ({ ...prev, members: val })), []);

    // Action: Set Single Persona
    // FIX 2: Update 'persona' (string) AND 'personas' (array) together
    const setPersona = useCallback((slug: string) =>
        setState(prev => ({
            ...prev,
            persona: slug,
            personas: [slug]
        })), []);

    // Action: Toggle Persona (Stacking)
    const togglePersona = useCallback((slug: string) => {
        setState(prev => {
            const exists = prev.personas.includes(slug);
            const newPersonas = exists
                ? prev.personas.filter(p => p !== slug)
                : [...prev.personas, slug];

            // If we removed the currently active 'persona' string, fallback to the first available or empty
            const newPersonaString = (prev.persona === slug && newPersonas.length > 0)
                ? newPersonas[0]
                : (prev.persona === slug) ? '' : prev.persona;

            return {
                ...prev,
                personas: newPersonas,
                persona: newPersonaString
            };
        });
    }, []);

    const setPostalCode = useCallback((code: string) => {
        const resolvedRegion = resolveRegion(code);
        setState(prev => ({
            ...prev,
            postalCode: code,
            region: resolvedRegion
        }));
    }, []);

    const toggleDigital = useCallback(() =>
        setState(prev => ({ ...prev, isDigitalActive: !prev.isDigitalActive })), []);

    const activePersonaPath = state.personas.length > 0
        ? `/personas/${state.personas.join(',')}?income=${state.income}`
        : '/';

    return (
        <PersonaContext.Provider value={{
            state,
            setIncome,
            setMembers,
            setPersona,
            togglePersona,
            setPostalCode,
            toggleDigital,
            activePersonaPath
        }}>
            {children}
        </PersonaContext.Provider>
    );
}

export function usePersona() {
    const context = useContext(PersonaContext);
    if (!context) throw new Error('usePersona must be used within a PersonaProvider');
    return context;
}