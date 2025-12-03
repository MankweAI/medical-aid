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
    persona: string; // Focus on the Single Active Persona for Simulation
    activeScheme: string; // Filter by Scheme
    isGapCoverActive: boolean; // Gap Cover Toggle
}

interface PersonaContextType {
    state: UserState;
    setIncome: (val: number) => void;
    setMembers: (val: { main: number; adult: number; child: number }) => void;
    setPersona: (slug: string) => void;
    togglePersona: (slug: string) => void;
    setPostalCode: (code: string) => void;
    toggleDigital: () => void;
    setActiveScheme: (scheme: string) => void;
    toggleGapCover: () => void;

    // --- COMPARISON ENGINE ---
    comparedPlanIds: string[];
    togglePlanComparison: (planId: string) => void;
    clearComparisons: () => void;

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
        persona: '',
        activeScheme: 'All Schemes',
        isGapCoverActive: false,
    });

    // Local state for comparison (not persisted to profile for now, or could be)
    const [comparedPlanIds, setComparedPlanIds] = useState<string[]>([]);

    // 1. Hydrate from Local Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('healthos_profile');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Migration: Ensure consistency
                    if (parsed.persona && (!parsed.personas || parsed.personas.length === 0)) {
                        parsed.personas = [parsed.persona];
                    } else if (!parsed.persona && parsed.personas && parsed.personas.length > 0) {
                        parsed.persona = parsed.personas[0];
                    } else if (!parsed.persona) {
                        parsed.persona = '';
                    }
                    // Ensure activeScheme exists
                    if (!parsed.activeScheme) {
                        parsed.activeScheme = 'All Schemes';
                    }
                    // Ensure isGapCoverActive exists
                    if (parsed.isGapCoverActive === undefined) {
                        parsed.isGapCoverActive = false;
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

    const setPersona = useCallback((slug: string) =>
        setState(prev => ({
            ...prev,
            persona: slug,
            personas: [slug]
        })), []);

    const togglePersona = useCallback((slug: string) => {
        setState(prev => {
            const exists = prev.personas.includes(slug);
            const newPersonas = exists
                ? prev.personas.filter(p => p !== slug)
                : [...prev.personas, slug];

            const newPersonaString = (prev.persona === slug && newPersonas.length > 0)
                ? newPersonas[0]
                : (prev.persona === slug) ? '' : prev.persona;

            return {
                ...prev,
                personas: newPersonas,
                persona: newPersonaString // Prioritize single active string
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

    const setActiveScheme = useCallback((scheme: string) =>
        setState(prev => ({ ...prev, activeScheme: scheme })), []);

    const toggleGapCover = useCallback(() =>
        setState(prev => ({ ...prev, isGapCoverActive: !prev.isGapCoverActive })), []);

    // --- COMPARISON ACTIONS ---
    const togglePlanComparison = useCallback((planId: string) => {
        setComparedPlanIds(prev => {
            if (prev.includes(planId)) {
                return prev.filter(id => id !== planId);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, planId];
        });
    }, []);

    const clearComparisons = useCallback(() => setComparedPlanIds([]), []);

    // --- FIX: POINT TO SIMULATION ROUTE ---
    const activePersonaPath = state.persona
        ? `/simulate/${state.persona}?income=${state.income}`
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
            setActiveScheme,
            toggleGapCover,
            comparedPlanIds,
            togglePlanComparison,
            clearComparisons,
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