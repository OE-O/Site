import { useContext, useState } from 'react';
import Link from 'next/link';

import { auth, firestore, githubAuthProvider } from '@lib/firebase';
import { UserContext } from '@lib/context';
import ModFeed from '@components/ModFeed';
import Metatags from '@components/Metatags';
import styles from '@styles/Admin.module.scss';
import _404 from '@styles/404.module.scss';

const LIMIT = 5;

export async function getServerSideProps(context) {
	const modsQuery = firestore
		.collection('mods')
		.where('published', '==', true)
		.orderBy('views', 'desc')
		.limit(LIMIT);

	const mods = (await modsQuery.get()).docs.map((doc) => doc.data());

	return {
		props: { mods }, // will be passed to the page component as props
	};
}

export default function Mods({ mods }) {
	const { user, username, admin } = useContext(UserContext);

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing permissions <AccessDenied />
	// 3. user signed in, has permissions <ModsPage />
	return (
		<main>
			<Metatags
				title='OE-O Modding | Admin'
				description='Admin dashboard for managing the website'
			/>
			{user ? (
				!admin ? (
					<AccessDenied />
				) : (
					<ModsPage mods={mods} />
				)
			) : (
				<SignInButton />
			)}
		</main>
	);
}

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
function ModsPage(props) {
	const [mods, setmods] = useState(props.mods);
	const [loading, setLoading] = useState(false);
	const [modsEnd, setmodsEnd] = useState(false);

	// Get next page in pagination query
	const getMoremods = async () => {
		setLoading(true);

		let last = await firestore
			.collection('mods')
			.doc(mods[mods.length - 1].id)
			.get();

		const query = firestore
			.collection('mods')
			.where('published', '==', true)
			.orderBy('views', 'desc')
			.startAfter(last)
			.limit(LIMIT);

		const newmods = (await query.get()).docs.map((doc) => doc.data());

		setmods(mods.concat(newmods));
		setLoading(false);

		if (newmods.length < LIMIT) {
			setmodsEnd(true);
		}
	};

	return (
		<>
			<ModFeed mods={mods} admin={true} />

			{!loading && !modsEnd && <button onClick={getMoremods}>Load more</button>}

			{/* <Loader show={loading} /> */}

			{modsEnd && 'No more mods to see 😢'}
		</>
	);
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
