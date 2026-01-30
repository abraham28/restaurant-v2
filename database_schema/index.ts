/**
 * Database Schema Types
 *
 * This file contains TypeScript type definitions for all database collections
 * used in the application. These types represent the exact structure
 * of documents as they are stored in the database.
 *
 * Usage:
 * Import these types when working with database documents to ensure
 * type safety and understand the expected structure.
 *
 * Example:
 * ```typescript
 * import { User, Product, Order } from 'database_schema';
 * ```
 *
 * To add new schema types:
 * 1. Create a new type file in `src/types/` (e.g., `user.ts`, `product.ts`)
 * 2. Export the types from that file
 * 3. Add an export statement below to re-export from this index
 */

// Example: Export types from src/types directory
// Uncomment and modify these exports based on your actual type files

// export * from '../src/types/user';
// export * from '../src/types/product';
// export * from '../src/types/order';
// export * from '../src/types/category';

// Generic example export (if you have a preferences type)
export * from '../src/types/preferences';
