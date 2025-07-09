# 🌍 EcoScan — Clothing Carbon Footprint Scanner

EcoScan is a mobile application ddesigned to help users understand the environmental impact of their clothing. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. This project demonstrates a full-stack solution for a green initiative product.

## 🔧 Tech Stack

| Layer                  | Technology                                                                               |
| ---------------------  | ---------------------------------------------------------------------------------------- |
| **Frontend**           | React Native (with Expo), TypeScript                                                     |
| **Backend**            | Node.js with Express                                                                     |
| **AI Integration**     | OpenAI GPT-4o API via custom utilities:                                                  |
|                        | - `openAIClassifier`: Identifies clothing items from uploaded images                     |
|                        | - `carbonAndEcoPointsEstimator`: Estimates carbon footprint using AI or fallback data    |
|                        | - `generateRewards`: Suggests eco-rewards based on total eco-points                      |
| **Frontend Libraries** | Axios, React Navigation, Lottie, React Native Pie Chart, Expo APIs                       |
| **Backend Libraries**  | Express, Multer, Dotenv, OpenAI SDK, FormData                                            |

---

## 🚀 Setup Instructions

### 1. **Clone the Repository**

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/Md-Mursaleen/EcoScan-app.git
cd EcoScanApp
```

### 2. **Install Dependencies**

Run the following commands:

- **Backend**:
  ```bash
  cd EcoScanApp-backend
  npm install
  ```
- **Frontend**:
  ```bash
  cd ..
  npm install
  ```

### 3. **Run the Application**

- **Backend**: Start the backend server:
  ```bash
  cd EcoScanApp-backend
  node app.js
  ```
- **Frontend**: Start the frontend application:
  ```bash
  npx expo start --dev-client  # here you need to create an EAS build (custom dev client app)
  npx expo start               # if using Expo Go app
  ```

### 4. **Testing**

Run the tests to verify the setup:

```bash
# Frontend
npm test

# Backend (future enhancement)
jest or mocha
```

Create a `.env` file in the backend root directory:

```
OPENAI_API_KEY=your_openai_api_key
```

---

## Application Flow

1. Users upload or scan a clothing image.
2. The backend sends the image to OpenAI GPT-4o Vision API.
3. Clothing items are detected and classified.
4. Each item receives:
   - 🌍 Carbon Score (kg CO₂ emitted)
   - 🌱 Eco Points (as rewards)
5. The user can view:
   - Pie chart breakdown
   - Total carbon footprint
   - Total eco points
   - Redeemable eco-rewards

---

## 🌱 Carbon Score Assumptions

If the GPT-4o Vision API fails or is skipped, fallback logic assigns predefined scores and points:

| 👕 Clothing Item | 🌍 Carbon Score (kg CO₂) | 🌱 Eco Points |
| ---------------- | ------------------------ | ------------- |
| T-shirt          | 5                        | 50            |
| Jeans            | 10                       | 100           |
| Jacket           | 15                       | 200           |
| Shoes            | 8                        | 80            |
| Dress            | 12                       | 120           |
| Sweater          | 15                       | 150           |
| Hoodie           | 14                       | 140           |
| Shorts           | 6                        | 60            |
| Skirt            | 7                        | 70            |
| Blazer           | 18                       | 180           |
| Coat             | 22                       | 220           |
| Tank Top         | 4                        | 40            |
| Scarf            | 3                        | 30            |
| Hat              | 4                        | 40            |
| Gloves           | 3                        | 30            |
| Socks            | 2                        | 20            |
| Sneakers         | 9                        | 90            |
| Boots            | 11                       | 110           |
| Leggings         | 6                        | 60            |
| Tracksuit        | 13                       | 130           |

These values are stored in static JSON files under `data/` and applied via backend logic.

---

## Key Screens

### 🏠 Home Screen

- Upload or capture image
- Visual scan animation
- Progress indicator and file type icon
- Handles scanning and success states

### 📊 Details Screen

- Pie chart breakdown of carbon footprint
- Summary of total score and eco-points
- List of redeemable green rewards

---

## Enhancement Proposals

### 🔧 Technical Scaling

To transform EcoScan into a scalable, production-ready platform, here are proposed enhancements categorized by technical and product aspects:


### 1. ⚙️ Scaling the Backend for Larger User Loads

- **Move to a Microservices Architecture**: Break down monolithic logic (e.g., image analysis, scoring, rewards) into separate services to ensure independent scaling.
- **Asynchronous Processing**: Offload image classification and OpenAI Vision API calls to background workers using tools like **BullMQ** (Node.js), **Celery** (Python), or a job queue service.
- **Cloud Scalability**: Deploy backend to auto-scaling environments like **AWS Lambda**, **Google Cloud Run**, or **Azure App Service**.


### 2. 🌍 Improve the Carbon Scoring Model

- **Material-based Scoring**: Extend the model to differentiate between cotton, polyester, wool, etc., each with distinct CO₂ footprints.
- **Condition & Usage Factor**: Allow users to input whether the clothing is new, second-hand or upcycled to adjust scores accordingly.
- **Machine Learning Model**: In future iterations, train a custom model on labeled image datasets to predict material + item type more accurately than GPT-4 alone.


### 3. 🚀 Enhance User Experience

- **Historical Impact Tracking**: Let users see their cumulative carbon savings over time.
- **Sustainability Comparisons**: Compare scanned items to eco-friendlier alternatives, giving users actionable swaps.
- **Gamification**: Add streaks, badges, and level-ups based on eco-points or reduced carbon impact.
- **Educational Nudges**: Use push notifications or modals to share facts about sustainable fashion.


### 4. 🔌 Integrate with External APIs

- **Real-time Product Data**: Integrate with clothing databases like **Good On You**, **Open Apparel Registry**, or **Sustainable Apparel Coalition**.
- **Geo-based Reward Integration**: Use Google Maps API to show nearby stores or platforms accepting eco-points or offering sustainable options.
- **Weather + Sustainability Tips**: Pull real-time weather data to suggest eco-friendly clothing choices.


These enhancements would not only scale the application for enterprise usage but also enrich its value as an educational and behavioral change tool in the fight against climate change.

---

## 🌐 Deployment

The frontend (mobile app) APK has been built and shared for review. The backend is currently deployed on Render and the mobile app has been updated to use this deployed backend, so all core features (e.g., image scanning, carbon scoring analysis) are fully functional without needing to run the backend locally.

### 🔧 To run the backend locally:

1. Navigate to the `/EcoScanApp-backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
   This will run the server on `http://localhost:8000`.

> 🔁 During development, you can also use tools like [ngrok](https://ngrok.com/) for temporary secure tunneling during testing.


### 🚀 Deployment Recommendations

- **Frontend**: Use [Expo EAS](https://docs.expo.dev/eas/) to build production-ready APKs and submit the app to the Play Store or App Store.
- **Backend**: The backend is currently hosted on Render. Other alternatives include Railway and Heroku.

---

## 📁 Project Structure

```
EcoScanApp/
├── EcoScanApp-backend/
│   ├── routes/              # API endpoints
│   ├── utilis/              # GPT logic, scorers, reward logic
│   ├── data/                # Static fallback data (JSON)
|   ├── .env                 # Environment variables (OpenAI API key, secrets)
│   └── app.js               # Main Express server
│
├── app/_layout.tsx          # React Native entry point
├── assets/                  # Images and animations
├── utilis/                  # UI utilities (e.g., scaling)
├── components/TabNavigator  # HomeScreen.tsx, DetailsScreen.tsx, ProfileScreen.tsx, RedeemScreen.tsx
├── components/Welcome       # WelcomeScreen.tsx
├── components/Auth          # LoginScreen.tsx
├── components/Splash        # SplashScreen.tsx
└── package.json             # Project config
```

---

## 📽️ Demo & APK

A working demo of the application has been recorded and uploaded to Google Drive.

[Watch Demo on Google Drive](https://drive.google.com/file/d/1EHE6KVAO9PfDBVoNN7vtA_d9M01SwZeN/view?usp=drivesdk)

You can also try out the app by downloading the latest APK build:

📦 [Download APK for Review](https://drive.google.com/file/d/1sTg6LRLXFYZ6wZsU9jEz0v3MgOtiLb_B/view?usp=drivesdk)

> Make sure to allow installations from unknown sources on your Android device.

---

## 📬 Contact

Made with 💚 by **Md Mursaleen**

- [LinkedIn](https://www.linkedin.com/in/md-mursaleen085/)
- [GitHub](https://github.com/Md-Mursaleen)
- [Email](mailto:mursaleenansari085@gmail.com)
- 📞 Phone: +91-7982928791

---

## 💚 Thank You

> “What you wear shouldn't cost the Earth.”

Thank you for reviewing **EcoScan**. Let’s make sustainability accessible, actionable and stylish — one scan at a time.

&nbsp; 

## 📸 App Screenshots

### Splash Screen

<img src="./screenshots/splash.png" alt="Splash Screen" width="300"/>

### Welcome Screen

<img src="./screenshots/welcome.png" alt="Welcome Screen" width="300"/>

### Login Screen

<img src="./screenshots/login.png" alt="Login Screen" width="300"/>

### Home Screen

<img src="./screenshots/home.png" alt="Home Screen" width="300"/>

### Details Screen

<img src="./screenshots/details.png" alt="Details Screen" width="300"/>

### Redeem Screen

<img src="./screenshots/redeem.png" alt="Redeem Screen" width="300"/>
