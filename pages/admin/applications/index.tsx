import { useRouter } from 'next/router';

export default function Applications(props) {
	const router = useRouter();
	const { id } = router.query;

	return null;
}
