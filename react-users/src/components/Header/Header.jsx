import { Link, NavLink } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import './Header.css'
import { useSelector } from 'react-redux';

export default function Header() {
    const { user, isLoading: userIsLoaded } = useSelector((state) => state.user)

    return (
        <>
            <div className='header'>
                <p>
                    React-project (HTML, CSS, JS, REACT, API, REDUX TOOLKIT)
                </p>
                <nav>
                    <NavLink className="header-link" to="/">Главная</NavLink>
                    <NavLink className="header-link" to="/admin">Админка</NavLink>
                    {/* <NavLink className="nav-a" to="/table">Link 2</NavLink> */}
                </nav>
                <div>
                    {userIsLoaded && <Link to={`/account/${user.id}`}>{user.name}</Link>}
                    {!userIsLoaded && <Link to={'/login'}>Вход</Link>}
                </div>
            </div>
        </>
    );
}