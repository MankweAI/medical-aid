'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PersonaContextType {
    activePersonaPath: string | null;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
    const [activePersonaPath, setActivePersonaPath] = useState<string | null>(null);
    const pathname = usePathname();

    // Track the last active persona page
    useEffect(() => {
        if (pathname.startsWith('/personas/')) {
            setActivePersonaPath(pathname);
            // Optional: Persist to localStorage if needed across reloads
            // localStorage.setItem('healthos_active_persona', pathname);
        }
    }, [pathname]);

    // Optional: Hydrate from localStorage
    // useEffect(() => {
    //     const saved = localStorage.getItem('healthos_active_persona');
    //     if (saved) setActivePersonaPath(saved);
    // }, []);

    return (
        <PersonaContext.Provider value={{ activePersonaPath }}>
            {children}
        </PersonaContext.Provider>
    );
}

export function usePersona() {
    const context = useContext(PersonaContext);
    if (!context) throw new Error('usePersona must be used within a PersonaProvider');
    return context;
}
