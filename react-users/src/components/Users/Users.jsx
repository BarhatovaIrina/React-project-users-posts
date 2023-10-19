import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import { getUsers } from "../../store/reducers/userReducer";
import Loading from "../Loading/Loading";
import './Users.css'
const Users = () => {

    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.users);
    useEffect(() => {
        getUsersData();
    }, []);

    const getUsersData = async () => {
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((res) => {
                // console.log(res)
                if (Array.isArray(res)) {
                    dispatch(getUsers({ loaded: true, users: res }));
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch(getUsers({ loaded: true, users: [] }));
            });

    };

    if (!isLoading)
        return <Loading />
    return (
        <div className="box users">
            <h2 className="user_info">Users</h2>
            <div className=' box'>
                {users.map((item) => (
                    <User key={item.id} id={item.id} name={item.name} email={item.email} />
                ))}

            </div>
        </div>
    );
}
export default Users