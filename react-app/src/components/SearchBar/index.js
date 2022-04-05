import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

export default function SearchBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [query, setQuery] = useState('');
	const [showMenu, setShowMenu] = useState(false);

	const closeMenu = (e) => {
		setShowMenu(false);
	}

	const onSubmit = (e) => {
	  e.preventDefault();
	  if (!query) return;
	  setShowMenu(false);
	//   return history.push(`/search/${query}`)
	}


	return (

		<div className='search'>
			<form className="search__form" onSubmit={onSubmit}>
				<input type="text" placeholder="search"
					className=""
					value={query}
					onChange={e => setQuery(e.target.value)}
					onFocus={e => setShowMenu(true)}
				/>
				<FontAwesomeIcon icon={faSearch} style={{ color: 'var(--color-text-less-light)' }}></FontAwesomeIcon>
			</form>

			{showMenu && (
				<div id="search_bg" onClick={closeMenu}>
					<ul className='search_filter' onClick={closeMenu}>
						<div style={{ cursor: 'pointer' }} onClick={onSubmit} id="search_message">press enter to search for "{query}"...</div>
						{/* {results.map((result, i) => (
							<li key={i}>
								<NavLink to={`/posts/${result?.item?.id}`}>
									link to the user/post/hashtag result page whatever
								</NavLink>
							</li>
						))} */}
					</ul>
				</div>
			)}
		</div>
	)
}
