import Link from 'next/link';

import Metatags from '@components/Metatags';
import styles from '@styles/404.module.css';

function Error(props) {
	const messages = [
		'We hit a roadblock!',
		"There's nothing here...",
		'uh oh, looks like a 404',
		'When you think about it, the universe is mostly empty... just like this page',
	];
	const message = messages[Math.floor(Math.random() * messages.length)];

	return (
		<>
			<Metatags
				title='OE-O Modding | 404'
				description='That page does not exist'
			/>
			<main>
				<div className={styles.container}>
					<div className={styles.content}>
						<h1>Oh No...</h1>
						<p>{message}</p>
						<Link href='/'>
							<button className={styles.btn}>Go Home</button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

export default Error;
