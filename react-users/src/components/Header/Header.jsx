import { NavLink } from 'react-router-dom';
import './Header.css'
export default function Header() {
    return (
        <>
            <div className='header'>
                <p>
                    React-project (HTML, CSS, JS, REACT, API, REDUX TOOLKIT)
                </p>
                <nav>
                    <NavLink className="header-link" to="/">Home</NavLink>
                    {/* <NavLink className="nav-a" to="/table">Link 2</NavLink> */}
                </nav>

            </div>
        </>
    );
}