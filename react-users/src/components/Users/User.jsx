import { Link } from 'react-router-dom';
import './Users.css';

export default function User(props) {
    const { id, name, email } = props
    return (
        <>
            <div className='user'>

                <Link className='user_href' to={'/apiplaceholder/users/' + id}>{name}, {email}</Link>

            </div>
        </>
    );
}