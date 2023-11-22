import { initializeApp, getApps } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APP_CREDENTIALS || "";

export function firebaseAdminInit() {
  try {
    const apps = getApps();
    if (!apps.length) {
      const app = initializeApp({
        credential: credential.cert(
          JSON.parse(decodeURIComponent(GOOGLE_APPLICATION_CREDENTIALS))
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function getDatabase() {
  const app = firebaseAdminInit();
  const db = getFirestore();
  return db;
}
