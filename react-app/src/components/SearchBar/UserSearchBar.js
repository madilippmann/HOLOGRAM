import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faImage, faImagePortrait } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import './UserSearchBar.css';

import Fuse from 'fuse.js';
import { fetchQuery } from '../../store/search';
const options = {
    includeScore: true,
    findAllMatches: true,
    useExtendedSearch: true,
    keys: [
        { name: 'handle', weight: 0.7 },
        { name: 'firstName', weight: 0.6 },
        { name: 'lastName', weight: 0.4 },
    ]
}

export default function UserSearchBar() {
    const dispatch = useDispatch();
    const searchMenuRef = useRef();
    const searchInputRef = useRef();
    // const posts = useSelector(state => Object.values(state.posts));
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([] /* PUT USERS IN STATE IN HERE FOR TESTING W/O QUERY THUNK */);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!query) return;

        // FOR TESTING WITH USERS ALREADY IN STATE
        const fuse = new Fuse(results, options);
        const stateResults = fuse.search(query);
        setResults(stateResults);

        let timer;
        if (results.length < 20) {
            timer = setTimeout(async () => {
                const dbQueryResults = await dispatch(fetchQuery(query));

                // FOR FILTERING OUT DUPLICATES
                // const postsSet = new Set();
                const usersSet = new Set();
                results.forEach(item => {
                    // if (item.item.caption !== undefined) postsSet.add(item.item.id);
                    if (item.item.handle !== undefined) usersSet.add(item.item.id);
                });
                const newResults = dbQueryResults.filter(item => {
                    // // for posts
                    // if (item.caption !== undefined) {
                    // 	if (!postsSet.has(item.id)) return true;
                    // }
                    // // for users
                    if (item.handle !== undefined) {
                        if (!usersSet.has(item.id)) return true;
                    }
                })

                const fuse = new Fuse(newResults, options);
                const fuseResults = fuse.search(query);
                setResults(prevResults => fuseResults.concat(prevResults))
            }, 400);
        }

        return () => clearTimeout(timer);
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
            setShowMenu(() => !showMenu);
        };

        const portal = document.getElementById('portal');
        const listener = (e) => {
            if (!searchMenuRef.current?.contains(e.target) && !portal.contains(e.target) && e.target !== searchInputRef.current) {
                searchMenuRef.current.style.display = 'flex';
                closeMenu();
                console.log('in here');
            } else if (searchMenuRef.current?.contains(e.target)) {
                searchMenuRef.current.style.display = 'none';
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


    return (
        <div className='search user-search-wrapper'>
            <form className="search__form user-search" onSubmit={onSubmit}>
                <input type="text" placeholder="search"
                    className=""
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onClick={openMenu}
                    onKeyPress={openMenu}
                    ref={searchInputRef}
                />
                <FontAwesomeIcon icon={faSearch} style={{ color: 'var(--color-dark-gray)' }} />
            </form>

            {showMenu && (
                <div className='search-filter user-search' ref={searchMenuRef}>
                    <div id="search-message" onClick={onSubmit}>press enter to search for "{query}"...</div>
                    {results.map((result, i) => (
                        <span key={results.id} /* onClick={push result.item.handle to div in here} */ className="search-item">
                            <FontAwesomeIcon icon={faUser} style={{ color: 'var(--color-dark-gray)' }} />
                            &nbsp;&nbsp; {result.item.handle}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
