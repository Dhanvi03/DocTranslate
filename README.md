# 📄 DocTranslate Pro

A powerful React Native application for scanning, extracting text from documents using AI, translating to multiple Indian languages, and chatting with an AI assistant about extracted content.

**Built with:** React Native, TypeScript, Sarvam AI APIs

---

## ✨ Features

- 📸 **Document Scanning** - Capture images from camera or gallery
- 🤖 **Text Extraction** - AI-powered document intelligence using Sarvam Vision
- 🌐 **Multi-Language Translation** - Translate to 22+ languages including Indian languages
- 💬 **AI Chat** - Ask questions about extracted documents
- 💾 **Save Documents** - Store extracted text and translations locally
- ⚙️ **Settings** - Configure API key and preferences

---

## 🎯 Use Cases

- **Students:** Extract text from images, translate study materials
- **Travelers:** Translate signs, menus, documents in real-time
- **Business:** Extract text from business documents and translate
- **Accessibility:** Convert document images to readable text
- **Language Learning:** Translate documents to practice languages

---

## 📋 Prerequisites

- **Node.js** 16+
- **React Native CLI** 
- **Android SDK** (for Android development)
- **Sarvam AI API Key** ([Get it here](https://dashboard.sarvam.ai/))

---

## 🚀 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd sarvamDemo
```

### 2. Install Dependencies
```bash
npm install @react-navigation/bottom-tabs @react-navigation/native react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage react-native-image-crop-picker react-native-permissions react-native-fs react-native-svg react-native-vector-icons react-native-gesture-handler
```

### 3. Create Environment File
Create `.env` file in project root:
```env
SARVAM_API_KEY=your_api_key_here
```

### 4. Create TypeScript Declaration
Create `env.d.ts`:
```typescript
declare module '@env' {
  export const SARVAM_API_KEY: string;
}
```

### 5. Update Configuration Files

**tsconfig.json:**
```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "moduleResolution": "bundler",
    "lib": ["es2020"],
    "jsx": "react-jsx"
  }
}
```

---

## 📁 Project Structure

```
sarvamDemo/
├── src/
│   ├── api/
│   │   ├── sarvamAPI.ts          # All API calls to Sarvam AI
│   │   └── types.ts              # TypeScript interfaces
│   ├── screens/
│   │   ├── ScanScreen/
│   │   │   ├── index.tsx         # UI Component
│   │   │   ├── container.tsx     # Business Logic
│   │   │   └── styles.ts         # Styles
│   │   ├── ChatScreen/
│   │   │   ├── index.tsx
│   │   │   ├── container.tsx
│   │   │   └── styles.ts
│   │   ├── SavedScreen/
│   │   │   ├── index.tsx
│   │   │   ├── container.tsx
│   │   │   └── styles.ts
│   │   └── SettingsScreen/
│   │       ├── index.tsx
│   │       ├── container.tsx
│   │       └── styles.ts
│   ├── navigation/
│   │   └── TabNavigator.tsx      # Bottom tab navigation
│   ├── services/
│   │   └── storage.ts            # AsyncStorage utilities
│   ├── styles/
│   │   └── colors.ts             # Color constants
│   ├── utils/
│   │   └── helpers.ts            # Helper functions
│   └── types/
│       └── index.ts              # App-wide types
├── App.tsx                        # Entry point
├── tsconfig.json
├── env.d.ts
├── .env
└── package.json
```

---

## 🏗️ Architecture

### Separation of Concerns

Each screen follows a **3-file pattern**:

1. **`index.tsx`** - Pure UI Component
   - Only presentation logic
   - Receives props from container
   - No state management

2. **`container.tsx`** - Custom Hook with Business Logic
   - State management
   - API calls
   - Error handling
   - Returns state & handlers to UI

3. **`styles.ts`** - StyleSheet
   - All component styles
   - Theme colors
   - Responsive sizing

### API Layer

**`src/api/sarvamAPI.ts`** - Centralized API Service
- Document Intelligence (text extraction)
- Translation (22+ languages)
- Chat Completion (AI conversations)
- Language Detection
- Singleton pattern for reusability

---

## 🔑 Sarvam AI APIs Used

### 1. Document Intelligence
Extract text from document images using AI vision:
```typescript
POST /doc-digitization/job/v1
```

**Features:**
- Supports JPG, PNG images
- Converts to ZIP for upload
- Asynchronous processing with job polling
- Supports 22+ languages

### 2. Translation
Translate text between languages:
```typescript
POST /translate
```

**Supports:**
- 22+ Indian languages
- English
- European languages (Spanish, French, German, etc.)
- Auto-detection of source language

### 3. Chat Completion
Get AI responses about document content:
```typescript
POST /chat/completions
```

**Model:** sarvam-m
- Context-aware responses
- Supports up to 500 token output

---

## 📱 User Interface

### Screens

#### 1. **Scanner Screen** 📸
- Capture images with camera or select from gallery
- View extracted text
- Select translation language
- Translate with one tap
- Save documents
- Ask AI questions about text

#### 2. **Chat Screen** 💬
- Chat with AI assistant
- Ask questions about document content
- View conversation history
- Real-time responses

#### 3. **Saved Screen** 📚
- View all saved documents
- Shows extraction & translation language pairs
- Copy text to clipboard
- Delete documents
- Preview extracted content

#### 4. **Settings Screen** ⚙️
- Configure Sarvam AI API key
- Verify API key validity
- Set default language preferences
- Toggle history saving
- Clear all data
- View app information

### Design System

**Colors:**
- Background: `#0f1419`
- Secondary: `#1a2332`
- Primary: `#00d4ff` (Cyan)
- Dark Cyan: `#0099cc`
- Text: `#ffffff`
- Muted Text: `#a0a0a0`

**Components:**
- Custom SVG icons
- Smooth animations
- Dark theme with gradient accents
- Bottom tab navigation

---

## 🔄 Workflow

### Document Extraction & Translation

```
1. User selects image
   ↓
2. Image converted to base64
   ↓
3. Create ZIP file with image
   ↓
4. Upload ZIP to Azure blob storage
   ↓
5. Sarvam API extracts text from image
   ↓
6. Display extracted text
   ↓
7. User selects target language
   ↓
8. Translate text using Sarvam translate API
   ↓
9. Display translated text
   ↓
10. User can save, copy, or ask AI
```

### Document Intelligence Flow

```
Create Job → Get Upload URL → Upload ZIP → Start Job → Poll Status → Extract Text
```

---

## 💾 Data Storage

### Local Storage (AsyncStorage)

- **Saved Documents** - Extracted & translated text
- **API Key** - Sarvam AI subscription key
- **Preferences** - Language, history settings
- **Chat History** - Conversation logs (optional)

All data is stored locally on device. No cloud sync.

---

## 📊 API Response Handling

### Document Intelligence Job Lifecycle

```
Status: Accepted → Pending → Running → Completed
Polling: Every 2 seconds, Max 300 attempts (10 minutes)
```

### Error Handling

- Invalid/corrupted ZIP files
- API authentication failures
- Network timeouts
- Processing failures with detailed error messages
- User-friendly alerts

---

## 🛠️ Key Dependencies

| Package | Purpose |
|---------|---------|
| `@react-navigation/bottom-tabs` | Bottom tab navigation |
| `@react-navigation/native` | Navigation framework |
| `react-native-image-crop-picker` | Camera & gallery access |
| `react-native-permissions` | Permission management |
| `react-native-fs` | File system access |
| `@react-native-async-storage/async-storage` | Local data storage |
| `react-native-svg` | SVG icon rendering |
| `react-native-gesture-handler` | Gesture handling |

---

## 🚀 Running the App

### Development

```bash
# Start the development server
npx react-native start --reset-cache

# In another terminal, run on Android
npx react-native run-android

# Or for iOS
npx react-native run-ios
```

### Building for Release

```bash
# Android
cd android
./gradlew assembleRelease

# iOS
xcodebuild -workspace ios/sarvamDemo.xcworkspace -scheme sarvamDemo -configuration Release
```

---

## 🔐 Security Considerations

- **API Key:** Stored locally in AsyncStorage, never transmitted insecurely
- **HTTPS Only:** All Sarvam AI API calls use HTTPS
- **No Cloud Storage:** All data remains on device
- **Permission Handling:** Request only necessary permissions

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "API Key not configured"
**Solution:** Add API key to Settings screen or `.env` file

#### 2. "Invalid or corrupted ZIP file"
**Solution:** Ensure image is properly converted to ZIP format (fixed in latest version)

#### 3. "Document processing timeout"
**Solution:** Processing takes up to 10 minutes, app will keep polling

#### 4. "Camera permission denied"
**Solution:** Grant camera permission in app settings (Android/iOS Settings)

#### 5. "Gallery access denied"
**Solution:** Grant storage/photo permissions in device settings

---

## 📈 Performance

- **Base64 Conversion:** <100ms for typical images
- **ZIP Creation:** <50ms
- **Azure Upload:** Depends on file size & network
- **Text Extraction:** 30 seconds - 10 minutes (API processing)
- **Translation:** <2 seconds per request
- **Chat Response:** <5 seconds

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🔗 Resources

- [Sarvam AI Documentation](https://docs.sarvam.ai)
- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
