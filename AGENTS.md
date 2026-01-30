# Restaurant FE - Coding Standards

## Project Structure

### Folder Organization
- **Pages**: Each page/feature has its own folder under `src/pages/`
  - **Page folder naming**: Must use PascalCase (e.g., `Home`, `Sample`, `Dashboard`, `Products`)
  - Main component file: `index.tsx` (e.g., `src/pages/Sample/index.tsx`)
  - **Index files**: Must only contain `export { default } from "./ComponentName";` (e.g., `export { default } from "./Sample";`)
  - Component file: Separate file with PascalCase name (e.g., `Sample.tsx`, `SampleCreate.tsx`)
  - **Sub-components/Tabs**: Each component or tab within a page should be in its own folder (e.g., `Details/`, `Settings/`, `History/`)
    - Each sub-component folder follows the same structure: `ComponentName.tsx`, `index.tsx`, `ComponentName.module.scss`, `types.ts` (if needed)
  - Related modals: In the same folder or sub-folder as needed
  - Styles: Component-specific SCSS module (e.g., `Sample.module.scss`)
  - Folder names should match URL routes where applicable

- **Atomic Components**: Super basic, highly reusable components in `src/atomic-components/`
  - Examples: `Button`, `AutocompleteInput`, `NumberInput`, `TextInput`, `Checkbox`, `DatePicker`, etc.
  - **Folder naming**: Must use PascalCase (e.g., `Button`, `AutocompleteInput`, `Checkbox`)
  - **Component structure**: Each component must be in its own folder with:
    - `ComponentName.tsx`: Main component file
    - `index.tsx`: Must only contain `export { default } from './ComponentName';`
    - `types.ts`: All TypeScript types/interfaces for the component (props, etc.)
    - `ComponentName.module.scss`: Component-specific styles
  - These components should be standalone and highly reusable across the application

- **Components**: Reusable feature-level components in `src/components/`
  - Each component in its own folder following the same structure as atomic-components
  - Component-specific styles in `ComponentName.module.scss`
  - Types in `types.ts` file within the component folder

- **Types**: Shared TypeScript types/interfaces go in `src/types/`
  - One file per domain (e.g., `preferences.ts`, `category.ts`)
  - Export interfaces/types, not default exports for types
  - Use descriptive names (e.g., `Preference`, `Category`, `Product`)
  - Component-specific types should be in the component's `types.ts` file, not here

- **Utils**: Utility functions in `src/utils/`
  - `constants.ts`: API routes and UI routes
  - `cacheUtils.ts`: Cache key management utilities
  - Other utility files as needed

- **LocalDB**: Local database operations in `src/localDB/`
  - Domain-specific modules organized by feature (mirrors backend API structure)
  - `base.ts`: Base utilities (openDatabase, getStoreName, DataRecord)
  - `store.ts`: Generic storage functions (storeData, getData, removeData, form data functions)
  - `cache/`: Cache operations (storeCache, getCache, removeCache)
  - `draft/`: Draft management (create, read, update, delete)
  - `index.ts`: Re-exports all modules (export-only, no logic)
  - `namespace.ts`: Namespace object for default import
  - **Import pattern**: Use namespace import `import localDB from 'localDB'` and access via `localDB.getCache()`, `localDB.storeDraft()`, etc.

### File Naming
- Components: PascalCase (e.g., `AddItemModal.tsx`, `Sample.tsx`)
- Styles: `ComponentName.module.scss`
- Types: `types.ts` (within component folders) or camelCase for shared types (e.g., `preferences.ts`, `category.ts`)
- Pages: PascalCase folder names (e.g., `Sample/`, `Home/`, `Dashboard/`)
- Atomic Components: PascalCase folder names (e.g., `Button/`, `Checkbox/`, `AutocompleteInput/`)

## Code Patterns

### Imports
- Use absolute imports with `baseUrl: "src"` (e.g., `import Button from "atomic-components/Button"`)
- Group imports: React → third-party → atomic-components → components → localDB → utils → types → styles
- Example:
  ```typescript
  import React, { useEffect, useState, useCallback } from "react";
  import { Modal, Form } from "react-bootstrap";
  import Button from "atomic-components/Button";
  import localDB from "localDB";
  import { API_ROUTES } from "utils/constants";
  import styles from "./ComponentName.module.scss";
  import { Preference } from "types/preferences";
  ```

### Component Structure
1. Imports
2. Type definitions (import from `types.ts` file in same folder, or from `types/` for shared types)
3. Component function
4. State management with `useState` or Zustand for global state
5. Data fetching with Tanstack Query (`useQuery`, `useMutation`)
6. Event handlers
7. Render logic
8. Export default

### State Management
- Use `useState` for local component state
- Use **Zustand** for global state management (shared across components)
- Use `useCallback` for async functions and event handlers to prevent unnecessary re-renders
- Use `useMemo` for expensive computations (e.g., filtering arrays)
- Toast state pattern:
  ```typescript
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  ```

### API Calls
- **This is an offline-first application** - Always design with offline capabilities in mind
- Always use **Tanstack Query** (`@tanstack/react-query`) for API calls
- Use `useQuery` for GET requests (data fetching)
- Use `useMutation` for POST, PATCH, PUT, DELETE requests (data mutations)
- **Cache API responses** in IndexedDB for offline access
- **Sync strategy**: When online, fetch from API and update IndexedDB cache; when offline, read from IndexedDB cache
- Provide TypeScript generics for response types
- Handle errors with error callbacks and show toast notifications
- Use `API_ROUTES` from `utils/constants` for endpoints
- Consider network status when making API calls - gracefully handle offline scenarios
- Example with `useQuery`:
  ```typescript
  import { useQuery } from "@tanstack/react-query";
  import { API_ROUTES } from "utils/constants";
  
  const { data, isLoading, error } = useQuery<DataType[]>({
    queryKey: ["dataKey"],
    queryFn: async () => {
      const response = await fetch(API_ROUTES.ENDPOINT);
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });
  ```
- Example with `useMutation`:
  ```typescript
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newData: DataType) => {
      const response = await fetch(API_ROUTES.ENDPOINT, {
        method: "POST",
        body: JSON.stringify(newData),
      });
      if (!response.ok) throw new Error("Failed to create");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataKey"] });
      showToast("Item created successfully", "success");
    },
    onError: (error) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create item.";
      showToast(errorMessage, "error");
    },
  });
  ```

### Global State with Zustand
- Use Zustand for global state that needs to be shared across multiple components
- Create stores in appropriate locations (e.g., `src/stores/` or `src/contexts/`)
- **Offline-first consideration**: For critical state that needs to persist across sessions, consider persisting to IndexedDB
- Example:
  ```typescript
  import { create } from "zustand";
  
  interface StoreState {
    count: number;
    increment: () => void;
    decrement: () => void;
  }
  
  export const useStore = create<StoreState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));
  ```

### Error Handling
- Always handle errors in Tanstack Query callbacks (`onError` in mutations, error state in queries)
- Extract error messages: `error instanceof Error ? error.message : "Default message"`
- Show user-friendly error messages via Toast component
- **Offline error handling**: When network requests fail due to offline status, fall back to cached data from IndexedDB
- Provide retry functionality for failed data loads (Tanstack Query handles this automatically)
- Distinguish between network errors and other errors - show appropriate messages for offline scenarios

### Modal Pattern
- Each modal is a separate component file
- Props interface: `show`, `onHide`, `onSuccess`, `onError`
- Use `react-bootstrap` Modal component
- Reset form state when modal opens/closes
- Example:
  ```typescript
  interface AddItemModalProps {
    show: boolean;
    onHide: () => void;
    onSuccess: (item: Item) => void;
    onError: (message: string) => void;
  }
  ```

### Routing
- Define all routes in `src/utils/constants.ts` under `ROUTES` object
- Use nested route objects for sub-routes (e.g., `ROUTES.SAMPLE.CREATE`)
- Import routes from constants, don't hardcode paths
- Update `App.tsx` with new routes

### Styling
- Use CSS Modules (`.module.scss`) for component-specific styles
- **Always use CSS variables from `:root` in `index.css` as much as possible**
- Reference CSS variables using `var(--variable-name)` (e.g., `var(--color-primary)`, `var(--color-text)`)
- Follow BEM-like naming conventions
- Use HSL color format when defining new variables: `hsl(222.2 47.4% 11.2%)`
- Responsive design with media queries
- Common class names:
  - `.container`: Main wrapper
  - `.header`: Page header with title
  - `.emptyState`: Empty state message
  - `.errorState`: Error state container
  - `.tableHeader`, `.tableBody`, `.tableRow`: Table structure

### TypeScript
- Use strict typing for all props, state, and API responses
- Define component-specific types in `types.ts` file within the component folder
- Define shared types in `src/types/` folder, not inline
- Use interfaces for object shapes
- Use type unions for specific string literals (e.g., `"success" | "error"`)
- Avoid `any` type - use `unknown` if type is truly unknown

### Component Props
- Always define explicit prop interfaces in `types.ts` file
- Use descriptive prop names
- Include JSDoc comments for complex props if needed

### Data Fetching Pattern with Tanstack Query (Offline-First)
```typescript
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "utils/constants";
import localDB from "localDB";

const { data, isLoading, error } = useQuery<DataType[]>({
  queryKey: ["dataKey"],
  queryFn: async () => {
    // Try to fetch from API first
    try {
      const response = await fetch(API_ROUTES.ENDPOINT);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      
      // Cache in IndexedDB for offline access
      await localDB.storeCache("dataKey", data);
      return data;
    } catch (networkError) {
      // If offline, try to get from IndexedDB cache
      const cachedData = await localDB.getCache<DataType[]>("dataKey");
      if (cachedData) {
        return cachedData;
      }
      throw networkError;
    }
  },
  // Use cached data as initial data while fetching
  placeholderData: async () => {
    return await localDB.getCache<DataType[]>("dataKey");
  },
});

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
```

### Success/Error Handling Pattern with Tanstack Query (Offline-First)
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import localDB from "localDB";

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: async (item: Item) => {
    // Try API call first
    try {
      const response = await fetch(API_ROUTES.ENDPOINT, {
        method: "POST",
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error("Failed to create");
      const newItem = await response.json();
      
      // Cache in IndexedDB
      await localDB.storeCache("dataKey", newItem);
      return newItem;
    } catch (error) {
      // If offline, queue for sync later or save to IndexedDB as pending
      // For now, throw error to show user feedback
      throw error;
    }
  },
  onSuccess: (newItem) => {
    queryClient.invalidateQueries({ queryKey: ["dataKey"] });
    showToast("Item added successfully", "success");
  },
  onError: (error) => {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to add item.";
    
    // Check if offline and show appropriate message
    if (!navigator.onLine) {
      showToast("You are offline. Changes will sync when online.", "warning");
    } else {
      showToast(errorMessage, "error");
    }
  },
});
```

## Storage Patterns

### localStorage vs IndexedDB

**Use localStorage for:**
- Small, simple data needs
- User preferences (e.g., dark mode setting, UI preferences)
- Application flags and simple configuration
- Session tokens (though IndexedDB is preferred for security-sensitive tokens)
- Quick implementation for straightforward use cases
- Synchronous access is acceptable

**Use IndexedDB for:**
- Data-intensive applications
- **Offline-first applications** (this project)
- Caching large API responses
- Storing images/media files
- Managing complex application states
- Efficient searching and querying
- Data integrity requirements
- Asynchronous operations
- Large datasets (>5MB)
- Structured data with relationships

**Guidelines:**
- **Default to IndexedDB** for this offline-first application
- Use `localDB` module for all IndexedDB operations
- **Import pattern**: Use namespace import `import localDB from 'localDB'` and access functions via `localDB.getCache()`, `localDB.storeDraft()`, etc.
- **Module structure**: Domain-specific modules in `src/localDB/` (e.g., `draft/`, `cache/`, `store/`)
- Always cache API responses in IndexedDB for offline access
- Implement sync strategies: fetch from API when online, read from IndexedDB when offline
- Use cache keys with company/user context when needed (see `cacheUtils.ts`)

### LocalDB Module Structure

The `localDB` module is organized by domain/feature, mirroring backend API structure:

```
src/localDB/
  ├── base.ts          # Base utilities (openDatabase, getStoreName, DataRecord)
  ├── store.ts         # Generic storage (storeData, getData, removeData, form data functions)
  ├── cache/           # Cache operations
  │   ├── cache.ts     # storeCache, getCache, removeCache
  │   └── index.ts
  ├── draft/           # Draft management
  │   ├── create.ts    # storeDraft, generateDraftId
  │   ├── read.ts      # getDraft, getAllDrafts
  │   ├── update.ts    # updateDraft, updateDraftMetadata
  │   ├── delete.ts    # deleteDraft
  │   ├── types.ts     # DraftMetadata, DraftData
  │   └── index.ts
  ├── index.ts         # Re-exports all modules (export-only)
  └── namespace.ts    # Namespace object for default import
```

**Usage Examples:**

```typescript
// Namespace import (recommended)
import localDB from 'localDB';

// Cache operations
await localDB.storeCache('csv_data', parsedData);
const cached = await localDB.getCache<MyType[]>('csv_data');
await localDB.removeCache('csv_data');

// Draft operations
const draftId = localDB.generateDraftId();
await localDB.storeDraft(draftId, formData, 'Sample Draft', 'Form');
const draft = await localDB.getDraft<FormData>(draftId);
const allDrafts = await localDB.getAllDrafts();
await localDB.deleteDraft(draftId);

// Form data operations
await localDB.storeFormData(formData);
const formData = await localDB.getFormData<FormData>();
await localDB.removeFormData();

// Or with custom storage key
await localDB.storeFormData(formData, 'my_custom_key');
const formData = await localDB.getFormData<FormData>('my_custom_key');
await localDB.removeFormData('my_custom_key');

// Named imports (also supported)
import { getCache, storeDraft } from 'localDB';
await getCache('key');
await storeDraft(id, data);
```

**Important:**
- **Never import directly from sub-modules** (e.g., `from 'localDB/cache'`) - always use `from 'localDB'`
- **Use namespace pattern** (`import localDB from 'localDB'`) for consistency
- Each domain module (draft, cache) has its own CRUD operations following backend API patterns

## Best Practices

1. **Always use TypeScript** - No `any` types, proper interfaces
2. **Offline-first design** - Always consider offline scenarios when building features
3. **Consistent error handling** - Use Tanstack Query error handling with user-friendly messages
4. **Toast notifications** - For all user actions (success/error)
5. **Loading states** - Use Tanstack Query `isLoading` state for loading indicators
6. **Empty states** - Provide helpful messages when no data exists
7. **Accessibility** - Use `aria-label` for icon-only buttons
8. **Code organization** - Keep related files together in feature folders
9. **Reusability** - Extract common patterns into utility functions or atomic components
10. **Performance** - Use `useCallback` and `useMemo` appropriately
11. **Consistency** - Follow existing patterns in the codebase
12. **CSS Variables** - Always prefer CSS variables from `:root` over hardcoded values
13. **Component Structure** - Each component must have its own folder with `ComponentName.tsx`, `index.tsx`, `types.ts`, and `ComponentName.module.scss`
14. **Cache management** - Always cache API responses in IndexedDB for offline access
15. **Network awareness** - Check network status and gracefully handle offline scenarios

## React Router
- Use React Router v6 with future flags for v7 compatibility
- Wrap routes in `BrowserRouter` with future flags:
  ```typescript
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
  ```

## Testing
- Use Jest and React Testing Library
- Wrap components in `MemoryRouter` for route testing
- Use future flags in test routers too

## Tooling & Automation
- Always outline and confirm your planned changes before editing any code, even if the user doesn't explicitly request it.
- Do not start coding until the requester clearly gives the go signal (e.g., "Go ahead" or "Implement now").
- Always run `npm run format` after making code changes to keep formatting consistent.
- Run `npm run quick-test` and fix every reported issue before considering the work complete.

## Refresh Button Pattern

Use the reusable `RefreshButton` component (`src/atomic-components/RefreshButton`) for consistent refresh functionality.

**Pattern**: Use separate `loading` (initial load) and `reloading` (refresh) states. The header stays visible during refresh; only content below shows a loading overlay.

**State & Function**:
```typescript
const [loading, setLoading] = useState(true);
const [reloading, setReloading] = useState(false);

const loadData = useCallback(
  async (isReload = false) => {
    if (isReload) setReloading(true);
    else setLoading(true);
    try {
      // ... fetch data ...
    } finally {
      if (isReload) setReloading(false);
      else setLoading(false);
    }
  },
  [dependencies],
);
```

**Structure**:
```typescript
{loading ? (
  <div className={styles.loadingState}>Loading...</div>
) : (
  <div className={`${styles.contentWrapper} ${reloading ? styles.contentReloading : ''}`}>
    {reloading && <div className={styles.loadingOverlay}>Loading...</div>}
    {/* Content */}
  </div>
)}
```

**Required CSS**: `.contentWrapper`, `.contentReloading`, `.loadingOverlay` (see existing pages for examples).

## Component Folder Structure

Every component (atomic-components, components, and page sub-components) must follow this structure:

```
ComponentName/
├── ComponentName.tsx       # Main component file
├── index.tsx              # export { default } from './ComponentName';
├── types.ts               # All TypeScript types/interfaces for this component
└── ComponentName.module.scss  # Component-specific styles
```

**Example - Atomic Component**:
```
atomic-components/
└── Button/
    ├── Button.tsx
    ├── index.tsx          # export { default } from './Button';
    ├── types.ts           # ButtonProps interface
    └── Button.module.scss
```

**Example - Page with Sub-components**:
```
pages/
└── Sample/
    ├── Sample.tsx
    ├── index.tsx          # export { default } from './Sample';
    ├── Sample.module.scss
    ├── Details/
    │   ├── Details.tsx
    │   ├── index.tsx      # export { default } from './Details';
    │   └── types.ts       # DetailsProps interface (if needed)
    └── Settings/
        ├── Settings.tsx
        ├── index.tsx      # export { default } from './Settings';
        └── types.ts       # SettingsProps interface (if needed)
```
