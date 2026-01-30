# i18n Quick Start Guide

## ✅ Implementation Complete!

The i18n system is now fully set up and ready to use.

## 📍 Where to Edit Translations

### For You (Developer): Base Translations

**Edit these files to add/change base translations:**

1. **English**: `src/i18n/locales/en/common.json`
2. **Tagalog**: `src/i18n/locales/tl/common.json`

**Example:**
```json
{
  "welcome": "Welcome",
  "myNewKey": "My New Translation"
}
```

**Important:** Always add new keys to **both** language files!

### For Clients: User-Specific Customizations

**Send this file to clients:**
- `src/i18n/client-template.json`

**Instructions for clients:**
1. Open `client-template.json`
2. Add only the keys they want to customize
3. Example: `"welcome": "kamusta"`
4. Remove the `_instructions`, `_example`, `_note`, `_how_to_use` lines
5. Send the JSON file back

**Backend Integration:**
- The backend API should accept this JSON at: `/api/users/{userId}/translations?lang={language}`
- Store it per user in the database
- The frontend will automatically fetch and merge it with base translations

## 🎯 How to Use in Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('save')}</button>
    </div>
  );
}
```

## 🌐 Language Switcher

The language switcher is already added to the App. Users can switch languages using the dropdown in the top-right corner.

Language preference is automatically saved and persists across sessions.

## 📋 Adding a New Language

1. Create `src/i18n/locales/{code}/common.json`
2. Copy content from `en/common.json` and translate
3. Add to `SUPPORTED_LANGUAGES` in `src/i18n/config.ts`:
```typescript
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  tl: 'Tagalog',
  es: 'Spanish', // New language
} as const;
```

## 🔧 Backend API Endpoint

**Expected endpoint:**
```
GET /api/users/{userId}/translations?lang={language}
```

**Response format:**
```json
{
  "welcome": "kamusta",
  "menu": "Custom Menu"
}
```

**Note:** Only include keys that should override base translations.

## 📦 Files Created

- ✅ `src/i18n/config.ts` - i18next configuration
- ✅ `src/i18n/locales/en/common.json` - English translations
- ✅ `src/i18n/locales/tl/common.json` - Tagalog translations
- ✅ `src/i18n/client-template.json` - **Send this to clients**
- ✅ `src/stores/i18nStore.ts` - Language preference store
- ✅ `src/atomic-components/LanguageSwitcher/` - Language switcher component
- ✅ `src/i18n/README.md` - Full documentation

## 🚀 Next Steps

1. **Add more translations** to `common.json` files as needed
2. **Update components** to use `t('key')` instead of hardcoded text
3. **Set up backend API** to handle user translation preferences
4. **Send `client-template.json`** to clients who want customizations

## 💡 Tips

- Use descriptive keys: `clientInformationSystem` not `cis`
- Keep translations organized by feature/page
- Test both languages after adding new keys
- User translations override base translations automatically

