/**
 * Database Schema Types
 *
 * This folder contains TypeScript type definitions for all database collections
 * used in the core banking system. These types represent the exact structure
 * of documents as they are stored in the database.
 *
 * Collections:
 * - users: Admin user profiles (user ID as document ID)
 * - cifClient: Core client information (ClientID as document ID)
 * - cifTitle: Client title lookup table (TitleID as document ID)
 * - cifClientNameSuffix: Client name suffix lookup table (SuffixID as document ID)
 * - cifEducation: Education level lookup table (EducationID as document ID)
 * - cifRelation: Client relationship records (RelationID as document ID)
 *
 * Usage:
 * Import these types when working with database documents to ensure
 * type safety and understand the expected structure.
 */

export * from '../src/types/cifClient';
export * from '../src/types/cifTitle';
export * from '../src/types/cifClientNameSuffix';
export * from '../src/types/cifEducation';
export * from '../src/types/cifRelation';
