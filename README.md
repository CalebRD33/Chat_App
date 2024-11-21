# Echo Live Chat

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Development Environment](#development-environment)
- [Setup Project](#setup-project)
- [Run the App on an Emulator of Your Choice](#run-the-app-on-an-emulator-of-your-choice)

![Screenshot of the Echo Live Chat](img/Chat_App.png)

## Overview

This simple mobile Chat App was built using React Native. It allows a user to select the color of their chat background and navigate to a chat screen. Chat data is stored on Cloud Firestone and is sent/received through WebSockets.

## Features

- **Customize Chat Screen**: Users can choose the background color of their chat room
- **Send Messages**: Users can send and receive text messages in real time
- **Image Sharing**: Users can take a photo through the chat app or choose one from their albums 
- **Location Sharing**: Users can send their current location with a map view
- **Offline Capabilities**: Users can access and read previous messages while offline

## Development Environment

Make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase](https://console.firebase.google.com) project set up with Firestore and Firebase Storage
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/) (For iOS development - macOS only)

### Expo CLI 

Install Expo CLI globally by running:

```bash
npm install -g expo-cli
```

### Firebase

Create an account if you don't have one already and configure it correctly by enabling "Firestore Database" and "Firebase Storage"

### Android Studio

Download and install Android Studio to set up the Android Virtual Device of your choice. I used the Pixel 8 Pro. You can find instructions on the official [Android Studio](https://developer.android.com/studio) website.

### Xcode (for iOS)

Install [Xcode](https://developer.apple.com/xcode/) on your macOS. Make sure Command Line Tools are installed and launch the iOS Simulator 

## Setup Project

### 1. Clone the Repository 

```
git clone https://github.com/CalebRD33/Chat_App.git
cd Chat_App
```

### 2. Install dependencies

Once you have navigated to the main file directory, run the following command to install the required dependencies:
```
npm install
```

Your dependencies should now include:

- "@react-native-async-storage/async-storage": "1.23.1",
- "@react-native-community/netinfo": "11.3.1",
- "@react-navigation/native": "^6.1.18",
- "@react-navigation/native-stack": "^6.11.0",
- "expo": "~51.0.37",
- "expo-image-picker": "~15.0.7",
- "expo-location": "~17.0.1",
- "expo-status-bar": "~1.12.1",
- "firebase": "^10.3.1",
- "react": "18.2.0",
- "react-native": "0.74.5",
- "react-native-gifted-chat": "^2.6.3",
- "react-native-maps": "1.14.0",
- "react-native-reanimated": "~3.10.1",
- "react-native-safe-area-context": "4.10.5",
- "react-native-screens": "3.31.1"

### 3. Setup Firebase

1. Create a new project in [The Console](https://console.firebase.google.com).
2. Enable **Firestore** and **Firebase Storage** for your project.
3. Copy the Firebase configuration from your project and replace the values in the ```firebaseConfig``` object inside ```App.js```.

Your code will look something like this:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Run the App on an Emulator of your choice

### Android Studio

- Start Android Studio and navigate to the Virtual Device Manager to choose a platform and start the device
- In the main folder of the repository run the following command:
```bash
npx expo start --android
```

### Xcode (iOS Simulator)

- Make sure Xcode is installed and that command line tools are set up
- Open the iOS Simulator within Xcode
- In the main folder of the repository run the following command:
```bash
npx expo start --ios
```

### Using a Physical Device

- Download Expo Go on your physical device from the app store
- With the Expo Go app running on your personal device, and both devices connected to the same WiFi, navigate to the main folder of the repository and run the following command:
```bash
npx expo start 
```
- Then open the app on Expo Go. If your personal device doesn't automatically sync, scan the QR code in the command line.