import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCmxNH2XyMJQrVJBZYdKn83lE0s2xVCL90',
	authDomain: 'oe-o-website.firebaseapp.com',
	databaseURL: 'https://oe-o-website.firebaseio.com',
	projectId: 'oe-o-website',
	storageBucket: 'oe-o-website.appspot.com',
	messagingSenderId: '867512176790',
	appId: '1:867512176790:web:15e97ee91286196900b2b7',
	measurementId: 'G-TS346JM866',
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
