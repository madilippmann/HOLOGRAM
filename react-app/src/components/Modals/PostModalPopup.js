import { useEffect, useState } from 'react';
import Modal from '.';
import PostModal from '../PostModal/index.js';


export default function PostModalPopup({ postImageRef, post }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		// const root = document.getElementById('root');
		const profilePageBody = document.getElementById('profile-page');
		const feedPageBody = document.getElementById('all-posts');
		const navbar = document.getElementById('navbar');
		if (showModal) {
			// root.classList.add('blur');	
			navbar.classList.add('blur');
			navbar.style.opacity = '0.2';
			feedPageBody?.classList.add('blur');	
			profilePageBody?.classList.add('blur');	
		}
		
		return () => {
			navbar.classList.remove('blur');	
			navbar.style.opacity = '1';
			feedPageBody?.classList.remove('blur');	
			profilePageBody?.classList.remove('blur');	
		}
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
