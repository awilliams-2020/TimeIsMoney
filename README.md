# TimeIsMoney

A React Native mobile application that generates AI images based on text prompts. The app uses a credit-based system where users can purchase image generation credits.

## Features

- 🔐 Google OAuth authentication
- 🖼️ AI image generation from text prompts
- 💳 In-app purchases for image credits
- 📱 Modern, responsive UI
- 🔄 Infinite scroll image gallery
- 💰 Multiple credit package options:
  - $1.00 for 20 images
  - $3.00 for 60 images
  - $5.00 for 100 images

## Tech Stack

- React Native
- TypeScript
- TanStack Query (React Query)
- Stripe for payments
- React Native App Auth
- Encrypted Storage
- Matomo Analytics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with the following variables:
```
API_URL=your_api_url
GOOGLE_OAUTH_APP_GUID=your_google_oauth_guid
MATOMO_URL=your_matomo_url
IPIFY_URL=your_ipify_url
MATOMO_TOKEN=your_matomo_token
```

3. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Usage

1. Sign in with your Google account
2. Purchase an image credit package
3. Enter a text prompt describing the image you want to generate
4. View your generated images in the gallery
5. Scroll through your image history

## Security

- User sessions are stored securely using Encrypted Storage
- Authentication tokens are managed securely
- Payment processing is handled through Stripe

## Emulator
`emulator -avd Pixel_9_API_33`

## Metro
`npm start -- --reset-cache`

## Windows Env
`$env:ENVFILE=".env.prod"`

## React
`npm run android`

<p align="center">
  <img src="https://raw.githubusercontent.com/awilliams-2020/TimeIsMoney/refs/heads/main/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" alt="TimeIsMoney image"/>
</p>