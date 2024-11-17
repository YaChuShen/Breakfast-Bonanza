import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

try {
  admin.app();
} catch (e) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://breakfast-cooking-game-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
}

export default admin;
