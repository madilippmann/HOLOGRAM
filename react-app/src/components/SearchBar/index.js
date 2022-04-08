import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

import Fuse from 'fuse.js';
import { fetchQuery } from '../../store/search';
const options = {
	includeScore: true,
	findAllMatches: true,
	useExtendedSearch: true,
	keys: [
		{ name: 'caption', weight: 0.9 },
		// {name: 'User.username', weight: 0.5},
		// {name: 'description', weight: 0.2},
	]
}


export default function SearchBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const posts = useSelector(state => Object.values(state.posts));
	const dbQueryResults = useSelector(state => state.search);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState(!posts.length ? [] : posts);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		// if (!query) return;

		// let timer;
		// if (dbQueryResults.length < 20 && query.length > 1) {
		// 	timer = setTimeout(async () => {
		// 		const dbResults = await dispatch(fetchQuery(query));
		// 		const fuse = new Fuse(dbResults, options);
		// 		const fuseResults = fuse.search(query);
		// 		setResults(fuseResults);
		// 	}, 400);

		// } else {
		// const fuse = new Fuse(dbQueryResults, options);
		const fuse = new Fuse(posts, options);
		const fuseResults = fuse.search(query);
		console.log(fuseResults);
		setResults(fuseResults);
		// }

		// return () => clearTimeout(timer);
	}, [query]);
	
	const openMenu = () => {
		if (showMenu) return;
		document.querySelector('.search');
		setShowMenu(true);
	};
	
	useEffect(() => {
		if (!showMenu) return;
		
		const closeMenu = () => {
			document.querySelector('.search');
			setShowMenu(false);
		};
		
		document.addEventListener('click', closeMenu);
		
		return () => {
			setShowMenu(false);
			document.removeEventListener("click", closeMenu);
		}
	}, [showMenu]);

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
					onClick={openMenu}
				/>
				<FontAwesomeIcon icon={faSearch} style={{ color: 'var(--color-dark-gray)' }}></FontAwesomeIcon>
			</form>

			{showMenu && (
				<div className='search-filter'>

					<div id="search-message" onClick={onSubmit}>press enter to search for "{query}"...</div>
					{results.map((result, i) => (
						<span key={i} onClick={() => history.push(`/posts/${result.item.id}`)} className="search-item">
							{result.item.id}
						</span>
					))}

				</div>
			)}
		</div>
	)
}
