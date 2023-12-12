import { Link, NavLink } from 'react-router-dom';
import { HStack, Text } from '@chakra-ui/react';
import './Header.css'
import { useSelector } from 'react-redux';

export default function Header() {
    const { user, isLoading: userIsLoaded } = useSelector((state) => state.user)

    return (
        <>
            <div className='header'>
                <nav>
                    <NavLink className="header-link" to="/">Главная</NavLink>
                    <NavLink className="header-link" to="/apiplaceholder">API Placeholder</NavLink>
                    <NavLink className="header-link" to="/admin">Админка</NavLink>
                    <NavLink className="header-link" to="/post/all">Все посты пользователей (БД)</NavLink>
                    <NavLink className="header-link" to="/post">Посты пользователя (БД)</NavLink>
                </nav>
                <div>
                    {userIsLoaded &&
                        <HStack >
                            <Link to={`/account/${user.id}`}>{user.name}</Link>
                            <Link to={`/logout`}>Logout</Link>
                        </HStack>
                    }
                    {!userIsLoaded && <Link to={'/login'}>Вход</Link>}
                </div>
            </div>
        </>
    );
}