import Link from 'next/link';

import { firestore } from 'lib/firebase';
import Metatags from 'components/Metatags';
import Footer from 'components/Footer';
import ModFeed from 'components/ModFeed';
import styles from 'styles/Home.module.scss';

export async function getServerSideProps(context) {
	const postsQuery = firestore
		.collection('mods')
		.where('published', '==', true)
		.orderBy('views', 'desc')
		.limit(3);

	const mods = (await postsQuery.get()).docs.map((doc) => doc.data());

	return {
		props: { mods }, // will be passed to the page component as props
	};
}

export default function Home({ mods }) {
	return (
		<>
			<Metatags title='OE-O Modding | Home' />
			<main>
				<section className={styles.top}>
					<div className={styles.content}>
						<h1 style={{ marginTop: 0, minWidth: 300 + 'px' }}>OE-O Modding</h1>
						<p style={{ maxWidth: 40 + 'ch' }}>
							We are an international team that colaborates on creating mods for
							games. Currently we have produced mods for <b>Software Inc</b> and{' '}
							<b>SimAirport</b>.
						</p>
						<div className={styles.buttons}>
							<Link href='/discord'>
								<a>
									<button className={styles.primary}>Discord</button>
								</a>
							</Link>
							<Link href='/mods'>
								<a>
									<button className={styles.secondary}>Explore</button>
								</a>
							</Link>
						</div>
					</div>
				</section>
				<section className={styles.mods}>
					<ModFeed mods={mods} />
				</section>
				<section className={styles.apply}>
					<div
						className={styles.content}
						style={{ display: 'grid', justifyItems: 'end' }}>
						<h1
							style={{
								marginTop: 0,
								minWidth: 300 + 'px',
								textAlign: 'right',
							}}>
							Join our team!
						</h1>
						<p style={{ maxWidth: 48 + 'ch', textAlign: 'right' }}>
							If you have an interest in modding games or programming, join our
							team to become part of a supportive community
						</p>
						<Link href='/apply'>
							<button className={styles.primary}>Apply</button>
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
