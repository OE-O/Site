import styles from 'styles/Loader.module.scss';

export default function Loader() {
	return (
		<div className={styles.container}>
			<i className={styles.loader + ' ' + styles.one}></i>
			<i className={styles.loader + ' ' + styles.two}></i>
			<i className={styles.loader + ' ' + styles.three}></i>
			<i className={styles.loader + ' ' + styles.four}></i>
		</div>
	);
}
