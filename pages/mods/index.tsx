import { useState } from 'react';

import { firestore } from 'lib/firebase';
import ModFeed from 'components/ModFeed';
import Metatags from 'components/Metatags';
import Loader from 'components/Loader';

// mod query limit
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

export default function Mods(props) {
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
		<main>
			<Metatags
				title='OE-O | Mods'
				description='Explore our ever-growing collection of mods!'
			/>

			<ModFeed mods={mods} />

			{!loading && !modsEnd && <button onClick={getMoremods}>Load more</button>}

			{loading && (
				<button>
					<Loader />
				</button>
			)}

			{modsEnd && 'No more mods to see 😢'}
		</main>
	);
}
