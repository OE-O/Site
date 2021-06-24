import ReactMarkdown from 'react-markdown';

export default function ModContent({ mod }) {
	return (
		<div className='card'>
			<h1>{mod?.title}</h1>
			<ReactMarkdown>{mod?.description}</ReactMarkdown>
		</div>
	);
}
