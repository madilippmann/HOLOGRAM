import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faImage, faImagePortrait } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

import Fuse from 'fuse.js';
import { fetchQuery } from '../../store/search';
import PostModalPopup from '../Modals/PostModalPopup';
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
	const searchMenuRef = useRef();
	const searchInputRef = useRef();
	const posts = useSelector(state => Object.values(state.posts));
	const [query, setQuery] = useState('');
	const [results, setResults] = useState(!posts.length ? [] : posts);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (!query) return;

		const fuse = new Fuse(posts, options);
		const stateResults = fuse.search(query);
		setResults(stateResults);

		let timer;
		if (results.length < 20) {
			timer = setTimeout(async () => {
				const dbQueryResults = await dispatch(fetchQuery(query));

				if (dbQueryResults) {
					// FOR FILTERING OUT DUPLICATES
					const postsSet = new Set();
					const usersSet = new Set();
					results.forEach(item => {
						if (item.item.caption !== undefined) postsSet.add(item.item.id);
						if (item.item.handle !== undefined) usersSet.add(item.item.id);
					});
					const newResults = dbQueryResults.filter(item => {
						// for posts
						if (item.caption !== undefined) {
							if (!postsSet.has(item.id)) return true;
						}
						// for users
						if (item.handle !== undefined) {
							if (!usersSet.has(item.id)) return true;
						}
					})

					const fuse = new Fuse(newResults, options);
					const fuseResults = fuse.search(query);
					setResults(prevResults => fuseResults.concat(prevResults))
				}
			}, 300);
		}

		return () => clearTimeout(timer);
	}, [query]);

	const openMenu = () => {
		// if (showMenu) return;
		document.querySelector('.search');
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			document.querySelector('.search');
			setShowMenu(() => !showMenu);
		};

		const portal = document.getElementById('portal');
		const listener = (e) => {
			if (searchMenuRef.current) {
				if (!searchMenuRef.current?.contains(e.target) && !portal.contains(e.target) && e.target !== searchInputRef.current) {
					searchMenuRef.current.style.display = 'flex';
					closeMenu();
				} else if (searchMenuRef.current?.contains(e.target)) {
					searchMenuRef.current.style.display = 'none';
					// closeMenu();
				}
			}
		}

		document.addEventListener('click', listener);

		return () => {
			setShowMenu(false);
			document.removeEventListener("click", listener);
		}
	}, [showMenu]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!query) return;
		setShowMenu(false);
	}

	const goToProfile = (handle) => {
		history.push(`/${handle}`);
		window.location.reload(false);
	}

	return (
		<div className='search'>
			<form className="search__form" onSubmit={onSubmit}>
				<input type="text" placeholder="search for users..."
					className=""
					value={query}
					onChange={e => setQuery(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
					onClick={openMenu}
					onKeyPress={openMenu}
					ref={searchInputRef}
				/>
				<FontAwesomeIcon icon={faSearch} style={{ color: 'var(--color-dark-gray)' }} />
			</form>

			{showMenu && (
				<div className='search-filter' ref={searchMenuRef}>
					<div id="search-message">searching for "{query}"...</div>

					{results.slice(0, 20).map((result, i) => {
						if (result.item?.hasOwnProperty('handle')) {
							return (
								<span key={i} onClick={() => goToProfile(result.item.handle)} className="search-item">
									<FontAwesomeIcon icon={faUser} style={{ color: 'var(--color-dark-gray)' }} />
									<div className='item-details'>
										<span className='line-clamp' style={{ fontSize: '16px' }}>{result.item.handle}</span>
										<small>{result.item.firstName} {result.item.lastName}</small>
									</div>
								</span>
							)
						} else if (result.item?.hasOwnProperty('caption')) {
							return (
								<PostModalPopup key={i} isSearchItem={true} post={result.item} />
							)
						}
					})}
				</div>
			)}
		</div>
	)
}
