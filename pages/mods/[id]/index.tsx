import { useRouter } from 'next/router';

function Mod(props) {

	const router = useRouter();
	const { id } = router.query;

	return <p>{id}</p>

}

export default Mod