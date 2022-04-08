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
		{ name: 'handle', weight: 0.6 },
		{ name: 'firstName', weight: 0.4 },
		{ name: 'lastName', weight: 0.4 },
	]
}


export default function SearchBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const posts = useSelector(state => Object.values(state.posts));
	// const dbQueryResults = useSelector(state => state.search);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState(!posts.length ? [] : posts);
	const [showMenu, setShowMenu] = useState(false);
	console.log(results);


	useEffect(() => {
		if (!query) return;

		// let timer;
		// if (dbQueryResults.length < 20 && query.length > 1) {
		// 	timer = setTimeout(async () => {
		// 		const dbResults = await dispatch(fetchQuery(query));
		// 		const fuse = new Fuse(dbResults, options);
		// 		const fuseResults = fuse.search(query);
		// 		setResults(fuseResults);
		// 	}, 400);

		// } else {
		// 	const fuse = new Fuse(dbQueryResults, options);
		// 	const fuseResults = fuse.search(query);
		// 	setResults(fuseResults);
		// }

		let timer;

		const fuse = new Fuse(posts, options);
		const stateResults = fuse.search(query);
		setResults(stateResults);

		if (results.length < 20 && query.length > 1) {
			timer = setTimeout(async () => {
				const dbQueryResults = await dispatch(fetchQuery(query));
				const fuse = new Fuse(dbQueryResults, options);
				const fuseResults = fuse.search(query);
				setResults(prevResults => prevResults.concat(fuseResults));
			}, 400);
		}

		return () => clearTimeout(timer);
	}, [query]);

	// useEffect(() => {
	// 	(async () => {
	// 		const res = await dispatch(fetchQuery('an'));
	// 		console.log(res);
	// 	})()
	// }, [query]);

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
					{results.map((result, i) => {
						{
							result.item.handle !== undefined && (
								<span key={i} onClick={() => history.push(`/${result.item.handle}`)} className="search-item">
									{result.item.handle}
								</span>
							)
						}
						{
							result.item.caption !== undefined && (
								<span key={i} onClick={() => history.push(`/posts/${result.item.id}`)} className="search-item">
									{result.item.caption}
								</span>
							)
						}
					})}
				</div>
			)}
		</div>
	)
}
