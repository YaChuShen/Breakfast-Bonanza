import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

try {
  admin.app();
} catch (e) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
