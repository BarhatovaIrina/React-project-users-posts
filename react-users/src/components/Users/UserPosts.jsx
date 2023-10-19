import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostsToStore } from "../../store/reducers/postReducer";
import { useParams } from "react-router-dom";
import './Users.css';
import Loading from "../Loading/Loading";

export default function UserPosts() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [userName, setUserName] = useState('');
    const { users } = useSelector((state) => state.users);

    const getPostsData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res, id)
                if (Array.isArray(res)) {
                    dispatch(addPostsToStore({ loaded: true, posts: res }));
                }
            })
            .catch((error) => {
                dispatch(addPostsToStore({ loaded: true, posts: [] }));
            });

    };
    useEffect(() => {
        getPostsData();
        try {
            setUserName(users[id - 1].name);
        }
        catch (error) {
            window.location.href = '/';
        }
    }, [id, users]);

    if (!isLoading)
        return <Loading />

    return (
        <>
            <div className="box posts">
                <h2 className="user_info"> Posts of {userName} </h2>
                <div className='box '>
                    {
                        posts.map((item, index) => (
                            <div className='post' key={index}>
                                <p className="post__title">{item.title}</p>
                                <p className="post__body">{item.body}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}