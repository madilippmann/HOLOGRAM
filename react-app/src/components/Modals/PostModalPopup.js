import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Modal from '.';
import PostModal from '../PostModal/index.js';


export default function PostModalPopup({ postImageRef, post, blurImage, isSearchItem }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		// const root = document.getElementById('root');
		const navbar = document.getElementById('navbar');
		const footer = document.getElementById('footer');
		const footerBackground = document.getElementById('footer-background');
		const feedPageBody = document.getElementById('all-posts');
		const profilePageBody = document.getElementById('profile-page');
		if (showModal) {
			// NOTE: blurring the root element will cause the navbar to move positions
			// root.classList.add('blur');	

			navbar.classList.add('blur');
			navbar.style.opacity = '0.2';

			footer.classList.add('blur');
			footerBackground.classList.remove('hidden');

			feedPageBody?.classList.add('blur');
			profilePageBody?.classList.add('blur');
		}

		return () => {
			navbar.classList.remove('blur');
			navbar.style.opacity = '1';

			footer.classList.remove('blur');
			footerBackground.classList.add('hidden');

			feedPageBody?.classList.remove('blur');
			profilePageBody?.classList.remove('blur');
		}
	}, [showModal])

	return (
		<>
			{isSearchItem
				? (
					<span onClick={() => setShowModal(true)} className="search-item">
						<FontAwesomeIcon icon={faImage} style={{ color: 'var(--color-dark-gray)' }} />
						&nbsp;&nbsp; {post.caption}
					</span>
				) : (
					<img
						src={post.postImageUrl}
						style={blurImage ? { filter: 'blur(3px)' } : {}}
						id='post-image'
						ref={postImageRef}
						alt={`${post.user.handle}'s avatar`}
						onClick={() => setShowModal(true)}
					/>
				)}

			{showModal && (
				<Modal closeModal={() => setShowModal(false)}>
					<PostModal postId={post.id} />
				</Modal>
			)}
		</>
	);
}
