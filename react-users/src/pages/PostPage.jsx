import { Api } from '../services/Api';
import { HStack, VStack, Text, Card, CardHeader, CardBody, Avatar, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { AddPostPanel } from '../components/AddPostPanel/AddPostPanel';
import { getPostsByUserData } from '../store/reducers/postAuthReducer';
import { useNavigate } from 'react-router-dom';

export const PostPage = () => {
    const { posts_user, count_posts } = useSelector((state) => state.posts_user);
    const user = (Api.getValueFromLocalStorage('user')) ? Api.getValueFromLocalStorage('user') : ''
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        getPosts()
    }, [count_posts])

    const getPosts = async () => {
        // console.log('user', (JSON.parse(user)).id)
        if (user) {
            Api.getPosts((JSON.parse(user)).id)
                .then(res => {
                    if (res.status === 200 && res?.data.posts && res.data.ok) {
                        // console.log('data')
                        dispatch(getPostsByUserData({ loaded: true, posts_user: res.data.posts, count_posts: res.data.posts.length }))
                    }
                })
                .catch((error) => {
                    dispatch(getPostsByUserData({ loaded: true, posts_user: [] }))
                    console.log('error', error)
                })
        }
        else {
            console.log('авторизуйтесь!')
            toast({
                title: 'Внимание',
                description: "Нужно авторизоваться!",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            navigate('/login')

        }
    }

    return (
        <div className='content'>
            <VStack width={'100%'} margin={10}>
                <AddPostPanel />
                {posts_user && <HStack flexWrap={'wrap'} justifyContent={'center'}>

                    {posts_user.map((item) => (
                        <Card border={"1px"} style={{ width: '400px' }} key={item.id}>
                            <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: 20 }}>
                                <Avatar name={item.author_id.name} />
                                <div>
                                    <Text fontSize={'xm'}>{item.author_id.name}</Text>
                                    <Text fontSize={'xs'}>{item.author_id.email}</Text>
                                </div>
                            </CardHeader>
                            <CardHeader>{item.post_title}</CardHeader>
                            <CardBody>{item.post_body}</CardBody>
                        </Card>
                    ))
                    }

                </HStack>}
            </VStack>
        </div>
    );
}