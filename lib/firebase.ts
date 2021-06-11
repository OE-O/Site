import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider =
	new firebase.auth.GithubAuthProvider().addScope('read:org');

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
// export async function getUserWithUsername(username) {
// 	const usersRef = firestore.collection('users');
// 	const query = usersRef.where('username', '==', username).limit(1);
// 	const userDoc = (await query.get()).docs[0];
// 	return userDoc;
// }
