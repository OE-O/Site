import { useRouter } from 'next/router';

export default function Mod(props) {
	const router = useRouter();
	const { id } = router.query;

	return null;
}
