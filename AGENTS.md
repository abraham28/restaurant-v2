# Abrasoft Accounting React - Coding Standards

## Project Structure

### Folder Organization
- **Pages**: Each page/feature has its own folder under `src/pages/`
  - Main component file: `index.tsx` (e.g., `src/pages/pos/Customers/index.tsx`)
  - **Index files**: Must only contain `export { default } from "./ComponentName";` (e.g., `export { default } from "./Customers";`)
  - Component file: Separate file with PascalCase name (e.g., `Customers.tsx`, `Products.tsx`, `Transactions.tsx`)
  - Related modals: In the same folder (e.g., `AddCustomerModal.tsx`, `EditCustomerModal.tsx`)
  - Styles: Component-specific SCSS module (e.g., `Customers.module.scss`)
  - **Folder names with index.tsx**: Must use CapitalLetters for the first letter (e.g., `pos/Customers/`, `pos/Products/`, `pos/Transactions/`)
  - Folder names should match URL routes (e.g., `/pos/customers` → `src/pages/pos/Customers/`)

- **Types**: All TypeScript types/interfaces go in `src/types/`
  - One file per domain (e.g., `preferences.ts`, `category.ts`)
  - Export interfaces/types, not default exports for types
  - Use descriptive names (e.g., `Preference`, `Category`, `Product`)

- **Components**: Reusable components in `src/components/`
  - Each component in its own file
  - Component-specific styles in `ComponentName.module.scss`

- **Utils**: Utility functions in `src/utils/`
  - `fetchUtils.ts`: API call helpers (`clientAuthorizedGet`, `clientAuthorizedPost`, `clientAuthorizedPatch`, `clientAuthorizedDelete`)
  - `constants.ts`: API routes and UI routes
  - Other utility files as needed

### File Naming
- Components: PascalCase (e.g., `AddCustomerModal.tsx`)
- Styles: `ComponentName.module.scss`
- Types: camelCase (e.g., `preferences.ts`, `category.ts`)
- Pages: lowercase folder names matching routes (e.g., `pos/customers/`)
- **Folders with index.tsx**: Must use CapitalLetters for the first letter (e.g., `pos/Customers/`, `pos/Products/`, `pos/Transactions/`)

## Code Patterns

### Imports
- Use absolute imports with `baseUrl: "src"` (e.g., `import Button from "components/Button"`)
- Group imports: React → third-party → local components → utils → types → styles
- Example:
  ```typescript
  import React, { useEffect, useState, useCallback } from "react";
  import { Modal, Form } from "react-bootstrap";
  import { clientAuthorizedGet } from "utils/fetchUtils";
  import { API_ROUTES } from "utils/constants";
  import Button from "components/Button";
  import Toast from "components/Toast";
  import styles from "./ComponentName.module.scss";
  import { Preference } from "types/preferences";
  ```

### Component Structure
1. Imports
2. Type definitions (if local, otherwise import from `types/`)
3. Component function
4. State management with `useState`
5. Data fetching with `useCallback` and `useEffect`
6. Event handlers
7. Render logic
8. Export default

### State Management
- Use `useState` for local component state
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
- Always use `fetchUtils` functions: `clientAuthorizedGet`, `clientAuthorizedPost`, `clientAuthorizedPatch`, `clientAuthorizedDelete`
- Provide TypeScript generics for response types (e.g., `clientAuthorizedGet<Preference>`)
- Handle errors with try-catch and show toast notifications
- Use `API_ROUTES` from `utils/constants` for endpoints
- Example:
  ```typescript
  const loadData = useCallback(async () => {
    try {
      const data = await clientAuthorizedGet<DataType>(API_ROUTES.ENDPOINT);
      setData(data);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to load data.";
      showToast(errorMessage, "error");
    }
  }, []);
  ```

### Error Handling
- Always wrap API calls in try-catch
- Extract error messages: `error instanceof Error ? error.message : "Default message"`
- Show user-friendly error messages via Toast component
- Provide retry functionality for failed data loads

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
- Use nested route objects for sub-routes (e.g., `ROUTES.POS.CUSTOMERS`)
- Import routes from constants, don't hardcode paths
- Update `App.tsx` with new routes

### Styling
- Use CSS Modules (`.module.scss`) for component-specific styles
- Follow BEM-like naming conventions
- Use HSL color format: `hsl(222.2 47.4% 11.2%)`
- Responsive design with media queries
- Common class names:
  - `.container`: Main wrapper
  - `.header`: Page header with title
  - `.emptyState`: Empty state message
  - `.errorState`: Error state container
  - `.tableHeader`, `.tableBody`, `.tableRow`: Table structure

### TypeScript
- Use strict typing for all props, state, and API responses
- Define types in `src/types/` folder, not inline
- Use interfaces for object shapes
- Use type unions for specific string literals (e.g., `"success" | "error"`)
- Avoid `any` type - use `unknown` if type is truly unknown

### Component Props
- Always define explicit prop interfaces
- Use descriptive prop names
- Include JSDoc comments for complex props if needed

### Data Fetching Pattern
```typescript
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const loadData = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const fetchedData = await clientAuthorizedGet<DataType[]>(API_ROUTES.ENDPOINT);
    setData(fetchedData);
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to load data.";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  loadData();
}, [loadData]);
```

### Success/Error Handling Pattern
```typescript
const handleSuccess = (item: Item) => {
  setData((prev) => [item, ...prev]);
  showToast("Item added successfully", "success");
};

const handleError = (message: string) => {
  showToast(message, "error");
};
```

## Best Practices

1. **Always use TypeScript** - No `any` types, proper interfaces
2. **Consistent error handling** - Try-catch with user-friendly messages
3. **Toast notifications** - For all user actions (success/error)
4. **Loading states** - Show loading indicators during async operations
5. **Empty states** - Provide helpful messages when no data exists
6. **Accessibility** - Use `aria-label` for icon-only buttons
7. **Code organization** - Keep related files together in feature folders
8. **Reusability** - Extract common patterns into utility functions
9. **Performance** - Use `useCallback` and `useMemo` appropriately
10. **Consistency** - Follow existing patterns in the codebase

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
- Always outline and confirm your planned changes before editing any code, even if the user doesn’t explicitly request it.
- Do not start coding until the requester clearly gives the go signal (e.g., “Go ahead” or “Implement now”).
- Always run `npm run format` after making code changes to keep formatting consistent.
- Run `npm run quick-test` and fix every reported issue before considering the work complete.

## Refresh Button Pattern

Use the reusable `RefreshButton` component (`src/components/RefreshButton.tsx`) for consistent refresh functionality.

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

