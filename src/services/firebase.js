import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAHLon4EzK0XXcXFbEbFjBajRZV95_aMd8",
  authDomain: "otizm-iletisim-app.firebaseapp.com",
  databaseURL: "https://otizm-iletisim-app-default-rtdb.firebaseio.com",
  projectId: "otizm-iletisim-app",
  storageBucket: "otizm-iletisim-app.firebasestorage.app",
  messagingSenderId: "218089088211",
  appId: "1:218089088211:web:f714c5b2b83b910a8ca026",
  measurementId: "G-DTRDDTVH7K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);

export default app;
