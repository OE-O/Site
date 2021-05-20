import Link from 'next/link';

import Metatags from '@components/Metatags';
import styles from '@styles/404.module.css'

function Error(props) {

	return (
		<>
			<Metatags title='OE-O Modding | 404' description='That page does not exist' />
			<main>
				<div className={styles.content}>
					<h1>Oh No...</h1>
					<p>We hit a roadblock!</p>
					<Link href="/">
						<button className={styles.btn}>Go Home</button>
					</Link>
				</div>
			</main>
		</>
	)
}

export default Error