import { clearAuthState } from '../store/reducers/userAuthReducer';
import { Api } from '../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user_localstorage = (Api.getValueFromLocalStorage('user')) ? Api.getValueFromLocalStorage('user') : ''
    const { user } = useSelector((state) => state.user)
    if (user) {
        dispatch(clearAuthState())
        if (user_localstorage) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
        console.log('logout')
    }

    return (
        <>
            {navigate('/login')}
        </>
    )
}
