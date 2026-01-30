/**
 * LocalDB - Index file
 *
 * This module re-exports all localDB functionality.
 * Supports both named imports and default namespace import.
 *
 * Usage:
 *   import localDB from 'localDB';
 *   await localDB.getCache('key');
 *
 *   OR
 *
 *   import { getCache } from 'localDB';
 *   await getCache('key');
 */

// Re-export base utilities (for named imports)
export * from './base';

// Re-export store functions (for named imports)
export * from './store';

// Re-export cache module (for named imports)
export * from './cache';

// Re-export draft module (for named imports)
export * from './draft';

// Re-export default namespace object
export { default } from './namespace';
