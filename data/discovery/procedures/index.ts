/**
 * Centralized Procedure Data Exports
 * 
 * This file consolidates all procedure definitions for use by the resolver.
 * Each category is defined in its own file for maintainability.
 */

import { Procedure } from '@/types/schemes/discovery';
import { SCOPE_PROCEDURES } from './scopes';
import { DENTAL_PROCEDURES } from './dental';
import { OPHTHALMOLOGY_PROCEDURES } from './ophthalmology';
import { ENT_PROCEDURES } from './ent';
import { MAJOR_JOINT_PROCEDURES } from './major-joints';

/**
 * All procedures combined
 * The resolver will use this to find procedures by ID
 */
export const ALL_PROCEDURES: Procedure[] = [
    ...SCOPE_PROCEDURES,
    ...DENTAL_PROCEDURES,
    ...OPHTHALMOLOGY_PROCEDURES,
    ...ENT_PROCEDURES,
    ...MAJOR_JOINT_PROCEDURES,
];

/**
 * Export individual categories for targeted queries
 */
export {
    SCOPE_PROCEDURES,
    DENTAL_PROCEDURES,
    OPHTHALMOLOGY_PROCEDURES,
    ENT_PROCEDURES,
    MAJOR_JOINT_PROCEDURES,
};

/**
 * Procedure categories for routing/filtering
 */
export const PROCEDURE_CATEGORIES = [
    'scope',
    'dental',
    'ophthalmology',
    'ent',
    'major_joint',
] as const;

export type ProcedureCategory = typeof PROCEDURE_CATEGORIES[number];
