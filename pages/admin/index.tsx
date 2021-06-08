import { auth, firestore, githubAuthProvider } from '@lib/firebase';
import { UserContext } from '@lib/context';
import Metatags from '@components/Metatags';
import styles from '@styles/Admin.module.css';
import _404 from '@styles/404.module.css';

import { useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';

export default function Admin(props) {
	const { user, username, admin } = useContext(UserContext);

	useEffect(() => {
		checkUser(user);
	}, [user]);

	const checkUser = useCallback(async (user) => {
		if (user) {
			const userDoc = firestore.doc(`users/${user.uid}`);
			const { exists } = await userDoc.get();
			if (!exists) await userDoc.set({ username: user.displayName });
		}
	}, []);

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing permissions <AccessDenied />
	// 3. user signed in, has permissions <AdminPage />
	return (
		<main>
			<Metatags
				title='OE-O Modding | Admin'
				description='Admin dashboard for managing the website'
			/>
			{user ? !admin ? <AccessDenied /> : <AdminPage /> : <SignInButton />}
		</main>
	);
}

// Sign in with GitHub button
function SignInButton() {
	const signInWithGithub = async () => {
		await auth.signInWithPopup(githubAuthProvider);
	};

	return (
		<div className={styles.center}>
			<button onClick={signInWithGithub} className={styles.btn}>
				<img src={'/github.png'} className={styles.img} />
				<p className={styles.text}>Sign in with GitHub</p>
			</button>
		</div>
	);
}

// Admin Page
function AdminPage() {
	const { user, username, admin } = useContext(UserContext);
	return <button onClick={() => auth.signOut()}>Sign Out {username}</button>;
}

// Missing Permsissions
function AccessDenied() {
	return (
		<>
			<Metatags
				title='OE-O Modding | Admin'
				description='Please log in to see this page'
			/>
			<main>
				<div className={_404.container}>
					<div className={_404.content}>
						<h1>Sorry...</h1>
						<p>It looks like your aren't allowed to access that page</p>
						<Link href='/'>
							<button className={_404.btn}>Go Home</button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
