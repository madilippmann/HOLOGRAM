import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faImage, faImagePortrait } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import './UserSearchBar.css';

import Fuse from 'fuse.js';
import { fetchQuery } from '../../store/search';
import ProfileIcon from '../ProfileIcon';
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

export default function UserSearchBar({ userIds, setUserIds, setSelectedUsers }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
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
                const dbQueryResults = await dispatch(fetchQuery(query, true));

                // FOR FILTERING OUT DUPLICATES
                const usersSet = new Set();
                results.forEach(item => usersSet.add(item.item.id));
                const newResults = dbQueryResults.filter(item => !usersSet.has(item.id));

                const fuse = new Fuse(newResults, options);
                const fuseResults = fuse.search(query);
                setResults(prevResults => fuseResults.concat(prevResults))
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

        const dropdown = document.getElementById('user-search-dropdown');
        const searchInput = document.getElementById('user-search-input')
        const listener = (e) => {
            if (dropdown.contains(e.target)) {
                setQuery('');
                closeMenu();
                dropdown.style.display = 'none';
            } else if (!dropdown.contains(e.target) && e.target !== searchInput) {
                dropdown.style.display = 'flex';
                closeMenu();
            } else if (e.target === searchInput) {
                openMenu();
            }
        }

        document.addEventListener('click', listener);

        return () => {
            setShowMenu(false);
            document.removeEventListener("click", listener);
        }
    }, [showMenu]);

    const addToSelectedUsers = user => {
        if (userIds.has(user.id) || user.id === sessionUser.id) return;
        
        setUserIds(idSet => idSet.add(user.id));
        setSelectedUsers(selectedUsers => {
            return [...selectedUsers, user];
        });
        
        setShowMenu(false);
    }
    
    const onSubmit = e => {
        e.preventDefault();
        if (results[0]) addToSelectedUsers(results[0].item);
    }


    return (
        <div className='search user-search-wrapper'>
            <form className="search__form user-search" onSubmit={onSubmit}>
                <input type="text" placeholder="add user..."
                    id='user-search-input'
                    autoComplete='off'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onClick={openMenu}
                    onFocus={openMenu}
                    onKeyPress={openMenu}
                />
                {/* <FontAwesomeIcon icon={faSearch} style={{ color: 'var(--color-dark-gray)' }} /> */}
            </form>

            {showMenu && (
                <div id='user-search-dropdown' className='search-filter user-search'>
                    <div id="search-message">searching for "{query}"...</div>

                    {results.slice(0, 20).map((result, i) => (
                        <span key={i} onClick={() => addToSelectedUsers(result.item)} className="search-item">
                            <div style={{ width: '42px', height: '42px' }}>
                                <ProfileIcon user={result.item} />
                            </div>
                            <div className='item-details'>
                                <span>{result.item.handle}</span>
                                <small>{result.item.firstName} {result.item.lastName}</small>
                            </div>
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
