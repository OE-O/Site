import Link from 'next/link';

import Metatags from '@components/Metatags';
import styles from '@styles/404.module.css';

function Apply(props) {
	return (
		<>
			<Metatags
				title='OE-O Modding | Apply'
				description='This page is under construction!'
			/>
			<main>
				<div className={styles.container}>
					<div className={styles.content} style={{ justifyItems: 'center' }}>
						<h1>We're Sorry</h1>
						<p>Applications aren't open at the moment</p>
						<Link href='/'>
							<button className={styles.btn}>Go Home</button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

// function Form() {
// 	return <p>Hi</p>
// }

export default Apply;
