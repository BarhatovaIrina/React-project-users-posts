import UserPosts from "../components/Users/UserPosts";
import Users from "../components/Users/Users";
import './ListData.css';

export default function ListData() {

    return (
        <>
            <div className='content'>
                <Users />
                <UserPosts />
            </div>
        </>
    );
}