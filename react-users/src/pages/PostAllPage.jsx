import { Api } from '../services/Api';
import { HStack, VStack, Text, Card, CardHeader, CardBody, Avatar } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getPostsData } from '../store/reducers/postAuthReducer';

export const PostAllPage = () => {
    const { posts_all } = useSelector((state) => state.posts_user);
    const dispatch = useDispatch();
    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {

        Api.getPosts()
            .then(res => {
                if (res.status === 200 && res?.data.posts && res.data.ok) {
                    dispatch(getPostsData({ loaded: true, posts_all: res.data.posts }))
                }
            })
            .catch((error) => {
                dispatch(getPostsData({ loaded: true, posts_all: [] }))
                console.log('error', error)
            })
    }

    return (
        <div className='content'>

            <VStack width={'100%'} margin={10}>
                <h1> Посты пользователей (БД)</h1>
                {posts_all && <HStack flexWrap={'wrap'} justifyContent={'center'}>

                    {posts_all.map((item) => (
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