// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDibODRPAa5GLgs3Wph4PdUZUFOxvQd21M",
  authDomain: "job-recruiter-e1166.firebaseapp.com",
  projectId: "job-recruiter-e1166",
  storageBucket: "job-recruiter-e1166.appspot.com",
  messagingSenderId: "720801218548",
  appId: "1:720801218548:web:abcd1234efgh5678" // ✅ real appId from Firebase console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
