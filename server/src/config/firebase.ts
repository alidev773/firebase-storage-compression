import admin from 'firebase-admin';

// Initialize the Firebase Admin SDK using service account credentials
import * as serviceAccount from '../service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `${process.env.DB_URL}`,
  storageBucket: `${process.env.BUCKET_NAME}`
});

const db = admin.firestore();
const storage = admin.storage().bucket();

export { db, storage };


// 'https://vici-2806f-default-rtdb.firebaseio.com'
// vici-2806f.appspot.com