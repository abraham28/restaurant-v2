# Internationalization (i18n) Guide

This project uses **i18next** for multi-language support with the ability to override translations per user.

## 📁 File Structure

```
src/i18n/
├── config.ts                    # i18next configuration
├── user-template.json           # Template file for users to customize translations
├── locales/
│   ├── en/
│   │   └── common.json          # English base translations (EDIT HERE)
│   └── tl/
│       └── common.json          # Tagalog base translations (EDIT HERE)
└── README.md                    # This file
```

## ✏️ Where to Edit Translations

### For Developers: Base Language Files

**Edit base translations here:**
- `src/i18n/locales/en/common.json` - English translations
- `src/i18n/locales/tl/common.json` - Tagalog translations

**Example:**
```json
{
  "welcome": "Welcome",
  "menu": "Menu",
  "save": "Save"
}
```

### For Clients: User-Specific Overrides

**Send this file to users:**
- `src/i18n/user-template.json`

Users can edit this file and send it back. The backend API should accept this JSON and store it per user.

**User Instructions:**
1. Open `user-template.json`
2. Add only the keys you want to customize (leave others out)
3. Example: To change "welcome" to "kamusta", add: `"welcome": "kamusta"`
4. Send the file back to be uploaded to the backend

## 🔧 How It Works

1. **Base Translations**: Loaded from `locales/{language}/common.json`
2. **User Overrides**: Fetched from backend API (`/api/users/{userId}/translations?lang={lang}`)
3. **Merging**: User translations override base translations
4. **Caching**: Translations are cached in IndexedDB for offline access

## 📝 Adding New Translation Keys

1. Add the key to **all** language files:
   - `src/i18n/locales/en/common.json`
   - `src/i18n/locales/tl/common.json`

2. Use in components:
```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('welcome')}</h1>;
}
```

## 🌐 Supported Languages

Currently supported:
- `en` - English
- `tl` - Tagalog

To add a new language:
1. Create `src/i18n/locales/{code}/common.json`
2. Add the language code to `SUPPORTED_LANGUAGES` in `src/i18n/config.ts`
3. Copy translations from English file and translate

## 🔌 Backend API Integration

The system expects a backend endpoint:
```
GET /api/users/{userId}/translations?lang={language}
```

**Response format:**
```json
{
  "welcome": "kamusta",
  "menu": "Custom Menu Text"
}
```

**Note**: Only include keys that should override base translations. Missing keys will use base translations.

## 💾 Offline Support

Translations are automatically cached in IndexedDB:
- Base translations: Loaded on app start
- User translations: Cached after API fetch
- Offline mode: Uses cached translations if API unavailable

## 🎨 Language Switcher

The `LanguageSwitcher` component is available and can be added anywhere:
```typescript
import LanguageSwitcher from 'atomic-components/LanguageSwitcher';

<LanguageSwitcher />
```

Language preference is saved to localStorage and persists across sessions.

## 📋 User Template File

The `user-template.json` file includes:
- Instructions for clients
- Example translations
- Notes about merging behavior

Send this file to clients when they need to customize their translations.

