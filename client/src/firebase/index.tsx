import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  FirebaseStorage,
} from "firebase/storage";

import { generateUniqueImageName } from "../utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);
const firestoreDB: Firestore = getFirestore(app);

const uploadImage = async (image: File): Promise<void> => {
  const extension = image.type.split("/")[1];

  const imageName = generateUniqueImageName(extension)

  const imageRef = storageRef(storage, `images/${imageName}`);

  const snapshot = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(snapshot.ref);
  await saveImageUrl(imageName, url);
};

const saveImageUrl = async (
  imageName: string,
  imageURL: string
): Promise<void> => {
  const docRef = doc(collection(firestoreDB, "images"));

  await setDoc(docRef, {
    name: imageName,
    imageURL,
  });
};

const listenToDb = (cb: (images: DocumentData[]) => void): Unsubscribe => {
  const q = query(collection(firestoreDB, "images"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const images: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      images.push({ ...doc.data(), id: doc.id });
    });

    cb(images);
  });

  return unsubscribe;
};

export { uploadImage, listenToDb };

