import { AppProps } from 'next/app';

import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import Navbar from '@components/Navbar';
import '@styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}
