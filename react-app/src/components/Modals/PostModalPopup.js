import { useEffect, useState } from 'react';
import Modal from '.';
import PostModal from '../PostModal/index.js';


export default function PostModalPopup({ postImageRef, post }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const root = document.getElementById('root');
		if (showModal) root.classList.add('blur')

		return () => root.classList.remove('blur');
	}, [showModal])

	return (
		<>
			<img
				src={post.postImageUrl}
				id='post-image'
				ref={postImageRef}
				alt={`${post.user.handle}'s avatar`}
				onClick={() => {
					window.scrollTo({ top: 0, left: 0, });
					setShowModal(true)
				}}
			/>

			{showModal && (
				<Modal closeModal={() => setShowModal(false)}>
					<PostModal postId={post.id} />
				</Modal>
			)}
		</>
	);
}
