/**
 * LocalDB Namespace Object
 *
 * Creates the default export namespace object combining all modules.
 * This file contains the logic for creating the namespace, keeping index.ts export-only.
 */

import * as base from './base';
import * as store from './store';
import * as cache from './cache';
import * as draft from './draft';

// Create namespace object combining all modules
// Type assertion ensures proper TypeScript inference
const localDB = {
  ...base,
  ...store,
  ...cache,
  ...draft,
} as typeof base & typeof store & typeof cache & typeof draft;

export default localDB;
