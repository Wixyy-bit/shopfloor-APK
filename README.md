# 🏭 Shop Floor Lite — Offline-First Manufacturing App

Shop Floor Lite is a cross-platform, offline-first mobile application designed for manufacturing shop floors where network connectivity is unreliable.

The app enables **Operators** to capture machine downtime and maintenance tasks directly on the shop floor, even while offline, and allows **Supervisors** to monitor alerts, acknowledge incidents, and review operational KPIs.

---

## 🚀 Live Artifact (APK)

🔗 Download & Install APK  
https://expo.dev/artifacts/eas/bGE1mXdn6kkqwMnfjmLwuB.apk

> Tested on real Android device.  
> Offline mode and sync behavior verified.

---

## 🧰 Tech Stack

- **React Native (Expo)**
- **Zustand** — Lightweight global state management
- **AsyncStorage** — Offline persistence & sync queue
- **Expo Router** — File-based navigation
- **Custom ID Generator** — Used instead of UUID for Android APK stability

---

## ▶️ Setup & Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- Expo CLI
- Android Emulator or physical Android device

### Install & Run
```bash
npm install
npx expo start
