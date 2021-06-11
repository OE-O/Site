import { useRouter } from 'next/router';

export default function Application(props) {
	const router = useRouter();
	const { id } = router.query;

	return null;
}
