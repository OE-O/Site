import Link from 'next/link';
import styles from '@styles/Navbar.module.css';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { deviceSize } from '@lib/responsive';

// Top navbar
export default function Navbar() {
	const isMobile = useMediaQuery({ maxWidth: deviceSize.tablet });
	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<>
			<header className={styles.header}>
				<img src='/logo.png' className={styles.img} />
				{isMobile && (
					<>
						{!active && (
							<button className={styles.button} onClick={handleClick}>
								<svg
									width='2rem'
									height='2rem'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16M4 18h16'
									/>
								</svg>
							</button>
						)}

						{active && (
							<button className={styles.button} onClick={handleClick}>
								<svg
									width='2rem'
									height='2rem'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6,6 L18,18 M6,18 L18,6'
									/>
								</svg>
							</button>
						)}
					</>
				)}

				{!isMobile && (
					<nav className={styles.nav}>
						<ul className={styles.ul}>
							<li className={styles.li}>
								<Link href='/'>
									<a>Home</a>
								</Link>
							</li>
							<li className={styles.li}>
								<Link href='/discord'>
									<a>Discord</a>
								</Link>
							</li>
							<li className={styles.li}>
								<Link href='/github'>
									<a>GitHub</a>
								</Link>
							</li>
						</ul>
						<ul className={styles.ul}>
							<li className={styles.li}>
								<Link href='/apply'>
									<a>Apply</a>
								</Link>
							</li>
							<li className={styles.li}>
								<Link href='/about'>
									<a>About</a>
								</Link>
							</li>
						</ul>
					</nav>
				)}
			</header>

			{isMobile && active && (
				<nav className={styles.nav_mobile}>
					<ul className={styles.ul_mobile}>
						<li className={styles.li}>
							<Link href='/'>
								<a onClick={handleClick}>Home</a>
							</Link>
						</li>
						<li className={styles.li}>
							<Link href='/discord'>
								<a onClick={handleClick}>Discord</a>
							</Link>
						</li>
						<li className={styles.li}>
							<Link href='/github'>
								<a onClick={handleClick}>GitHub</a>
							</Link>
						</li>
						<li className={styles.li}>
							<Link href='/apply'>
								<a onClick={handleClick}>Apply</a>
							</Link>
						</li>
						<li className={styles.li}>
							<Link href='/about'>
								<a onClick={handleClick}>About</a>
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
}
