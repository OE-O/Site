import { useDocumentData } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import { useContext } from 'react';
import { firestore } from 'lib/firebase';
import { UserContext } from 'lib/context';
import Metatags from 'components/Metatags';
import ModContent from 'components/ModContent';

export default function Mod(props) {
	const modRef = firestore.doc(props.path);
	const [realtimeMod] = useDocumentData(modRef);

	const mod = realtimeMod || props.mod;

	const { user: currentUser } = useContext(UserContext);

	return (
		<main>
			<Metatags title={mod.title} description={mod.about} />

			<section>
				<ModContent mod={mod} />
			</section>

			<aside className='card'>
				<p>
					<strong>{mod.game}</strong>
				</p>

				{currentUser?.admin && (
					<Link href={`/admin/${mod.id}`}>
						<button>Edit Post</button>
					</Link>
				)}
			</aside>
		</main>
	);
}

export async function getStaticProps({ params }) {
	const { id } = params;

	let mod;
	let path;

	const modRef = firestore.collection('mods').doc(id);
	mod = (await modRef.get())?.data();

	path = modRef.path;

	return {
		props: { mod, path },
		revalidate: 100,
	};
}

export async function getStaticPaths() {
	const snapshot = await firestore.collection('mods').get();

	const paths = snapshot.docs.map((doc) => {
		const { id } = doc.data();
		return {
			params: { id },
		};
	});

	return {
		paths,
		fallback: 'blocking',
	};
}
