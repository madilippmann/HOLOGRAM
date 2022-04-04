import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { logout } from '../../store/session';

import './NavProfileButton.css'

export default function NavProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    document.querySelector('.nav-profile-button')
      .style.backgroundColor = '#111213';
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      document.querySelector('.nav-profile-button')
        .style.backgroundColor = '#212121'
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutUser = (e) => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      history.push('/login');
    }
  };

  return (
    <div className="nav-profile-button" onClick={openMenu}>
      <img
        src={user.profileImageUrl ? user.profileImageUrl : "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
        alt="profile-picture"
      />
      
      {showMenu && (
        <ul className="profile_nav_dropdown">
          <li>
            <NavLink to={`/users/${user.id}`} onClick={() => window.scrollTo(0, 0)}>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjEgMTEuODZjLS44MjUtLjQxOC0xLjI0My0xLjUzNi0xLjI0My0yLjMyIDAtLjQuMjY4LS43MzUuNTA3LTEuMDA3LjY0OC0uNzQzIDEuMTU0LTEuNjI0IDEuMTU0LTMuNTA3QzEyLjUxOCAyLjI1IDEwLjg1OCAxIDguOTg4IDFjLTEuODcgMC0zLjUzIDEuMjUtMy41MyA0LjAyNiAwIDEuODgzLjUwNSAyLjc2NCAxLjE1MyAzLjUwNy4yNC4yNzIuNTEuNjA3LjUxIDEuMDA2IDAgLjc4NC0uNDIgMS45MDItMS4yNDYgMi4zMi0xLjI0NC42My0zLjQyMyAxLjE2Ny00LjM2NSAxLjg4Qy4yNSAxNC42OTUgMCAxNyAwIDE3aDE4cy0uMjc3LTIuMzA2LTEuNTM0LTMuMjZjLS45NDItLjcxMy0zLjEyLTEuMjUtNC4zNjUtMS44OHoiLz4KPC9zdmc+Cg=="
                style={{ marginRight: '12px', height: '16px' }}
              />
              profile
            </NavLink>
          </li>
          <li>
            <NavLink to={`/users/${user.id}`} onClick={() => window.scrollTo(0, 310)}>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjgwNSAzQzguNzg1IDMgOCA1LjM0NSA4IDUuMzQ1UzcuMjE0IDMgNS4xOTcgM0MzLjQ5NCAzIDEuNzQ4IDQuMDk2IDIuMDMgNi41MTRjLjM0NCAyLjk1MyA1LjcyNSA2LjQ4IDUuOTYzIDYuNDg3LjIzOC4wMSA1LjczOC0zLjcyIDUuOTg4LTYuNS4yMDgtMi4zLTEuNDczLTMuNS0zLjE3NS0zLjV6Ii8+Cjwvc3ZnPgo="
                style={{ marginRight: '12px', transform: 'scale(1.2)' }}
              />
              likes
            </NavLink>
          </li>
          <li onClick={logoutUser}>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI4IDI4Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0xOC40IDE4LjVsMi41IDUgLjIuNUgyOGwtMi4xLTQuMy00LjEtMS41di0yLjVjMS4yLTEuMSAxLjgtMy4yIDEuOC01LjEgMC0yLjEtMi0zLjYtMy41LTMuNnMtMy41IDEuNi0zLjUgMy42YzAgMS45LjUgNCAxLjggNS4xdjIuNWgtLjFsLjEuM3oiLz4KICAgIDxwYXRoIGZpbGw9InJnYmEoNTEsNTEsNTEsLjcpIiBkPSJNMTcuNSAxOWwtNS0xLjh2LTNjMS40LTEuMiAyLTMuOCAyLTUuOSAwLTIuNC0yLjMtNC4zLTQtNC4zLTEuNyAwLTQgMS44LTQgNC4zIDAgMi4yLjYgNC43IDIgNS45djNsLTUgMS44TDEgMjRoMTlsLTIuNS01eiIvPgo8L3N2Zz4K"
              style={{ marginRight: '0px', transform: 'scale(0.7)', position: 'relative', left: '-4px' }}
            />
            log out
          </li>
        </ul>
      )}
    </div>
  );
}
