import '@styles/globals.css';
import { AppProps } from 'next/app';
import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import Navbar from '@components/Navbar';

function App({ Component, pageProps }: AppProps) {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default App;
